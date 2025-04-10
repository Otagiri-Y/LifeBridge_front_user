"use client";

import React, { useState, } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// マーケティング関連の職種リスト
const marketingOccupations = [
  "経営/事業企画",
  "営業推進/企画",
  "商品企画",
  "マーケティング戦略企画",
  "マスマーケティング",
  "Web/ECサイト運営",
  "テクニカルマーケティング",
  "ブランディング",
  "カスタマーサクセス",
  "カスタマーサポート/コールセンター",
  "その他"
];

export default function MarketingOccupation() {
  const router = useRouter();
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 検索フィルター適用
  const filteredOccupations = marketingOccupations.filter(occupation => 
    occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 職種選択時の処理
  const handleOccupationSelect = (occupation: string) => {
    setSelectedOccupation(occupation);
  };

  // リセットボタンの処理
  const handleReset = () => {
    setSelectedOccupation(null);
  };

  // 次へボタンの処理
  const handleNext = () => {
    if (selectedOccupation) {
      // 選択した職種をセッションストレージに保存
      sessionStorage.setItem("selectedOccupation", selectedOccupation);
      // 次のページへ遷移
      router.push("/personal_plan_2");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-4 pt-6 pb-20">
        <div className="mb-4">
          <button
            onClick={() => router.push("/personal_occupation")}
            className="flex items-center text-xl font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            直近の経歴の職種
          </button>
        </div>

        {/* 検索バー */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="職種を検索する"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex mb-4 space-x-2 overflow-x-auto pb-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
            全て
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full whitespace-nowrap">
            企画/マーケティング/カスタマーサクセス
          </button>
        </div>

        {/* 職種リスト */}
        <div className="space-y-0 mb-24">
          {filteredOccupations.map((occupation, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 py-3 px-2 flex justify-between items-center cursor-pointer ${
                selectedOccupation === occupation ? "bg-blue-50" : ""
              }`}
              onClick={() => handleOccupationSelect(occupation)}
            >
              <div>
                <div className="font-medium">{occupation}</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* 固定ボタンエリア */}
        <div className="fixed bottom-16 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white border-t">
          <button
            onClick={handleReset}
            className="px-8 py-3 border border-gray-300 rounded-full text-gray-700"
          >
            リセット
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedOccupation}
            className={`px-8 py-3 rounded-full text-white ${
              selectedOccupation ? "bg-blue-700" : "bg-gray-400"
            }`}
          >
            次へ進む
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}