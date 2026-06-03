"use client";

import { useEffect, useRef } from "react";

interface ContactLink {
  title: string;
  value: string;
  href: string;
  icon: string;
}

const decodeText = (
  element: HTMLElement,
  finalText: string,
  duration = 900,
) => {
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-?@";
  const startedAt = performance.now();
  let frameId = 0;

  const tick = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const revealed = Math.floor(progress * finalText.length);

    element.textContent = finalText
      .split("")
      .map((char, index) => {
        if (char === " " || index < revealed) return char;
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join("");

    if (progress < 1) {
      frameId = requestAnimationFrame(tick);
      return;
    }

    element.textContent = finalText;
  };

  frameId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frameId);
};

let animeModulePromise: Promise<typeof import("animejs")> | undefined;

const getAnime = () => {
  animeModulePromise ??= import("animejs");
  return animeModulePromise;
};

type OrientationStatus = "unknown" | "granted" | "denied" | "unsupported";

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export default function ContactsApp() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const activeTiltCardRef = useRef<HTMLDivElement | null>(null);
  const orientationStatusRef = useRef<OrientationStatus>("unknown");
  const orientationHandlerRef = useRef<((event: DeviceOrientationEvent) => void) | null>(null);
  const orientationFrameRef = useRef<number | null>(null);
  const latestOrientationRef = useRef<DeviceOrientationEvent | null>(null);
  const reducedMotionRef = useRef(false);

  const contactLinks: ContactLink[] = [
    {
      title: "Email",
      value: "contactskshmtrip@gmail.com",
      href: "mailto:contactskshmtrip@gmail.com",
      icon: "email",
    },
    {
      title: "GitHub",
      value: "@skshmtrip",
      href: "https://github.com/skshmtrip",
      icon: "github",
    },
    {
      title: "LinkedIn",
      value: "Saksham Tripathi",
      href: "https://linkedin.com/in/krishna-tripathi-009008274",
      icon: "linkedin",
    },
    {
      title: "Instagram",
      value: "@stemsaksham",
      href: "https://instagram.com/stemsaksham",
      icon: "instagram",
    },
  ];

  const jjoCharacters = [
    "/jjba pics/jotaro-kujostardust-crusadersjojos-bizarre-adventuretransparentmy-jojos-bizarre-adventure-11562915815zv7cmo7oie.svg",
    "/jjba pics/400px-Giorno_Giovanna_Infobox_Manga.svg",
    "/jjba pics/1200px-Josuke_DU_Infobox_Manga.svg",
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", syncReducedMotion);

      if (orientationHandlerRef.current) {
        window.removeEventListener("deviceorientation", orientationHandlerRef.current);
      }

      if (orientationFrameRef.current) {
        cancelAnimationFrame(orientationFrameRef.current);
      }
    };
  }, []);

  const startDeviceTilt = async (el: HTMLDivElement) => {
    if (reducedMotionRef.current || typeof window === "undefined") return false;

    const OrientationEvent = window.DeviceOrientationEvent as
      | DeviceOrientationEventWithPermission
      | undefined;

    if (!OrientationEvent) {
      orientationStatusRef.current = "unsupported";
      return false;
    }

    if (
      orientationStatusRef.current === "denied" ||
      orientationStatusRef.current === "unsupported"
    ) {
      return false;
    }

    if (
      orientationStatusRef.current === "unknown" &&
      typeof OrientationEvent.requestPermission === "function"
    ) {
      try {
        orientationStatusRef.current =
          (await OrientationEvent.requestPermission()) === "granted"
            ? "granted"
            : "denied";
      } catch {
        orientationStatusRef.current = "denied";
      }
    } else if (orientationStatusRef.current === "unknown") {
      orientationStatusRef.current = "granted";
    }

    if (orientationStatusRef.current !== "granted") return false;

    activeTiltCardRef.current = el;
    el.classList.add("is-tilting");

    if (!orientationHandlerRef.current) {
      orientationHandlerRef.current = (event: DeviceOrientationEvent) => {
        latestOrientationRef.current = event;

        if (orientationFrameRef.current !== null) return;

        orientationFrameRef.current = requestAnimationFrame(async () => {
          orientationFrameRef.current = null;

          const card = activeTiltCardRef.current;
          const orientation = latestOrientationRef.current;
          if (!card || !orientation) return;

          const gamma = clamp(orientation.gamma ?? 0, -24, 24);
          const beta = clamp((orientation.beta ?? 0) - 45, -24, 24);
          const pointerX = clamp(50 + gamma * 1.35, 18, 82);
          const pointerY = clamp(50 + beta * 1.05, 18, 82);
          const inner = card.querySelector<HTMLElement>(".bezel-inner");
          const icon = card.querySelector<HTMLElement>(".icon-shell");

          card.style.setProperty("--card-x", `${pointerX}%`);
          card.style.setProperty("--card-y", `${pointerY}%`);

          const { animate } = await getAnime();

          if (inner) {
            animate(inner, {
              rotateX: beta * -0.14,
              rotateY: gamma * 0.16,
              translateX: gamma * 0.18,
              translateY: beta * 0.12,
              duration: 220,
              ease: "easeOutQuad",
            });
          }

          if (icon) {
            animate(icon, {
              translateX: gamma * 0.18,
              translateY: beta * 0.14,
              rotateZ: gamma * 0.08,
              duration: 220,
              ease: "easeOutQuad",
            });
          }
        });
      };

      window.addEventListener("deviceorientation", orientationHandlerRef.current);
    }

    return true;
  };

  // Page-load animations
  useEffect(() => {
    let cancelled = false;
    let cancelDecode: (() => void) | undefined;

    const run = async () => {
      const { animate, stagger, spring } = await getAnime();

      if (cancelled) return;

      if (headlineRef.current) {
        const headline = headlineRef.current;
        const finalText = "Let's connect.";

        headline.textContent = "";
        animate(headline, {
          opacity: [0, 1],
          duration: 100,
          ease: "linear",
        });
        cancelDecode = decodeText(headline, finalText);
      }

      if (subtitleRef.current) {
        animate(subtitleRef.current, {
          opacity: [0, 1],
          translateY: [18, 0],
          ease: "easeOutExpo",
          duration: 900,
          delay: 600,
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>(".contact-card");
        animate(cards, {
          opacity: [0, 1],
          translateY: [28, 0],
          ease: spring({ stiffness: 80, damping: 12 }),
          delay: stagger(90, { start: 700 }),
        });
      }

      if (footerRef.current) {
        animate(footerRef.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          ease: "easeOutCubic",
          duration: 700,
          delay: 1500,
        });
      }
    };

    run();
    return () => {
      cancelled = true;
      cancelDecode?.();
    };
  }, []);

  // Per-card magnetic tilt and glow
  const setupCardEffects = (el: HTMLDivElement | null) => {
    if (!el) return;

    let glowAnimation: { pause: () => void } | null = null;
    let tiltReleaseTimer: number | null = null;

    const setPointerLight = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const pointerX = ((clientX - rect.left) / rect.width) * 100;
      const pointerY = ((clientY - rect.top) / rect.height) * 100;

      el.style.setProperty("--card-x", `${pointerX}%`);
      el.style.setProperty("--card-y", `${pointerY}%`);

      return {
        dx: (clientX - (rect.left + rect.width / 2)) / rect.width,
        dy: (clientY - (rect.top + rect.height / 2)) / rect.height,
      };
    };

    const startGlow = async () => {
      if (glowAnimation) return;

      const { animate } = await getAnime();
      glowAnimation = animate(el, {
        boxShadow: [
          "0 0 0px rgba(255,255,255,0.00)",
          "0 0 42px rgba(255,255,255,0.12)",
          "0 0 0px rgba(255,255,255,0.00)",
        ],
        ease: "easeInOutSine",
        duration: 1400,
        loop: true,
      });
    };

    const stopGlow = () => {
      if (!glowAnimation) return;
      glowAnimation.pause();
      glowAnimation = null;
    };

    const animatePointerTilt = async (dx: number, dy: number, duration = 360) => {
      const { animate } = await getAnime();
      const inner = el.querySelector<HTMLElement>(".bezel-inner");
      const icon = el.querySelector<HTMLElement>(".icon-shell");
      if (!inner) return;

      animate(inner, {
        rotateX: dy * -8,
        rotateY: dx * 8,
        translateX: dx * 6,
        translateY: dy * 6,
        ease: "easeOutElastic(1, 0.45)",
        duration: duration,
      });

      if (icon) {
        animate(icon, {
          translateX: dx * 8,
          translateY: dy * 8,
          rotateZ: dx * 8,
          ease: "easeOutQuad",
          duration: Math.max(duration * 0.66, 240),
        });
      }
    };

    const liftCard = async () => {
      const { animate, spring } = await getAnime();
      const arrow = el.querySelector<HTMLElement>(".card-arrow");

      animate(el, {
        scale: 1.018,
        translateY: -3,
        ease: spring({ stiffness: 140, damping: 15 }),
        duration: 520,
      });

      if (arrow) {
        animate(arrow, {
          translateX: [0, 8, 4],
          opacity: [0.65, 1],
          ease: "easeOutExpo",
          duration: 520,
        });
      }

      startGlow();
    };

    const pressCard = async () => {
      const { animate, spring } = await getAnime();
      const icon = el.querySelector<HTMLElement>(".icon-shell");
      const arrow = el.querySelector<HTMLElement>(".card-arrow");

      animate(el, {
        scale: 0.985,
        translateY: 1,
        ease: spring({ stiffness: 210, damping: 16 }),
        duration: 300,
      });

      if (icon) {
        animate(icon, {
          scale: [1, 1.12, 1.04],
          duration: 360,
          ease: "easeOutExpo",
        });
      }

      if (arrow) {
        animate(arrow, {
          translateX: [0, 10, 4],
          opacity: [0.7, 1],
          duration: 360,
          ease: "easeOutExpo",
        });
      }

      startGlow();
    };

    const resetCard = async () => {
      const { animate, spring } = await getAnime();
      stopGlow();

      const inner = el.querySelector<HTMLElement>(".bezel-inner");
      const icon = el.querySelector<HTMLElement>(".icon-shell");
      const arrow = el.querySelector<HTMLElement>(".card-arrow");

      el.style.setProperty("--card-x", "50%");
      el.style.setProperty("--card-y", "50%");

      if (inner) {
        animate(inner, {
          rotateX: 0,
          rotateY: 0,
          translateX: 0,
          translateY: 0,
          ease: spring({ stiffness: 90, damping: 14 }),
          duration: 600,
        });
      }

      if (icon) {
        animate(icon, {
          translateX: 0,
          translateY: 0,
          rotateZ: 0,
          ease: spring({ stiffness: 120, damping: 16 }),
          duration: 520,
        });
      }

      if (arrow) {
        animate(arrow, {
          translateX: 0,
          opacity: 0.7,
          duration: 260,
          ease: "easeOutQuad",
        });
      }

      animate(el, {
        scale: 1,
        translateY: 0,
        boxShadow: "0 0 0px rgba(255,255,255,0.00)",
        duration: 440,
        ease: spring({ stiffness: 100, damping: 16 }),
      });
    };

    const releaseTouchCard = () => {
      el.classList.remove("is-touching");

      if (tiltReleaseTimer) {
        window.clearTimeout(tiltReleaseTimer);
      }

      tiltReleaseTimer = window.setTimeout(() => {
        if (activeTiltCardRef.current === el) {
          activeTiltCardRef.current = null;
          el.classList.remove("is-tilting");
          resetCard();
        }
      }, 1100);
    };

    const onPointerMove = async (e: PointerEvent) => {
      const { dx, dy } = setPointerLight(e.clientX, e.clientY);

      if (e.pointerType === "mouse" || orientationStatusRef.current !== "granted") {
        animatePointerTilt(dx, dy);
      }
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      liftCard();
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      resetCard();
    };

    const onPointerDown = async (e: PointerEvent) => {
      const { dx, dy } = setPointerLight(e.clientX, e.clientY);

      if (tiltReleaseTimer) {
        window.clearTimeout(tiltReleaseTimer);
        tiltReleaseTimer = null;
      }

      if (e.pointerType !== "mouse") {
        el.classList.add("is-touching");
        activeTiltCardRef.current = el;
        el.setPointerCapture?.(e.pointerId);

        const tiltStarted = await startDeviceTilt(el);
        if (!tiltStarted) {
          animatePointerTilt(dx * 0.65, dy * 0.65, 260);
        }

        pressCard();
        return;
      }

      pressCard();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        liftCard();
        return;
      }
      releaseTouchCard();
    };

    const onPointerCancel = () => {
      el.classList.remove("is-touching", "is-tilting");

      if (activeTiltCardRef.current === el) {
        activeTiltCardRef.current = null;
      }
      resetCard();
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);

    return () => {
      if (tiltReleaseTimer) {
        window.clearTimeout(tiltReleaseTimer);
      }

      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
    };
  };

  const IconComponent = ({ type }: { type: string }) => {
    if (type === "email") {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type === "github") {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.001 12.001 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    }
    if (type === "linkedin") {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.002 1.413-.103.25-.129.599-.129.949v5.443h-3.554s.05-8.836 0-9.754h3.554v1.381c.43-.664 1.199-1.608 2.918-1.608 2.135 0 3.753 1.395 3.753 4.402v5.579zM5.337 9.341c-1.144 0-1.891-.762-1.891-1.715 0-.955.745-1.716 1.875-1.716 1.135 0 1.891.76 1.909 1.716 0 .953-.774 1.715-1.893 1.715zm1.541 11.111H3.769V9.698h3.109v10.754zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      );
    }
    if (type === "instagram") {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.335.012 7.052.07 2.695.272.273 2.69.07 7.052.012 8.335 0 8.756 0 12s.012 3.665.07 4.948c.202 4.358 2.623 6.78 6.985 6.982 1.283.058 1.704.07 4.948.07 3.245 0 3.666-.012 4.948-.07 4.354-.202 6.782-2.624 6.979-6.982.058-1.283.07-1.704.07-4.948 0-3.245-.012-3.667-.07-4.948-.196-4.354-2.617-6.78-6.979-6.982C15.668.012 15.259 0 12 0z" />
          <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
          <circle cx="18.406" cy="5.595" r="1.44" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div
      className="min-h-[100dvh] bg-[#050505] relative overflow-hidden flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      {/* JoJo character accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {jjoCharacters.map((char, idx) => (
          <div
            key={idx}
            className="absolute opacity-[0.03] hover:opacity-[0.08] transition-opacity duration-500"
            style={{
              width: "10rem",
              height: "10rem",
              top: `${idx * 25}%`,
              right: `${idx * 15}%`,
              backgroundImage: `url(${char})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl px-6 md:px-8 relative z-10">
        {/* Hero Section */}
        <div className="mb-20">
          <div className="space-y-6">
            <h1
              ref={headlineRef}
              className="text-6xl md:text-7xl font-serif font-light tracking-tight leading-tight text-white"
              style={{ opacity: 0 }}
            >
              Let&apos;s connect.
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg text-[#e0e0e0] leading-relaxed max-w-xl"
              style={{ opacity: 0 }}
            >
              Reach out across your preferred platform. I&apos;m always interested
              in interesting projects, creative collaborations, and great conversations.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div ref={cardsRef} className="space-y-4">
          {contactLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-card block group transition-all duration-300"
              style={{ opacity: 0 }}
            >
              <div
                className="bezel-outer p-1 transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                style={{ transformStyle: "preserve-3d" }}
                ref={setupCardEffects}
              >
                <div className="bezel-inner p-6 bg-[#0a0a0a] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="icon-shell flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#111111] group-hover:border-[#3a3a3a] transition-colors duration-300 text-white">
                      <IconComponent type={link.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wider text-[#a0a0a0] font-medium mb-1">
                        {link.title}
                      </p>
                      <p className="text-base text-white font-medium truncate">
                        {link.value}
                      </p>
                    </div>
                  </div>
                  <div className="card-arrow flex-shrink-0 text-[#a0a0a0] group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20">
          <p
            ref={footerRef}
            className="text-sm text-[#a0a0a0] text-center"
            style={{ opacity: 0 }}
          >
            Built with intent. No spam, no vanity metrics.
          </p>
        </div>
      </div>
    </div>
  );
}