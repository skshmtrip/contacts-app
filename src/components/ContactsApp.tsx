"use client";

import Image from "next/image";
import { useMemo } from "react";

export default function ContactsApp() {
  const contactData = useMemo(() => ({
    email: "contactskshmtrip@gmail.com",
    github: "skshmtrip",
    instagram: "stemsaksham",
    linkedin: "krishna-tripathi-009008274",
    stackoverflow: "28962747",
  }), []);

  return (
    <div className="min-h-[100dvh] bg-zinc-950 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-4">
            Let's connect
          </h1>
          <p className="text-lg text-zinc-400 max-w-prose leading-relaxed">
            Reach out across your preferred platform. I'm always interested in interesting projects and conversations.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4">
          {/* Email - Primary */}
          <a 
            href={`mailto:${contactData.email}`}
            className="group block"
          >
            <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-800/50 group-hover:bg-zinc-700/50 transition-colors">
                  <svg className="w-6 h-6 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm uppercase tracking-widest text-zinc-500 mb-1">Email</p>
                  <p className="text-white font-medium truncate">{contactData.email}</p>
                </div>
                <div className="flex-shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* Social Links - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* GitHub */}
            <a 
              href={`https://github.com/${contactData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 group-hover:bg-zinc-700/50 transition-colors">
                    <Image
                      src="/GitHub_Invertocat_Logo.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-widest text-zinc-500 mb-1">GitHub</p>
                    <p className="text-white font-medium">@{contactData.github}</p>
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
              <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 group-hover:bg-zinc-700/50 transition-colors">
                    <Image
                      src="/linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-widest text-zinc-500 mb-1">LinkedIn</p>
                    <p className="text-white font-medium">Saksham Tripathi</p>
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
              <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 group-hover:bg-zinc-700/50 transition-colors">
                    <Image
                      src="/Instagram_logo_2016.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-widest text-zinc-500 mb-1">Instagram</p>
                    <p className="text-white font-medium">@{contactData.instagram}</p>
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
              <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 group-hover:bg-zinc-700/50 transition-colors">
                    <Image
                      src="/stackoverflow.svg"
                      alt="Stack Overflow"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-widest text-zinc-500 mb-1">Stack Overflow</p>
                    <p className="text-white font-medium">Saksham Tripathi</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-sm text-zinc-500">
            I typically respond to emails within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
