"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "./ui/card";

const jjbaImages = [
  "1200px-Josuke_DU_Infobox_Manga.svg",
  "800px-Josuke_JJL_Infobox_Manga.svg",
  "NicePng_master-roshi-png_1667623.svg",
];

interface BackgroundImage {
  src: string;
  left: number;
  top: number;
  rotate: number;
  size: number;
  isVisible: boolean;
}

const BackgroundImageComponent = ({ img, idx }: { img: BackgroundImage; idx: number }) => {
  if (!img.isVisible) return null;
  
  return (
    <div
      key={idx}
      style={{
        position: "absolute",
        opacity: 0.2,
        pointerEvents: "none",
        left: `${img.left}%`,
        top: `${img.top}%`,
        width: `${img.size}px`,
        height: `${img.size}px`,
        transform: `translate(-50%, -50%) rotate(${img.rotate}deg)`,
      }}
    >
      <Image
        src={`/jjba pics/${img.src}`}
        alt="JJBA background"
        fill
        style={{ objectFit: "contain" }}
        loading="lazy"
        unoptimized
      />
    </div>
  );
};

export default function ContactsApp() {
  const contactData = useMemo(() => ({
    email: "contactskshmtrip@gmail.com",
    github: "skshmtrip",
    instagram: "stemsaksham",
    linkedin: "krishna-tripathi-009008274",
    stackoverflow: "28962747",
  }), []);

  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>([]);

  useEffect(() => {
    // Generate random background images only on client after hydration
    // Create a grid of positions to avoid overlapping and going off-screen
    const cols = 3;
    const rows = 2;
    const images: BackgroundImage[] = [];
    const usedIndices = new Set<number>();

    for (let i = 0; i < cols * rows; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Get a random image index that hasn't been used yet
      let imgIndex: number;
      do {
        imgIndex = Math.floor(Math.random() * jjbaImages.length);
      } while (usedIndices.has(imgIndex) && usedIndices.size < jjbaImages.length);
      usedIndices.add(imgIndex);

      images.push({
        src: jjbaImages[imgIndex],
        left: (col + 0.5) * (100 / cols) + (Math.random() - 0.5) * 15,
        top: (row + 0.5) * (100 / rows) + (Math.random() - 0.5) * 15,
        rotate: Math.random() * 360 - 180,
        size: 80 + Math.random() * 60,
        isVisible: true,
      });
    }
    setBackgroundImages(images);
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center relative overflow-hidden">
      {/* Background JJBA Images - Lazy loaded */}
      {backgroundImages.map((img, idx) => (
        <BackgroundImageComponent key={idx} img={img} idx={idx} />
      ))}

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-lg">Connect with me on multiple platforms</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email - spans full width */}
          <a 
            href={`mailto:${contactData.email}`} 
            className="md:col-span-2 cursor-default"
            onDragStart={(e) => e.preventDefault()}
          >
            <Card className="h-full border-0 bg-gray-900 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full select-text">
                <span className="text-5xl mb-4">✉️</span>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-lg font-bold text-white text-center break-all">{contactData.email}</p>
              </CardContent>
            </Card>
          </a>

          {/* GitHub */}
          <a href={`https://github.com/${contactData.github}`} target="_blank" rel="noopener noreferrer">
            <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gray-900 cursor-pointer overflow-hidden group">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <div className="relative w-16 h-16 mb-4 group-hover:scale-125 transition-transform duration-300">
                  <Image
                    src="/GitHub_Invertocat_Logo.svg"
                    alt="GitHub"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-400 text-sm mb-1">GitHub</p>
                <p className="text-lg font-bold text-white group-hover:text-red-500 transition-colors text-center">@{contactData.github}</p>
              </CardContent>
            </Card>
          </a>

          {/* Instagram */}
          <a href={`https://instagram.com/${contactData.instagram}`} target="_blank" rel="noopener noreferrer">
            <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gray-900 cursor-pointer overflow-hidden group">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <div className="relative w-16 h-16 mb-4 group-hover:scale-125 transition-transform duration-300">
                  <Image
                    src="/Instagram_logo_2016.svg"
                    alt="Instagram"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-400 text-sm mb-1">Instagram</p>
                <p className="text-lg font-bold text-white group-hover:text-red-500 transition-colors text-center">@{contactData.instagram}</p>
              </CardContent>
            </Card>
          </a>

          {/* LinkedIn */}
          <a href={`https://linkedin.com/in/${contactData.linkedin}`} target="_blank" rel="noopener noreferrer">
            <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gray-900 cursor-pointer overflow-hidden group">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <div className="relative w-16 h-16 mb-4 group-hover:scale-125 transition-transform duration-300">
                  <Image
                    src="/linkedin.svg"
                    alt="LinkedIn"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-400 text-sm mb-1">LinkedIn</p>
                <p className="text-lg font-bold text-white group-hover:text-red-500 transition-colors text-center">Saksham Tripathi</p>
              </CardContent>
            </Card>
          </a>

          {/* Stack Overflow */}
          <a href={`https://stackoverflow.com/users/${contactData.stackoverflow}`} target="_blank" rel="noopener noreferrer">
            <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gray-900 cursor-pointer overflow-hidden group">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <div className="relative w-16 h-16 mb-4 group-hover:scale-125 transition-transform duration-300">
                  <Image
                    src="/stackoverflow.svg"
                    alt="Stack Overflow"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-400 text-sm mb-1">Stack Overflow</p>
                <p className="text-lg font-bold text-white group-hover:text-red-500 transition-colors text-center">Saksham Tripathi</p>
              </CardContent>
            </Card>
          </a>
        </div>

        <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-300">
            <span className="text-2xl mr-2">👋</span>
            <span>Feel free to reach out!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
