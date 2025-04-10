"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 業界カテゴリのリスト
const industries = [
  "機械/電気電子製品営業",
  "建設/土木/プラント営業",
  "不動産営業",
  "IT/通信製品営業",
  "Webサービス/ゲーム営業",
  "自動車/輸送機器営業",
  "人材/アウトソーシング営業",
  "金融/保険営業",
  "広告/メディア/イベント営業",
  "化粧品/トイレタリー営業",
  "日用品/アパレル/インテリア営業",
  "食品/飲料/嗜好品営業",
  "化学/素材営業",
  "鉄鋼/非鉄金属/金属製品営業",
  "医療情報担当者/MR",
  "医療機器/医化学機器営業",
  "レジャー/トラベル営業",
  "その他営業",
];

export default function IndustrySelection() {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 検索フィルター適用
  const filteredIndustries = industries.filter((industry) =>
    industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 業界選択時の処理
  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
  };

  // リセットボタンの処理
  const handleReset = () => {
    setSelectedIndustry(null);
  };

  // 次へボタンの処理
  const handleNext = () => {
    if (selectedIndustry) {
      // 選択した業界をセッションストレージに保存
      sessionStorage.setItem("selectedIndustry", selectedIndustry);
      // 次のページへ遷移（ここでは仮にhomeにリダイレクト）
      router.push("/personal_sales_2");
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
        {/* パンくずリスト */}{" "}
        <div className="flex items-center text-sm mb-4 overflow-x-auto whitespace-nowrap">
          <button className="text-gray-500">全て</button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mx-1 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <button className="text-blue-600 font-medium">営業</button>
        </div>
        {/* 業界リスト */}
        <div className="space-y-0 mb-24">
          {filteredIndustries.map((industry, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 py-3 px-2 flex justify-between items-center cursor-pointer ${
                selectedIndustry === industry ? "bg-blue-50" : ""
              }`}
              onClick={() => handleIndustrySelect(industry)}
            >
              <div>
                <div className="font-medium">{industry}</div>
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
            disabled={!selectedIndustry}
            className={`px-8 py-3 rounded-full text-white ${
              selectedIndustry ? "bg-blue-700" : "bg-gray-400"
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
