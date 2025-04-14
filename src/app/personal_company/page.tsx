"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PersonalCompany() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!companyName.trim()) {
      setError("会社名を入力してください。");
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
      const response = await fetch(`${API_BASE_URL}/api/user/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ company_name: companyName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "会社名の保存に失敗しました");
      }

      sessionStorage.setItem("lastCompany", companyName);
      router.push(`/personal_occupation`);
    } catch (err) {
      console.error("Error saving company:", err);
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

      <main className="flex-grow px-4 pt-6">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
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
            直近の所属会社名
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-8">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="会社名を入力してください"
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {loading ? "処理中..." : "次へ進む"}
        </button>
      </main>

      <Footer />
    </div>
  );
}
