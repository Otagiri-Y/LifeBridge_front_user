"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jobDetails = [
  {
    id: "corporate_sales",
    name: "機械/電気/電子製品法人営業",
  },
];

export default function JobDetailSelection() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string>("");
  const [selectedDetailName, setSelectedDetailName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = searchParams.get("userId");
    setUserId(userIdFromUrl);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("ログイン情報が見つかりません。ログインし直してください。");
      return;
    }

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    fetch(`${API_BASE_URL}/api/auth/check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("認証に失敗しました");
        return res.json();
      })
      .catch((err) => {
        console.error(err);
        setError("認証エラーが発生しました。ログインを確認してください。");
      });
  }, []);

  const filteredDetails = searchTerm
    ? jobDetails.filter((detail) =>
        detail.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : jobDetails;

  const handleDetailSelect = (detailId: string, detailName: string) => {
    setSelectedDetail(detailId);
    setSelectedDetailName(detailName);
  };

  const handleReset = () => {
    setSelectedDetail("");
    setSelectedDetailName("");
  };

  const handleNext = () => {
    if (!userId) {
      setError("ユーザーIDが見つかりません。登録をやり直してください。");
      return;
    }

    if (!selectedDetail) {
      setError("職種詳細を選択してください");
      return;
    }

    sessionStorage.setItem("selectedJobDetail", selectedDetail);
    sessionStorage.setItem("selectedJobDetailName", selectedDetailName);
    router.push(`/personal_workstyle_sales?userId=${userId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-4 pt-6 pb-20">
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="search"
            className="w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg"
            placeholder="職種を検索する"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-8 space-y-4">
          {filteredDetails.map((detail) => (
            <div
              key={detail.id}
              className={`p-4 flex items-center border rounded-md cursor-pointer ${
                selectedDetail === detail.id ? "bg-blue-50" : "bg-gray-50"
              }`}
              onClick={() => handleDetailSelect(detail.id, detail.name)}
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

        <div className="fixed bottom-16 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white border-t">
          <button
            onClick={handleReset}
            className="px-8 py-3 border border-gray-300 rounded-full text-gray-700"
          >
            リセット
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedDetail}
            className={`px-8 py-3 rounded-full text-white ${
              selectedDetail ? "bg-blue-700" : "bg-gray-400"
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
