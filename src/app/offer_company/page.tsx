"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

// 求人情報の型定義
interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
  conditions: string[];
  description: string;
}

export default function OfferCompanyList() {
  // タブの状態管理
  const [activeTab, setActiveTab] = useState<"personal" | "company">("company");

  // 検索情報
  const lastUpdated = "2025/4/24 17:00 更新";
  const searchHistory: string[] = [];

  // 求人データ（実際の実装ではAPIから取得）
  const jobOffers: JobOffer[] = [
    {
      id: "job1",
      title: "金属製建材のルート営業",
      company: "株式会社ネクストブリッジ",
      location: "山梨県南アルプス市",
      salary: "月給22万円以上",
      skills: ["最終面接 民間企業", "営業先一般社員"],
      conditions: [
        "業界未経験歓迎",
        "完全週休2日制",
        "車・バイク通勤可",
        "学歴不問",
      ],
      description:
        "お客様へ商品提案から、商品の発注や仕入れ、配送まで一貫手配を行う営業をお任せします。営業経験の浅いスタッフが多く若手メンバーの育成ができる方を優遇させていただきます。",
    },
    {
      id: "job2",
      title: "法人向けオフィス家具の提案営業",
      company: "山梨インテリア株式会社",
      location: "山梨県甲府市",
      salary: "月給25万円以上",
      skills: ["経験者優遇", "ビジネスマナー"],
      conditions: [
        "社会保険完備",
        "完全週休2日制",
        "年間休日120日以上",
        "転勤なし",
      ],
      description:
        "オフィス家具の企画・提案営業スタッフを募集します。既存顧客を中心に、企業のオフィス環境改善に向けた家具導入の提案を行っていただきます。経験者歓迎ですが、未経験でも意欲のある方は積極的に採用します。",
    },
    {
      id: "job3",
      title: "ITサポート事務スタッフ",
      company: "テクノサポート株式会社",
      location: "山梨県中央市",
      salary: "月給20万円以上",
      skills: ["PC操作スキル", "コミュニケーション能力"],
      conditions: [
        "リモートワーク可",
        "時短勤務相談可",
        "年間休日125日以上",
        "未経験歓迎",
      ],
      description:
        "ITサポートにおける事務業務全般をお任せします。お客様からの問い合わせ対応、社内システム入力、各種資料作成などが主な業務です。IT知識がなくても、丁寧な研修でサポートしますので安心してご応募ください。",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow">
        {/* 検索バー */}
        <SearchBar lastUpdated={lastUpdated} searchHistory={searchHistory} />

        {/* タイトルとタブ切り替え */}
        <div className="px-4 py-3">
          <h1 className="text-xl text-black font-bold mb-3 text-center">
            オファーリスト
          </h1>

          {/* タブ */}
          <div className="flex border-b">
            <Link
              href="/offer_user"
              className={`flex-1 py-2 text-center ${
                activeTab === "personal"
                  ? "text-bg-primary-navy border-b-2 border-blue-900 font-medium"
                  : "text-black"
              }`}
            >
              あなたのオファー
            </Link>
            <button
              className="flex-1 py-2 text-center text-blue-900 border-b-4 border-blue-900 font-bold"
              onClick={() => setActiveTab("company")}
            >
              企業のオファー
            </button>
          </div>
        </div>

        {/* 求人リスト */}
        <div className="px-4 py-2 space-y-4">
          {jobOffers.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-4">
              {/* 求人タイトルと会社名 */}
              <h2 className="font-bold text-black text-lg mb-1">{job.title}</h2>
              <p className="text-black text-sm mb-2">{job.company}</p>

              {/* 勤務地と給与 */}
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 mr-2">
                  <Image src="/map.svg" alt="勤務地" width={16} height={16} />
                </div>
                <span className="text-sm text-black">{job.location}</span>
              </div>

              <div className="flex items-center mb-3">
                <div className="w-4 h-4 mr-2">
                  <Image src="/enn.svg" alt="給与" width={16} height={16} />
                </div>
                <span className="text-sm text-black">{job.salary}</span>
              </div>

              {/* スキルと条件 */}
              <div className="mb-3">
                <p className="text-sm text-black font-bold mb-1">
                  この仕事に活かせる経験・スキル
                </p>
                <div className="flex flex-wrap gap-1">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-black text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-black font-bold mb-1">仕事概要</p>
                <div className="flex flex-wrap gap-1">
                  {job.conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-black text-xs px-2 py-1 rounded"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              {/* 仕事内容 */}
              <p className="text-sm mb-3 text-black line-clamp-3">
                {job.description}
              </p>

              {/* ボタンエリア */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/personal_job_detail`}
                  className="py-2 px-4 border border-gray-500 rounded-md text-blue-900 hover:bg-gray-300 transition-colors text-center font-bold"
                >
                  応募する
                </Link>
                <Link
                  href={`/personal_job_detail/`}
                  className="bg-primary-navy text-white text-center py-2 px-4 rounded-md hover:bg-blue-800 transition-colors font-bold"
                >
                  求人詳細を見る
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
