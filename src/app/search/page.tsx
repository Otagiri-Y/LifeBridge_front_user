"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import SearchFilter from "@/components/SearchFilter";

export default function Search() {
  const router = useRouter();

  // 最新の更新日時（実際の実装ではAPIから取得するか、サーバーサイドで生成）
  const lastUpdated = "2025/4/24 17:00 更新";

  // 検索履歴（実際の実装では状態管理やローカルストレージから取得）
  const searchHistory: string[] = [];

  // 検索ボタンがクリックされた時の処理
  const handleSearch = () => {
    console.log("検索実行");
    // personal_job_detailページに遷移
    router.push("/personal_job_detail");
  };

  // リセットボタンがクリックされた時の処理
  const handleReset = () => {
    console.log("検索条件リセット");
    // ここにリセット処理を実装
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        {/* 検索バーコンポーネント */}
        <SearchBar lastUpdated={lastUpdated} searchHistory={searchHistory} />

        {/* 検索条件フィルター */}
        <div className="p-4">
          <h1 className="text-2xl text-black font-bold mb-4 text-center">求人を探す</h1>
          <hr className="mb-4" />

          <SearchFilter onSearch={handleSearch} onReset={handleReset} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
