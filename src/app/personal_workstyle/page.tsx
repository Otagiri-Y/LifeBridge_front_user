"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 環境条件のカテゴリとオプション
const environmentOptions = {
  // 職場の雰囲気
  workplaceAtmosphere: [
    { id: "bright", name: "明るい" },
    { id: "at_home", name: "アットホーム" },
    { id: "calm", name: "落ち着いている" },
  ],
  // 年齢層
  ageGroup: [
    { id: "young_centered", name: "若手が中心" },
    { id: "wide_age_range", name: "幅広い年代中心" },
  ],
  // 仕事のスタイル
  workStyle: [
    { id: "teamwork_oriented", name: "チームワーク重視" },
    { id: "individual_work_oriented", name: "個人ワーク重視" },
  ],
  // 働く目的
  workingPurpose: [
    { id: "social_contribution", name: "社会貢献" },
    { id: "income_securing", name: "収入確保" },
    { id: "pastime", name: "暇つぶし" },
    { id: "lifetime_active", name: "生涯現役" },
    { id: "want_to_interact", name: "人と関わりたい" },
  ],
  // 理想の役割
  idealRole: [
    { id: "support_quietly", name: "裏方で静かに支えたい" },
    { id: "advice_with_experience", name: "経験を活かしてアドバイスしたい" },
    { id: "regional_involvement", name: "地域と関わる活動がしたい" },
    { id: "support_someone", name: "誰かをサポートしたい" },
    { id: "utilize_ideas", name: "自分の考えや提案を活かしたい" },
    { id: "social_connection", name: "社会との接点を持ちたい" },
  ],
  // 貢献したい相手
  contributionTarget: [
    { id: "children_youth", name: "子供・若者" },
    { id: "elderly", name: "高齢者" },
    { id: "local_residents", name: "地域住民" },
    { id: "customers_general", name: "顧客全般" },
    { id: "society_general", name: "社会全般" },
    { id: "people_with_disabilities", name: "社会的弱者" },
  ],
  // こだわる価値観
  valueOrientation: [
    { id: "stability_order", name: "安定・秩序を大切にしたい" },
    { id: "learning_growth", name: "学びや成長を求めたい" },
    { id: "creative_freedom", name: "自由な発想・創造性を活かしたい" },
    { id: "teamwork_cooperation", name: "助け合いやチームワークを重視" },
    { id: "etiquette_gratitude", name: "礼儀・感謝を大切にしたい!" },
    { id: "value_own_opinion", name: "自分の意見を大切にしたい" },
    { id: "community_connection", name: "地域や人との繋がりを大切にしたい" },
  ],
};

// カテゴリのタイトル
const categoryTitles = {
  workplaceAtmosphere: "職場の雰囲気",
  ageGroup: "年齢層",
  workStyle: "仕事のスタイル",
  workingPurpose: "働く目的",
  idealRole: "理想の役割",
  contributionTarget: "貢献したい相手",
  valueOrientation: "こだわる価値観",
};

export default function WorkEnvironmentSelection() {
  const router = useRouter();
  
  // カテゴリごとに選択された項目を管理
  const [selections, setSelections] = useState<Record<string, string[]>>({
    workplaceAtmosphere: [],
    ageGroup: [],
    workStyle: [],
    workingPurpose: [],
    idealRole: [],
    contributionTarget: [],
    valueOrientation: [],
  });

  const [searchTerm, setSearchTerm] = useState("");

  // チェックボックス選択時の処理
  const handleSelect = (category: string, optionId: string) => {
    setSelections((prev) => {
      // 現在のカテゴリの選択状態を取得
      const currentSelections = [...prev[category]];
      
      // すでに選択されていれば解除、なければ追加
      if (currentSelections.includes(optionId)) {
        return {
          ...prev,
          [category]: currentSelections.filter(id => id !== optionId)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentSelections, optionId]
        };
      }
    });
  };

  // リセットボタンの処理
  const handleReset = () => {
    setSelections({
      workplaceAtmosphere: [],
      ageGroup: [],
      workStyle: [],
      workingPurpose: [],
      idealRole: [],
      contributionTarget: [],
      valueOrientation: [],
    });
  };

  // 次へボタンの処理
  const handleNext = () => {
    // 少なくとも1つのオプションが選択されているか確認
    const hasSelections = Object.values(selections).some(
      categorySelections => categorySelections.length > 0
    );

    if (hasSelections) {
      // 選択データをセッションストレージに保存
      sessionStorage.setItem("environmentSelections", JSON.stringify(selections));
      
      // 選択された項目の名前も保存
      const selectedNames: Record<string, string[]> = {};
      
      Object.entries(selections).forEach(([category, ids]) => {
        selectedNames[category] = ids.map(id => {
          const option = environmentOptions[category as keyof typeof environmentOptions].find(
            opt => opt.id === id
          );
          return option ? option.name : "";
        }).filter(Boolean);
      });
      
      sessionStorage.setItem("environmentSelectionNames", JSON.stringify(selectedNames));
      
      // 次のページへ遷移
      router.push("/home");
    }
  };

  // 選択されているオプションの総数を計算
  const totalSelectionsCount = Object.values(selections).reduce(
    (total, categorySelections) => total + categorySelections.length, 0
  );

  // テキストの長さに基づいて列数を決定する関数
  const getColSpan = (text: string) => {
    if (text.length <= 8) return "";  // 短いテキスト: 2列グリッド内で1つ分のスペース
    return "col-span-2";              // 長いテキスト: 2列グリッド内で2つ分のスペース
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-4 pt-6 pb-20">
        {/* 戻るボタン */}
        <div className="mb-4">
          <button
            onClick={() => router.push("/personal_job_detail")}
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
            求める環境条件
          </button>
        </div>

        {/* 検索バー */}
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

        {/* パンくずリスト */}
        <div className="flex items-center text-sm mb-4 overflow-x-auto whitespace-nowrap">
          <button className="text-gray-500">全て</button>
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
          <button className="text-gray-500">営業</button>
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
          <button className="text-blue-600 font-medium">
            機械/電気電子製品営業
          </button>
        </div>

        {/* カテゴリごとの選択肢 */}
        <div className="mb-20 space-y-6">
          {/* 各カテゴリを順に表示 */}
          {Object.entries(environmentOptions).map(([category, options]) => (
            <div key={category} className="space-y-2">
              {/* カテゴリタイトル */}
              <h3 className="font-medium text-gray-800">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h3>
              
              {/* オプションの表示（2列グリッド） */}
              <div className="grid grid-cols-2 gap-3">
                {options.map((option) => {
                  const colSpan = getColSpan(option.name);
                  return (
                    <div
                      key={option.id}
                      className={`flex items-center border rounded-md p-3 h-14 ${
                        selections[category].includes(option.id) ? "bg-blue-50" : "bg-gray-50"
                      } ${colSpan}`}
                      onClick={() => handleSelect(category, option.id)}
                    >
                      <div className="w-5 h-5 min-w-[1.25rem] mr-2 border border-gray-300 flex items-center justify-center bg-white">
                        {selections[category].includes(option.id) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
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
          ))}
        </div>

        {/* 固定ボタンエリア */}
        <div className="fixed bottom-16 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white border-t">
          <button
            onClick={handleReset}
            className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 active:bg-gray-200 transition-colors"
          >
            リセット
          </button>
          <button
            onClick={handleNext}
            disabled={totalSelectionsCount === 0}
            className={`px-8 py-3 rounded-full text-white transition-colors ${
              totalSelectionsCount > 0
                ? "bg-blue-700 active:bg-blue-800"
                : "bg-gray-400"
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