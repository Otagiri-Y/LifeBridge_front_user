"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 業種の詳細項目
const jobDetailOptions = [
  // 1行目（横並び）
  [
    { id: "management_planning", name: "経営企画" },
    { id: "business_planning", name: "事業企画" },
  ],
  // 2行目（1つだけ）
  [
    { id: "alliance_planning", name: "アライアンス企画/推進" },
  ],
  // 3行目（1つだけ）
  [
    { id: "license_business", name: "ライセンスビジネス企画/開発" },
  ],
  // 4行目（横並び）
  [
    { id: "new_business", name: "新規事業企画/開発" },
    { id: "system_planning", name: "システム企画" },
  ],
  // 5行目（横並び）
  [
    { id: "research_data", name: "リサーチ/データ分析" },
    { id: "others", name: "その他" },
  ],
];

export default function JobDetailMultipleSelection() {
  const router = useRouter();
  // 選択されたオプションを配列で管理（複数選択可能）
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 詳細項目選択時の処理
  const handleDetailSelect = (detailId: string) => {
    // すでに選択されている場合は選択解除、そうでなければ選択に追加
    if (selectedDetails.includes(detailId)) {
      setSelectedDetails(selectedDetails.filter(id => id !== detailId));
    } else {
      setSelectedDetails([...selectedDetails, detailId]);
    }
  };

  // リセットボタンの処理
  const handleReset = () => {
    setSelectedDetails([]);
  };

  // 次へボタンの処理
  const handleNext = () => {
    if (selectedDetails.length > 0) {
      // 選択した詳細をセッションストレージに保存
      sessionStorage.setItem("selectedJobDetails", JSON.stringify(selectedDetails));
      
      // 選択された項目の名前も保存
      const selectedNames = selectedDetails.map(detailId => {
        // 全てのグループから該当するIDのアイテムを探す
        for (const group of jobDetailOptions) {
          const found = group.find(item => item.id === detailId);
          if (found) return found.name;
        }
        return "";
      }).filter(name => name); // 空の名前をフィルタリング
      
      sessionStorage.setItem("selectedJobDetailNames", JSON.stringify(selectedNames));
      
      // 次のページへ遷移
      router.push("/personal_workstyle");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-4 pt-6 pb-20">
        {/* 戻るボタン */}
        <div className="mb-4">
          <button
            onClick={() => router.push("/personal_plan")}
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

        {/* パンくずリスト */}
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
          <button className="text-gray-500">営業</button>
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
          <button className="text-blue-600 font-medium">
            機械/電気電子製品営業
          </button>
        </div>

        {/* 選択された詳細項目（各行ごとに表示） */}
        <div className="mb-8 space-y-4">
          {jobDetailOptions.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-2 gap-4">
              {row.map((detail) => (
                <div
                  key={detail.id}
                  className={`p-4 flex items-center border rounded-md ${
                    selectedDetails.includes(detail.id) ? "bg-blue-50" : "bg-gray-50"
                  } ${row.length === 1 ? "col-span-2" : ""}`}
                  onClick={() => handleDetailSelect(detail.id)}
                >
                  <div className="w-6 h-6 mr-3 border border-gray-300 flex items-center justify-center bg-white">
                    {selectedDetails.includes(detail.id) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-lg">{detail.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 固定ボタンエリア */}
        <div className="fixed bottom-16 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white border-t">
          <button
            onClick={handleReset}
            className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 active:bg-gray-200 transition-colors"
          >
            リセット
          </button>
          <button
            onClick={handleNext}
            disabled={selectedDetails.length === 0}
            className={`px-8 py-3 rounded-full text-white transition-colors ${
              selectedDetails.length > 0
                ? "bg-blue-700 active:bg-blue-800"
                : "bg-gray-400"
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