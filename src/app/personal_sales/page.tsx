"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 営業職の詳細リスト
const salesJobDetails = [
  { id: "machinery_electric", name: "機械/電気電子製品営業" },
  { id: "construction", name: "建設/土木/プラント営業" },
  { id: "real_estate", name: "不動産営業" },
  { id: "it_communication", name: "IT/通信製品営業" },
  { id: "web_game", name: "Webサービス/ゲーム営業" },
  { id: "automotive", name: "自動車/輸送機器営業" },
  { id: "hr_outsourcing", name: "人材/アウトソーシング営業" },
  { id: "finance_insurance", name: "金融/保険営業" },
  { id: "ad_media_event", name: "広告/メディア/イベント営業" },
  { id: "cosmetics", name: "化粧品/トイレタリー営業" },
  { id: "daily_apparel", name: "日用品/アパレル/インテリア営業" },
  { id: "food_beverage", name: "食品/飲料/嗜好品営業" },
  { id: "chemical", name: "化学/素材営業" },
  { id: "metal", name: "鉄鋼/非鉄金属/金属製品営業" },
  { id: "mr", name: "医療情報担当者/MR" },
  { id: "medical_device", name: "医療機器/医化学機器営業" },
  { id: "leisure_travel", name: "レジャー/トラベル営業" },
  { id: "other_sales", name: "その他営業" },
];

export default function SalesDetail() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string>("");
  const [selectedDetailName, setSelectedDetailName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = searchParams.get("userId");
    setUserId(userIdFromUrl);
  }, []);

  const filteredDetails = salesJobDetails.filter((detail) =>
    detail.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailSelect = (detailId: string, detailName: string) => {
    setSelectedDetail(detailId);
    setSelectedDetailName(detailName);
    sessionStorage.setItem("jobTypeDetailId", detailId);
    sessionStorage.setItem("jobTypeDetailName", detailName);
  };

  const handleReset = () => {
    setSelectedDetail("");
    setSelectedDetailName("");
    sessionStorage.removeItem("jobTypeDetailId");
    sessionStorage.removeItem("jobTypeDetailName");
  };

  const handleNext = async () => {
    if (!selectedDetail) {
      setError("職種詳細を選択してください");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("認証情報が見つかりません。ログインし直してください。");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/user/job_type_detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ job_type_detail: selectedDetailName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "職種詳細情報の保存に失敗しました");
      }

      router.push(`/personal_sales_2?userId=${userId}`);
    } catch (err) {
      console.error("Error saving job type detail:", err);
      setError(
        err instanceof Error ? err.message : "エラーが発生しました。もう一度お試しください。"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow px-4 pt-6 pb-20">
        <div className="mb-4">
          <button
            onClick={() => router.push(`/personal_occupation?userId=${userId}`)}
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
          <button className="text-blue-600 font-medium">営業</button>
        </div>

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

        <div className="space-y-0 mb-24">
          {filteredDetails.map((detail) => (
            <div
              key={detail.id}
              className={`border-b border-gray-200 py-3 px-2 flex justify-between items-center cursor-pointer ${
                selectedDetail === detail.id ? "bg-blue-50" : ""
              }`}
              onClick={() => handleDetailSelect(detail.id, detail.name)}
            >
              <div className="font-medium">{detail.name}</div>
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

        <div className="fixed bottom-16 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white border-t">
          <button
            onClick={handleReset}
            className="px-8 py-3 border border-gray-300 rounded-full text-gray-700"
          >
            リセット
          </button>
          <button
            onClick={handleNext}
            disabled={loading || !selectedDetail}
            className={`px-8 py-3 rounded-full text-white ${
              selectedDetail ? "bg-blue-700" : "bg-gray-400"
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
