"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jobDetailOptions = [
  [
    { id: "management_planning", name: "経営企画" },
    { id: "business_planning", name: "事業企画" },
  ],
  [{ id: "alliance_planning", name: "アライアンス企画/推進" }],
  [{ id: "license_business", name: "ライセンスビジネス企画/開発" }],
  [
    { id: "new_business", name: "新規事業企画/開発" },
    { id: "system_planning", name: "システム企画" },
  ],
  [
    { id: "research_data", name: "リサーチ/データ分析" },
    { id: "others", name: "その他" },
  ],
];

export default function JobDetailMultipleSelection() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);
  const [selectedDetailNames, setSelectedDetailNames] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // クエリパラメータから userId 取得
    const searchParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = searchParams.get("userId");
    setUserId(userIdFromUrl);

    // JWT トークンによる認証確認
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

  const handleDetailSelect = (detailId: string, detailName: string) => {
    if (selectedDetails.includes(detailId)) {
      setSelectedDetails((prev) => prev.filter((id) => id !== detailId));
      setSelectedDetailNames((prev) =>
        prev.filter((name) => name !== detailName)
      );
    } else {
      setSelectedDetails((prev) => [...prev, detailId]);
      setSelectedDetailNames((prev) => [...prev, detailName]);
    }
  };

  const handleReset = () => {
    setSelectedDetails([]);
    setSelectedDetailNames([]);
  };

  const handleNext = () => {
    if (!userId) {
      setError("ユーザーIDが見つかりません。登録をやり直してください。");
      return;
    }

    if (selectedDetails.length === 0) {
      setError("少なくとも1つの項目を選択してください");
      return;
    }

    // 擬似的に選択データを保存（バックエンドへは送信しない）
    sessionStorage.setItem(
      "selectedJobDetails",
      JSON.stringify(selectedDetails)
    );
    sessionStorage.setItem(
      "selectedJobDetailNames",
      JSON.stringify(selectedDetailNames)
    );

    router.push(`/personal_workstyle_plan?userId=${userId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-4 pt-6 pb-20 text-black">
        <div className="mb-4">
          <button
            onClick={() => router.push(`/personal_plan?userId=${userId}`)}
            className="flex items-center text-xl font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2  text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
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
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 border border-red-400">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="search"
            className="w-full p-3 pl-10 text-sm border border-gray-500 rounded-lg text-black"
            placeholder="職種を検索する"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-8 space-y-4">
          {jobDetailOptions.map((row, rowIndex) => {
            const filtered = searchTerm
              ? row.filter((detail) =>
                  detail.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
              : row;
            if (filtered.length === 0) return null;

            return (
              <div key={rowIndex} className="grid grid-cols-2 gap-4">
                {filtered.map((detail) => (
                  <div
                    key={detail.id}
                    className={`p-4 flex items-center border rounded-md cursor-pointer ${
                      selectedDetails.includes(detail.id)
                        ? "bg-blue-50"
                        : "bg-gray-50"
                    } ${filtered.length === 1 ? "col-span-2" : ""}`}
                    onClick={() => handleDetailSelect(detail.id, detail.name)}
                  >
                    <div className="w-6 h-6 mr-3 border border-gray-500 flex items-center justify-center bg-white">
                      {selectedDetails.includes(detail.id) && (
                        <svg
                          className="h-5 w-5 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
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
            );
          })}
        </div>

        <div className="fixed bottom-16 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white border-t">
          <button
            onClick={handleReset}
            className="px-8 py-3 border border-gray-600 rounded-full text-gray-700"
          >
            リセット
          </button>
          <button
            onClick={handleNext}
            disabled={selectedDetails.length === 0}
            className={`px-8 py-3 rounded-full text-white ${
              selectedDetails.length > 0 ? "bg-primary-navy" : "bg-gray-400"
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
