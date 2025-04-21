"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** 送信処理 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  /** ソーシャルボタン共通クラス */
  const socialBtn =
    "flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition";

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

          {/* ===== フォーム ===== */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
                <button
                  type="button"
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={clearError}
                >
                  ×
                </button>
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
              className="w-full py-4 bg-primary-navy text-white font-bold rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-navy focus:ring-opacity-50 transition"
              disabled={loading}
            >
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          {/* 区切り線 */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">または</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* ===== ソーシャルログイン ===== */}
          <div className="space-y-3">
            {/* Apple */}
            <button
              onClick={() => console.log("Apple でログイン")}
              className={`${socialBtn} text-gray-700 w-full`}
            >
              <svg
                className="h-6 w-6 mr-4"
                viewBox="0 0 170 170"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71 0.12 1.083 0.17 2.166 0.17 3.241z" />
              </svg>
              <span className="flex-grow text-center">Continue with Apple</span>
            </button>

            <div className="grid grid-cols-2 gap-4">
              {/* Facebook */}
              <button
                onClick={() => console.log("Facebook でログイン")}
                className={`${socialBtn} text-blue-600`}
              >
                <svg
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.407.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.892-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
                </svg>
                <span>Facebook</span>
              </button>

              {/* Google */}
              <button
                onClick={() => console.log("Google でログイン")}
                className={`${socialBtn} text-gray-700`}
              >
                <svg
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.805 10.023h-9.18v3.938h5.625c-.244 1.458-1.125 2.963-2.37 3.89l-.022.152 3.443 2.645.239.024c2.195-2.026 3.465-5.013 3.465-8.558 0-.814-.073-1.602-.2-2.363z" />
                  <path d="M12.625 22.594c3.15 0 5.787-1.04 7.716-2.828l-3.672-2.809c-1.008.69-2.325 1.17-4.044 1.17-3.1 0-5.73-2.084-6.666-4.896l-.14.012-3.593 2.78-.047.136c1.916 3.772 5.82 6.435 10.446 6.435z" />
                  <path d="M5.959 12.231c-.229-.685-.36-1.415-.36-2.165 0-.75.13-1.48.352-2.165l-.006-.145-3.643-2.817-.119.058c-.787 1.558-1.238 3.307-1.238 5.069 0 1.76.445 3.505 1.229 5.06l3.785-2.995z" />
                  <path d="M12.625 4.609c1.707 0 2.861.744 3.518 1.37l2.567-2.508C17.404 1.364 14.993.25 12.625.25 7.999.25 4.094 2.914 2.178 6.686l3.777 2.996c.957-2.811 3.586-4.895 6.67-4.895z" />
                </svg>
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
