"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function MainContent() {
  return (
    <main className="container mx-auto px-4 py-3 flex-grow">
      {/* 上部の薄い青色エリア - 幅を広げる */}
      <section className="bg-secondary-blue rounded-lg p-5 mb-5">
        <div className="text-center mb-3">
          <h2 className="text-xl font-bold mb-1">あなたの力が誰かの力に</h2>
          <p className="text-gray-600">セカンドキャリアの充実をサポート</p>
        </div>

        {/* 紺色のカード - 画像が収まるよう横幅を拡張 */}
        <div className="bg-primary-navy text-white rounded-lg p-5 relative min-h-[140px]">
          <div className="w-2/3">
            {" "}
            {/* テキスト部分の幅を制限 */}
            <div className="text-base leading-relaxed">
              <p>あなたの「理想」</p>
              <p className="whitespace-nowrap">のセカンドキャリア</p>
              <p>をマッチング</p>
            </div>
          </div>

          {/* 画像をカード内に収める */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <Image
              src="/top_image.svg"
              alt="セカンドキャリアイメージ"
              width={130}
              height={130}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* ボタンエリア */}
      <section className="space-y-3">
        {/* 会員登録ボタン */}
        <div className="relative">
          <Link href="/register" className="block">
            <button className="bg-primary-navy text-white font-bold py-3 px-6 rounded-lg w-full text-lg">
              まずは会員登録
            </button>
          </Link>
          <span className="absolute top-0 right-0 bg-accent-red text-white text-xs px-2 py-1 rounded-sm transform translate-x-2 -translate-y-2">
            無料
          </span>
        </div>

        {/* ログインボタン */}
        <Link href="/login" className="block">
          <button className="bg-secondary-blue text-primary-navy font-bold py-3 px-6 rounded-lg w-full text-lg">
            ログインはこちら
          </button>
        </Link>
      </section>
    </main>
  );
}
