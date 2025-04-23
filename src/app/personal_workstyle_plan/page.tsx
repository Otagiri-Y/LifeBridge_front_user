"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const environmentOptions = {
  atmosphere: [
    { id: "bright", name: "明るい" },
    { id: "at_home", name: "アットホーム" },
    { id: "calm", name: "落ち着いている" },
  ],
  ageGroup: [
    { id: "young_centered", name: "若手が中心" },
    { id: "wide_age_range", name: "幅広い年代中心" },
  ],
  workStyle: [
    { id: "teamwork_oriented", name: "チームワーク重視" },
    { id: "individual_work_oriented", name: "個人ワーク重視" },
  ],
  workPurpose: [
    { id: "social_contribution", name: "社会貢献" },
    { id: "income_securing", name: "収入確保" },
    { id: "pastime", name: "暇つぶし" },
    { id: "lifetime_active", name: "生涯現役" },
    { id: "want_to_interact", name: "人と関わりたい" },
  ],
  idealRole: [
    { id: "support_quietly", name: "裏方で静かに支えたい" },
    { id: "advice_with_experience", name: "経験を活かしてアドバイスしたい" },
    { id: "regional_involvement", name: "地域と関わる活動がしたい" },
    { id: "support_someone", name: "誰かをサポートしたい" },
    { id: "utilize_ideas", name: "自分の考えや提案を活かしたい" },
    { id: "social_connection", name: "社会との接点を持ちたい" },
  ],
  contribute: [
    { id: "children_youth", name: "子供・若者" },
    { id: "elderly", name: "高齢者" },
    { id: "local_residents", name: "地域住民" },
    { id: "customers_general", name: "顧客全般" },
    { id: "society_general", name: "社会全般" },
    { id: "people_with_disabilities", name: "社会的弱者" },
  ],
  personalValues: [
    { id: "stability_order", name: "安定・秩序を大切にしたい" },
    { id: "learning_growth", name: "学びや成長を求めたい" },
    { id: "creative_freedom", name: "自由な発想・創造性を活かしたい" },
    { id: "teamwork_cooperation", name: "助け合いやチームワークを重視" },
    { id: "etiquette_gratitude", name: "礼儀・感謝を大切にしたい" },
    { id: "value_own_opinion", name: "自分の意見を大切にしたい" },
    { id: "community_connection", name: "地域や人との繋がりを大切にしたい" },
  ],
};

const categoryTitles: Record<string, string> = {
  atmosphere: "職場の雰囲気",
  ageGroup: "年齢層",
  workStyle: "仕事のスタイル",
  workPurpose: "働く目的",
  idealRole: "理想の役割",
  contribute: "貢献したい相手",
  personalValues: "大事にする価値観",
};

export default function WorkEnvironmentSelection() {
  const router = useRouter();
  const [, setUserId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = searchParams.get("userId");
    setUserId(userIdFromUrl);
  }, []);

  const handleSelect = (category: string, optionName: string) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category] === optionName ? "" : optionName,
    }));
  };

  const handleReset = () => {
    setSelections({});
    setSuccessMessage("");
  };

  const handleRegister = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setError("ログイン情報が見つかりません");

    setLoading(true);
    setError("");

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/matching`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          atmosphere: selections.atmosphere || "",
          age_group: selections.ageGroup || "",
          work_style: selections.workStyle || "",
          work_purpose: selections.workPurpose || "",
          ideal_role: selections.idealRole || "",
          contribute: selections.contribute || "",
          personal_values: selections.personalValues || "",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "登録に失敗しました");
      }

      setSuccessMessage("登録が完了しました！");
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setError("トークンが見つかりません");

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${API_BASE_URL}/api/user/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "検索に失敗しました");
      }

      const matchedJob = await res.json();
      localStorage.setItem("matchedJob", JSON.stringify(matchedJob));
      router.push("/home");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "検索中にエラーが発生しました"
      );
    }
  };

  const getColSpan = (text: string) => (text.length <= 8 ? "" : "col-span-2");

  const hasSelections = Object.values(selections).some((val) => val);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-4 pt-6 pb-48 text-black">
        {/* 戻るボタン */}
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-xl font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            求める環境・価値観
          </button>
        </div>
        {/* 検索バー */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-black border border-gray-500 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="環境条件を検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-black"
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
        {/* エラーメッセージ */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {/* 成功メッセージ */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        {/* カテゴリごとの選択肢 */}
        <div className="mb-20 space-y-6">
          {/* 各カテゴリを順に表示 */}
          {Object.entries(environmentOptions).map(([category, options]) => {
            const filtered = searchTerm
              ? options.filter((o) =>
                  o.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
              : options;
            if (filtered.length === 0) return null;

            return (
              <div key={category} className="space-y-2">
                {/* カテゴリタイトル */}
                <h3 className="font-bold text-black">
                  {categoryTitles[category]}
                </h3>
                {/* オプションの表示（2列グリッド） */}
                <div className="grid grid-cols-2 gap-3">
                  {filtered.map((option) => {
                    const isSelected = selections[category] === option.name;
                    const colSpan = getColSpan(option.name);
                    return (
                      <div
                        key={option.id}
                        className={`flex items-center border rounded-md p-3 h-14 cursor-pointer ${
                          isSelected ? "bg-blue-50" : "bg-gray-50"
                        } ${colSpan}`}
                        onClick={() => handleSelect(category, option.name)}
                      >
                        <div className="w-5 h-5 mr-2 border border-gray-300 flex items-center justify-center bg-white">
                          {isSelected && (
                            <svg
                              className="h-4 w-4 text-blue-500"
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
                        <span className="text-sm truncate max-w-full">
                          {option.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ボタンエリア - 画面下部に固定 */}
        <div className="fixed bottom-16 left-0 right-0 px-4 py-3 space-y-4 bg-white border-t">
          {/* 上段：リセットと登録するボタン */}
          <div className="flex justify-between">
            <button
              onClick={handleReset}
              className="w-40 py-3 border border-gray-600 rounded-full text-primary-navy bg-white hover:bg-gray-100 transition-colors"
            >
              リセット
            </button>
            <button
              onClick={handleRegister}
              disabled={loading}
              className={`w-40 py-3 rounded-full text-white transition-colors ${
                hasSelections
                  ? "bg-primary-navy hover:bg-blue-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "保存中..." : "登録する"}
            </button>
          </div>
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className={`w-full py-3 rounded-full text-white font-medium transition-colors ${
              hasSelections
                ? "bg-red-700 hover:bg-red-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {searchLoading ? "検索中..." : "登録した内容で検索する"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
