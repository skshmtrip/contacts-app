"use client";

import { useEffect, useRef } from "react";

interface ContactLink {
  title: string;
  value: string;
  href: string;
  icon: string;
}

export default function ContactsApp() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

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

  // ── Anime.js animations ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Dynamic import so SSR is never touched
      const anime = (await import("animejs")).default;

      if (cancelled) return;

      // ── 1. Text-scramble reveal on the headline ──────────────────────────
      const headline = headlineRef.current;
      if (headline) {
        const finalText = "Let's connect.";
        const chars = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Build an array of span elements, one per character (incl. spaces)
        headline.innerHTML = "";
        const spans: HTMLSpanElement[] = finalText.split("").map((ch) => {
          const s = document.createElement("span");
          s.style.opacity = "0";
          s.style.display = "inline";
          // Preserve spaces
          s.textContent = ch === " " ? "\u00A0" : chars[Math.floor(Math.random() * chars.length)];
          headline.appendChild(s);
          return s;
        });

        // Stagger the reveal: each letter fades in and scrambles into place
        spans.forEach((span, i) => {
          const delay = i * 55;
          const duration = 420;
          const scrambleCycles = 7;

          setTimeout(() => {
            if (cancelled) return;

            let frame = 0;
            span.style.opacity = "1";

            const tick = () => {
              if (cancelled) return;
              frame++;
              if (frame < scrambleCycles) {
                span.textContent =
                  finalText[i] === " "
                    ? "\u00A0"
                    : chars[Math.floor(Math.random() * chars.length)];
                setTimeout(tick, duration / scrambleCycles);
              } else {
                span.textContent = finalText[i] === " " ? "\u00A0" : finalText[i];
              }
            };
            tick();
          }, delay);
        });
      }

      // ── 2. Subtitle fade-up ──────────────────────────────────────────────
      if (subtitleRef.current) {
        anime({
          targets: subtitleRef.current,
          opacity: [0, 1],
          translateY: [18, 0],
          easing: "easeOutExpo",
          duration: 900,
          delay: contactLinks.length * 55 + 300,
        });
      }

      // ── 3. Cards staggered spring entrance ──────────────────────────────
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>(".contact-card");
        // Start them invisible/translated
        cards.forEach((c) => {
          (c as HTMLElement).style.opacity = "0";
          (c as HTMLElement).style.transform = "translateY(28px)";
        });

        anime({
          targets: cards,
          opacity: [0, 1],
          translateY: [28, 0],
          easing: "spring(1, 80, 12, 0)",
          delay: anime.stagger(90, { start: 700 }),
        });
      }

      // ── 4. Footer fade in ────────────────────────────────────────────────
      if (footerRef.current) {
        anime({
          targets: footerRef.current,
          opacity: [0, 1],
          translateY: [10, 0],
          easing: "easeOutCubic",
          duration: 700,
          delay: 1500,
        });
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  // ── Magnetic / tilt hover on each card ──────────────────────────────────
  const attachMagnetic = async (el: HTMLDivElement | null) => {
    if (!el) return;
    const anime = (await import("animejs")).default;

    const inner = el.querySelector<HTMLElement>(".bezel-inner");
    if (!inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      anime({
        targets: inner,
        rotateX: dy * -6,   // subtle Y-axis tilt
        rotateY: dx * 6,    // subtle X-axis tilt
        translateX: dx * 4,
        translateY: dy * 4,
        easing: "easeOutElastic(1, 0.5)",
        duration: 400,
      });
    };

    const onLeave = () => {
      anime({
        targets: inner,
        rotateX: 0,
        rotateY: 0,
        translateX: 0,
        translateY: 0,
        easing: "spring(1, 90, 14, 0)",
        duration: 600,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    // Return cleanup so React doesn't leak listeners
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  };

  // ── Bezel glow pulse on hover ────────────────────────────────────────────
  const attachGlow = async (el: HTMLDivElement | null) => {
    if (!el) return;
    const anime = (await import("animejs")).default;
    let glowAnim: ReturnType<typeof anime> | null = null;

    const onEnter = () => {
      glowAnim = anime({
        targets: el,
        boxShadow: [
          "0 0 0px rgba(255,255,255,0.00)",
          "0 0 24px rgba(255,255,255,0.08)",
          "0 0 0px rgba(255,255,255,0.00)",
        ],
        easing: "easeInOutSine",
        duration: 1200,
        loop: true,
        direction: "normal",
      });
    };

    const onLeave = () => {
      if (glowAnim) { glowAnim.pause(); }
      anime({
        targets: el,
        boxShadow: "0 0 0px rgba(255,255,255,0.00)",
        duration: 300,
        easing: "easeOutQuad",
      });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
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
    <div className="min-h-[100dvh] bg-[#050505] relative overflow-hidden flex items-center justify-center"
      style={{ perspective: "1000px" }}>

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
            <div className="space-y-2">
              {/* Headline — scramble target */}
              <h1
                ref={headlineRef}
                className="text-6xl md:text-7xl font-serif font-light tracking-tight leading-tight text-white"
                style={{ opacity: 1 }}
              >
                Let&apos;s connect.
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="text-lg text-[#e0e0e0] leading-relaxed max-w-xl"
              style={{ opacity: 0 }}
            >
              Reach out across your preferred platform. I&apos;m always interested in interesting projects, creative collaborations, and great conversations.
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
                ref={(el) => {
                  attachMagnetic(el);
                  attachGlow(el);
                }}
              >
                <div className="bezel-inner p-6 bg-[#0a0a0a] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#111111] group-hover:border-[#3a3a3a] transition-colors duration-300 text-white">
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

                  <div className="flex-shrink-0 text-[#a0a0a0] group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
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