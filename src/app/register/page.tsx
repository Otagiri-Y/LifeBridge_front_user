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
    birth_date: "",
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
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error("必須項目を入力してください");
      }
      if (formData.password.length < 6) {
        throw new Error("パスワードは6文字以上で入力してください");
      }

      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST", // この行を追加
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "登録に失敗しました");
      }

      localStorage.setItem("token", data.access_token);
      router.push(`/personal_company?userId=${data.user_id}`);
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
          <h1 className="text-3xl text-black font-bold text-center mb-8">
            新規会員登録
          </h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="氏名"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-4 border text-black border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="住所"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-4 border text-black border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="birth_date"
              placeholder="年/月/日"
              value={formData.birth_date}
              onFocus={(e) => ((e.target as HTMLInputElement).type = "date")}
              onBlur={(e) => {
                if (!(e.target as HTMLInputElement).value) {
                  (e.target as HTMLInputElement).type = "text";
                }
              }}
              onChange={handleChange}
              className="w-full px-4 py-4 border text-black border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-4 border text-black border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="パスワード"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-4 border text-black border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-4 bg-primary-navy text-white font-bold rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-navy focus:ring-opacity-50 transition"
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
