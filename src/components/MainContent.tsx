"use client";
// src/components/MainContent.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート

export default function MainContent() {
  return (
    <main className="container mx-auto px-4 py-6 flex-grow">
      {/* 上部の青いエリア */}
      <section className="bg-blue-100 rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <h2 className="text-xl font-medium mb-2">あなたの力が誰かの力に</h2>
          <p className="text-gray-600">セカンドキャリアの充実をサポート</p>
        </div>

        {/* 青いカード - サンプル画像に合わせて修正 */}
        <div className="bg-blue-700 text-white rounded-lg p-4 flex items-center justify-between">
          <div className="ml-2">
            <p className="mb-1">あなたの「理想」の</p>
            <p className="mb-1">セカンドキャリアを</p>
            <p>マッチング</p>
          </div>
          <div className="w-20 h-20 relative mr-2">
            {/* top_image.svgを使用 */}
            <Image
              src="/top_image.svg"
              alt="セカンドキャリアイメージ"
              width={80}
              height={80}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ボタンエリア */}
      <section className="space-y-4">
        {/* 会員登録ボタンをリンクに変更、デザイン修正 */}
        <Link href="/register" className="block">
          <div className="relative">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-lg w-full">
              まずは会員登録
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                無料
              </span>
            </button>
          </div>
        </Link>

        {/* ログインボタンをリンクに変更 */}
        <Link href="/login" className="block">
          <button className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-4 px-6 rounded-lg w-full">
            ログインはこちら
          </button>
        </Link>
      </section>
    </main>
  );
}
