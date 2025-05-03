"use client";
import Image from "next/image";

interface PageBackgroundProps {
  imagePath?: string;
  opacity?: number;
  blur?: number;
}

export default function PageBackground({ 
  imagePath = "/background.jpg", 
  opacity = 1, 
  blur = 1 
}: PageBackgroundProps) {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Image
        src={imagePath}
        alt="Background"
        fill
        priority
        className="object-cover"
        style={{ 
          objectPosition: 'center',
          opacity: opacity,
          filter: `blur(${blur}px)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/100" />
    </div>
  );
}