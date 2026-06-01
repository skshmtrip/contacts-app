"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

export default function ContactsApp() {
  const contactData = useMemo(() => ({
    email: "contactskshmtrip@gmail.com",
    github: "skshmtrip",
    instagram: "stemsaksham",
    linkedin: "krishna-tripathi-009008274",
    stackoverflow: "28962747",
  }), []);

  const characters = [
    "/jjba pics/jotaro-kujostardust-crusadersjojos-bizarre-adventuretransparentmy-jojos-bizarre-adventure-11562915815zv7cmo7oie.svg",
    "/jjba pics/400px-Giorno_Giovanna_Infobox_Manga.svg",
    "/jjba pics/1200px-Josuke_DU_Infobox_Manga.svg",
  ];

  const [currentCharacter, setCurrentCharacter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCharacter((prev) => (prev + 1) % characters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [characters.length]);

  const ContactCard = ({ href, title, value, icon: Icon }: { href: string; title: string; value: string; icon?: React.ComponentType<{ className: string }> }) => (
    <a 
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <div className="relative overflow-hidden p-6 border border-violet-500/30 rounded-xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 hover:from-violet-900/40 hover:to-purple-900/20 hover:border-violet-400/50 transition-all duration-300 transform hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/0 to-violet-600/0 group-hover:via-violet-600/10 transition-all duration-500 pointer-events-none" />
        <div className="relative flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/40 to-purple-600/40 group-hover:from-violet-500/60 group-hover:to-purple-500/60 transition-all duration-300 border border-violet-400/20">
            {Icon ? (
              <Icon className="w-6 h-6 text-violet-300" />
            ) : null}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-widest text-violet-400/70 mb-1 font-semibold">{title}</p>
            <p className="text-white font-medium truncate text-sm">{value}</p>
          </div>
          <div className="flex-shrink-0 text-violet-400/40 group-hover:text-violet-300/80 transition-all duration-300 transform group-hover:translate-x-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );

  const EmailIcon = () => (
    <svg className="w-6 h-6 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 p-6 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent leading-none">
                Let's connect
              </h1>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000" />
                <div className="w-2 h-2 bg-violet-300 rounded-full animate-pulse delay-500" />
              </div>
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed max-w-md">
              Reach out across your preferred platform. I'm always interested in interesting projects, creative collaborations, and great conversations.
            </p>
          </div>

          {/* Right: Character Image */}
          <div className="relative h-full min-h-96 flex items-center justify-center">
            <div className="relative w-full h-full max-h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent rounded-2xl" />
              <div className="absolute inset-0 border border-violet-400/30 rounded-2xl" />
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                {characters.map((char, idx) => (
                  <Image
                    key={idx}
                    src={char}
                    alt="Character"
                    width={400}
                    height={400}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      idx === currentCharacter ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 rounded-2xl blur-xl -z-10" />
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="space-y-3">
          {/* Email - Primary */}
          <ContactCard 
            href={`mailto:${contactData.email}`}
            title="Email"
            value={contactData.email}
            icon={EmailIcon}
          />

          {/* Social Links - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {/* GitHub */}
            <a 
              href={`https://github.com/${contactData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden p-5 border border-violet-500/30 rounded-xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 hover:from-violet-900/40 hover:to-purple-900/20 hover:border-violet-400/50 transition-all duration-300 transform hover:scale-105 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/0 to-violet-600/0 group-hover:via-violet-600/10 transition-all duration-500 pointer-events-none" />
                <div className="relative flex flex-col items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/40 to-purple-600/40 group-hover:from-violet-500/60 group-hover:to-purple-500/60 transition-all duration-300 border border-violet-400/20">
                    <Image
                      src="/GitHub_Invertocat_Logo.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-violet-400/70 font-semibold">GitHub</p>
                    <p className="text-white font-medium text-sm">@{contactData.github}</p>
                  </div>
                </div>
              </div>
            </a>

            {/* LinkedIn */}
            <a 
              href={`https://linkedin.com/in/${contactData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden p-5 border border-violet-500/30 rounded-xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 hover:from-violet-900/40 hover:to-purple-900/20 hover:border-violet-400/50 transition-all duration-300 transform hover:scale-105 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/0 to-violet-600/0 group-hover:via-violet-600/10 transition-all duration-500 pointer-events-none" />
                <div className="relative flex flex-col items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/40 to-purple-600/40 group-hover:from-violet-500/60 group-hover:to-purple-500/60 transition-all duration-300 border border-violet-400/20">
                    <Image
                      src="/linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-violet-400/70 font-semibold">LinkedIn</p>
                    <p className="text-white font-medium text-sm">Saksham Tripathi</p>
                  </div>
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a 
              href={`https://instagram.com/${contactData.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden p-5 border border-violet-500/30 rounded-xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 hover:from-violet-900/40 hover:to-purple-900/20 hover:border-violet-400/50 transition-all duration-300 transform hover:scale-105 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/0 to-violet-600/0 group-hover:via-violet-600/10 transition-all duration-500 pointer-events-none" />
                <div className="relative flex flex-col items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/40 to-purple-600/40 group-hover:from-violet-500/60 group-hover:to-purple-500/60 transition-all duration-300 border border-violet-400/20">
                    <Image
                      src="/Instagram_logo_2016.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-violet-400/70 font-semibold">Instagram</p>
                    <p className="text-white font-medium text-sm">@{contactData.instagram}</p>
                  </div>
                </div>
              </div>
            </a>

            {/* Stack Overflow */}
            <a 
              href={`https://stackoverflow.com/users/${contactData.stackoverflow}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden p-5 border border-violet-500/30 rounded-xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 hover:from-violet-900/40 hover:to-purple-900/20 hover:border-violet-400/50 transition-all duration-300 transform hover:scale-105 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/0 to-violet-600/0 group-hover:via-violet-600/10 transition-all duration-500 pointer-events-none" />
                <div className="relative flex flex-col items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/40 to-purple-600/40 group-hover:from-violet-500/60 group-hover:to-purple-500/60 transition-all duration-300 border border-violet-400/20">
                    <Image
                      src="/stackoverflow.svg"
                      alt="Stack Overflow"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-violet-400/70 font-semibold">Stack Overflow</p>
                    <p className="text-white font-medium text-sm">Saksham Tripathi</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-8 border-t border-violet-500/20">
          <p className="text-sm text-zinc-400">
            I typically respond to emails within 24 hours. Let's build something amazing together!
          </p>
        </div>
      </div>
    </div>
  );
}
