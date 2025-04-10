"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 業界カテゴリのリスト
const industries = [
  "機械/電気電子製品営業",
  "建設/土木/プラント営業",
  "不動産営業",
  "IT/通信製品営業",
  "Webサービス/ゲーム営業",
  "自動車/輸送機器営業",
  "人材/アウトソーシング営業",
  "金融/保険営業",
  "広告/メディア/イベント営業",
  "化粧品/トイレタリー営業",
  "日用品/アパレル/インテリア営業",
  "食品/飲料/嗜好品営業",
  "化学/素材営業",
  "鉄鋼/非鉄金属/金属製品営業",
  "医療情報担当者/MR",
  "医療機器/医化学機器営業",
  "レジャー/トラベル営業",
  "その他営業",
];

export default function IndustrySelection() {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 検索フィルター適用
  const filteredIndustries = industries.filter((industry) =>
    industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 業界選択時の処理
  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
  };

  // リセットボタンの処理
  const handleReset = () => {
    setSelectedIndustry(null);
  };

  // 次へボタンの処理
  const handleNext = () => {
    if (selectedIndustry) {
      // 選択した業界をセッションストレージに保存
      sessionStorage.setItem("selectedIndustry", selectedIndustry);
      // 次のページへ遷移（ここでは仮にhomeにリダイレクト）
      router.push("/personal_sales_2");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      {/*ここにページのコード記述する*/}
      <Footer />
    </div>
  );
}
