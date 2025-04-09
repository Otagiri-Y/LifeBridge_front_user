"use client";

import React, { useState, useEffect } from "react";
//import Image from "next/image"; // 必要になったら有効化
//import Link from "next/link"; // 必要になったら有効化
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login, error: authError, loading, clearError, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ユーザーが既にログインしている場合はホームページにリダイレクト
  useEffect(() => {
    if (user) {
      router.push("/home");
    }

    // authContextからのエラーを反映
    if (authError) {
      setError(authError);
      clearError();
    }
  }, [user, router, authError, clearError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 入力検証
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    // AuthContextのlogin関数を使用
    try {
      await login(email, password);
    } catch {
      // エラーはAuthContextで処理されるのでここでは何もしない
      // 変数名を省略することで未使用変数の警告を回避
    }
  };

  const handleSocialLogin = (provider: string) => {
    // ソーシャルログインの処理
    console.log(`${provider}でログイン`);
    // 実際の実装ではOAuthフローを開始するコードに置き換えてください
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* タイトル部分 */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold mb-4">
              あなたの理想の仕事がきっと見つかる
              <br />
              充実したセカンドキャリアを
            </h1>
          </div>

          {/* ログインフォーム */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div>
              <input
                type="email"
                placeholder="メールアドレス"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="パスワード"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              disabled={loading}
            >
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          {/* 区切り線 */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">または</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* ソーシャルログイン */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin("Apple")}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.91 3.57-.78 1.5.15 2.63.84 3.38 2.16-3.38 2.05-2.85 5.83.27 7.06-.76 1.87-1.83 3.76-3.3 5.73z"></path>
                <path d="M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.34 2.19-1.65 4.11-3.74 4.25z"></path>
              </svg>
              Continue with Apple
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full text-blue-600 hover:bg-gray-50 focus:outline-none"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4 20.26 20.26 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2z" />
                </svg>
                Facebook
              </button>
              
              <button
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
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