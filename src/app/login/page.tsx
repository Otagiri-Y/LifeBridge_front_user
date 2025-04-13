"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          router.push("/home");
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("トークン検証エラー:", err);
        localStorage.removeItem("token");
      }
    };

    checkToken();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "ログインに失敗しました");
      }

      localStorage.setItem("token", data.access_token);
      router.push("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider}でログイン`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold mb-4">
              あなたの理想の仕事がきっと見つかる
              <br />
              充実したセカンドキャリアを
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <input
              type="email"
              placeholder="メールアドレス"
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="パスワード"
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-4 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              disabled={loading}
            >
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">または</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin("Apple")}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="black">
                <path d="M17.05 20.28c-..." />
              </svg>
              Continue with Apple
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full text-blue-600 hover:bg-gray-50 focus:outline-none"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.9 2H3.1A1.1..." />
                </svg>
                Facebook
              </button>

              <button
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="..." />
                  <path fill="#34A853" d="..." />
                  <path fill="#4A90E2" d="..." />
                  <path fill="#FBBC05" d="..." />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
