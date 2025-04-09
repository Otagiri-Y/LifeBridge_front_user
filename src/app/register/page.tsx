"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    birthdate: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 入力検証
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error("必須項目を入力してください");
      }

      if (formData.password.length < 6) {
        throw new Error("パスワードは6文字以上で入力してください");
      }

      // APIエンドポイントへのリクエスト
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "登録に失敗しました");
      }

      // 登録成功時に直近の所属会社名入力ページへリダイレクト
      // ユーザーIDをURLパラメータとして渡す
      router.push(`/personal_company?userId=${data.userId}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("登録中にエラーが発生しました");
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">新規会員登録</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="氏名"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="address"
                placeholder="住所"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <input
                type="date"
                name="birthdate"
                placeholder="年/月/日"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="メールアドレス"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="パスワード"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              disabled={loading}
            >
              {loading ? "登録中..." : "同意して会員登録"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
