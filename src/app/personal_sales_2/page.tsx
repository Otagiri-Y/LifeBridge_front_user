"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 業種の詳細項目
const jobDetails = [
  {
    id: "corporate_sales",
    name: "機械/電気/電子製品法人営業",
  },
  // 実際には他の詳細項目も追加可能
];

export default function JobDetailSelection() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  // 初期状態では選択なし（空文字列）に設定
  const [selectedDetail, setSelectedDetail] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // URLからuserIdを取得
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const userIdFromUrl = searchParams.get("userId");
      setUserId(userIdFromUrl);
    }
  }, []);

  // 詳細項目選択時の処理
  const handleDetailSelect = (detailId: string) => {
    // すでに選択されている場合は選択解除、そうでなければ選択
    setSelectedDetail(selectedDetail === detailId ? "" : detailId);
  };

  // リセットボタンの処理
  const handleReset = () => {
    setSelectedDetail("");
  };

  // 次へボタンの処理
  const handleNext = () => {
    if (!selectedDetail) {
      setError("職種詳細を選択してください");
      return;
    }

    if (!userId) {
      setError("ユーザーIDが見つかりません");
      return;
    }

    setLoading(true);

    try {
      // 選択した詳細をセッションストレージに保存
      sessionStorage.setItem("selectedJobDetail", selectedDetail);

      // 選択された項目の名前も保存
      const selectedItem = jobDetails.find(
        (item) => item.id === selectedDetail
      );

      if (selectedItem) {
        sessionStorage.setItem("selectedJobDetailName", selectedItem.name);
      }

      // 次のページへ遷移
      router.push(`/personal_workstyle_sales?userId=${userId}`);
    } catch (err) {
      console.error("Error in navigation:", err);
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  // 検索フィルタリング機能
  const filteredDetails = searchTerm
    ? jobDetails.filter((detail) =>
        detail.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : jobDetails;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-4 pt-6 pb-20">
        {/* 戻るボタン */}
        <div className="mb-4">
          <button
            onClick={() => router.push(`/personal_sales?userId=${userId}`)}
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

        {/* パンくずリスト */}
        <div className="flex items-center text-sm mb-4 overflow-x-auto whitespace-nowrap">
          <button
            className="text-gray-500"
            onClick={() => router.push(`/personal_occupation?userId=${userId}`)}
          >
            全て
          </button>
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
          <button
            className="text-gray-500"
            onClick={() => router.push(`/personal_sales?userId=${userId}`)}
          >
            営業
          </button>
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* 選択された詳細項目 */}
        <div className="mb-8">
          {filteredDetails.map((detail) => (
            <div
              key={detail.id}
              className={`p-4 flex items-center border rounded-md mb-2 ${
                selectedDetail === detail.id ? "bg-blue-50" : "bg-gray-50"
              }`}
              onClick={() => handleDetailSelect(detail.id)}
            >
              <div className="w-6 h-6 mr-3 border border-gray-300 flex items-center justify-center bg-white">
                {selectedDetail === detail.id && (
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
            disabled={loading || !selectedDetail}
            className={`px-8 py-3 rounded-full text-white transition-colors ${
              selectedDetail
                ? "bg-indigo-600 active:bg-indigo-700"
                : "bg-gray-400"
            }`}
          >
            {loading ? "処理中..." : "次へ進む"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
