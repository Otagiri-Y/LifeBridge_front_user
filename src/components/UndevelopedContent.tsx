"use client";
// src/components/ImageOnlyContent.tsx
import React from "react";
import Image from "next/image";

export default function ImageOnlyContent() {
  return (
    <main className="container mx-auto px-4 py-6 flex-grow flex justify-center items-center">
      {/* 画像のみを表示 */}
      <div className="w-60 h-60 relative">
        <Image
          src="/ozigi_suit_man_color 1.svg"
          alt="セカンドキャリアイメージ"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </main>
  );
}