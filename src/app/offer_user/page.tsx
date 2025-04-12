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

export default function OfferList() {
  // タブの状態管理
  const [activeTab, setActiveTab] = useState<"personal" | "company">("personal");
  
  // 検索情報
  const lastUpdated = "2025/4/24 17:00 更新";
  const searchHistory: string[] = [];

  // 求人データ（実際の実装ではAPIから取得）
  const jobOffers: JobOffer[] = [
    {
      id: "job1",
      title: "官公庁が中心顧客の建設コンサルタント営業",
      company: "竹内デザインコンサルタント株式会社",
      location: "山梨県甲府市",
      salary: "月給22万円以上",
      skills: ["経験者優遇", "語学力一部社員"],
      conditions: ["業務支援体制有", "完全週休2日制", "年間休日120日以上", "学歴不問"],
      description: "仕事内容：建設コンサル営業 官公庁案件8割で社会に自分の仕事が残る喜びを味わえる！【具体的には】建設コンサルタント営業は、公共インフラの整備を行ううえでかかせない営業です。"
    },
    {
      id: "job2",
      title: "既存顧客メインの営業スタッフ",
      company: "有限会社サンプルカンパニー",
      location: "山梨県南アルプス市",
      salary: "月給28万円以上",
      skills: ["経験者優遇", "営業力一部社員"],
      conditions: ["面接・リワーク可", "完全週休2日制", "年間休日120日以上", "学歴不問"],
      description: "「収入安定」「休暇充実」が叶う！自社農村営業スタッフ募集「既存顧客メイン」ルートセレゾ毎週2日休み確定！年末年始(12/29~1/3)ボーナス年2回必ず支給も充実！"
    },
    {
      id: "job3",
      title: "機械設備・工具の総合商社/新製品立ち上げ",
      company: "東工サービス株式会社",
      location: "山梨県富士吉田市",
      salary: "月給25万円以上",
      skills: ["経験者優遇", "営業力一部社員"],
      conditions: ["社会保険完備", "完全週休2日制", "年間休日110日以上", "学歴不問"],
      description: "弊社は機械設備・機械工具の総合商社です。この度、山梨県に新たな営業拠点を開設し、ささえる事業拡大を図ります。新製品の立ち上げメンバーとして、既存能力及び新規開拓の増強をお願いします。"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow">
        {/* 検索バー */}
        <SearchBar lastUpdated={lastUpdated} searchHistory={searchHistory} />

        {/* タイトルとタブ切り替え */}
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold mb-3 text-center">オファーリスト</h1>
          
          {/* タブ */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "personal" ? "text-blue-600 border-b-2 border-blue-600 font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              あなたのオファー
            </button>
            <Link
              href="/offer_company"
              className={`flex-1 py-2 text-center ${
                activeTab === "company" ? "text-blue-600 border-b-2 border-blue-600 font-medium" : "text-gray-500"
              }`}
            >
              企業のオファー
            </Link>
          </div>
        </div>

        {/* 求人リスト */}
        <div className="px-4 py-2 space-y-4">
          {jobOffers.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-4">
              {/* 求人タイトルと会社名 */}
              <h2 className="font-bold text-lg mb-1">{job.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{job.company}</p>
              
              {/* 勤務地と給与 */}
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 mr-2">
                  <Image src="/map.svg" alt="勤務地" width={16} height={16} />
                </div>
                <span className="text-sm">{job.location}</span>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 mr-2">
                  <Image src="/enn.svg" alt="給与" width={16} height={16} />
                </div>
                <span className="text-sm">{job.salary}</span>
              </div>
              
              {/* スキルと条件 */}
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">この仕事に活かせる経験・スキル</p>
                <div className="flex flex-wrap gap-1">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">仕事概要</p>
                <div className="flex flex-wrap gap-1">
                  {job.conditions.map((condition, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* 仕事内容 */}
              <p className="text-sm mb-3 line-clamp-3">{job.description}</p>
              
              {/* 詳細ボタン */}
              <Link 
                href={`/personal_job_detail/`}
                className="block w-full bg-blue-700 text-white text-center py-2 rounded-md hover:bg-blue-800 transition-colors"
              >
                求人詳細を見る
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}