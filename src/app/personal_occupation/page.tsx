"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 職種のリストデータ
const jobCategories = [
  {
    id: "sales",
    name: "営業",
    detail: "建設/土木/プラント営業・不動産営業・IT・・・",
  },
  {
    id: "marketing",
    name: "企画/マーケティング/カスタマーサクセス/・・・",
    detail: "企画・宣伝販売・マーケティング・コンサルタント",
  },
  {
    id: "corporate",
    name: "コーポレートスタッフ",
    detail: "経理・人事・総務・法務・情報システム・広報・・・",
  },
  {
    id: "scm",
    name: "SCM/生産管理/購買/物流",
    detail: "生産管理・購買・物流・貿易事務",
  },
  {
    id: "admin",
    name: "事務/受付/秘書/翻訳",
    detail: "一般事務・営業事務・受付・翻訳",
  },
  {
    id: "retail",
    name: "小売販売/流通",
    detail: "販売スタッフ・店舗・仕入/流通・店舗開発・・・",
  },
  {
    id: "service",
    name: "サービス/接客",
    detail: "客室・フロア・アミューズメント・イベント・旅行・・・",
  },
  {
    id: "education",
    name: "教育",
    detail: "ホールスタッフ・調理スタッフ・店長・支配人・・・",
  },
  {
    id: "consulting",
    name: "コンサル/士業/リサーチャー",
    detail: "コンサルタント・士業・調査/分析・会計士・・・",
  },
  {
    id: "it",
    name: "IT",
    detail: "エンジニア・プロジェクトリーダー・プロジェクト・・・",
  },
  {
    id: "creative",
    name: "クリエイティブ/デザイン職",
    detail: "WEBデザイン・動画/グラフィック/ゲーム・・・",
  },
  // 他の職種も同様に定義
];

export default function PersonalOccupation() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedJobName, setSelectedJobName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // URLからuserIdを取得
    const searchParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = searchParams.get("userId");
    setUserId(userIdFromUrl);
  }, []);

  // 検索用にフィルタリングされた職種リスト
  const filteredJobs = searchTerm
    ? jobCategories.filter(
        (job) =>
          job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.detail &&
            job.detail.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : jobCategories;

  const handleJobSelect = (jobId: string, jobName: string) => {
    setSelectedJobType(jobId);
    setSelectedJobName(jobName);
    // ここでセッションストレージに職種情報を保存
    sessionStorage.setItem("jobTypeId", jobId);
    sessionStorage.setItem("jobTypeName", jobName);
  };

  const handleNext = async () => {
    if (!userId) {
      setError("ユーザーIDが見つかりません。登録をやり直してください。");
      return;
    }

    if (!selectedJobType) {
      setError("職種を選択してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // APIを呼び出して職種情報をデータベースに保存
      const response = await fetch("/api/user/update-job-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          jobType: selectedJobName // 職種名（「営業」など）をデータベースに保存
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "職種情報の保存に失敗しました");
      }

      // 次のステップに進む
      // 選択した職種に応じて適切な詳細ページに遷移
      switch (selectedJobType) {
        case "sales":
          // 営業を選択した場合は営業の詳細ページへ
          router.push(`/personal_sales?userId=${userId}`);
          break;
        case "marketing":
          // マーケティングを選択した場合はマーケティングの詳細ページへ
          router.push(`/personal_plan?userId=${userId}`);
          break;
        case "corporate":
          // コーポレートスタッフを選択した場合
          router.push(`/personal_job_detail?userId=${userId}&category=corporate`);
          break;
        case "scm":
          // SCM/生産管理/購買/物流を選択した場合
          router.push(`/personal_job_detail?userId=${userId}&category=scm`);
          break;
        case "admin":
          // 事務/受付/秘書/翻訳を選択した場合
          router.push(`/personal_job_detail?userId=${userId}&category=admin`);
          break;
        default:
          // その他の場合は汎用ジョブ詳細ページへ
          router.push(`/personal_job_detail?userId=${userId}`);
          break;
      }
    } catch (err) {
      console.error("Error saving job type:", err);
      setError(err instanceof Error ? err.message : "エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-4 pt-4 pb-24">
        <div className="mb-4">
          <button
            onClick={() => router.back()}
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
            直近の経歴の職種
          </button>
        </div>

        {/* 検索バー */}
        <div className="relative mb-4">
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
          <input
            type="search"
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="職種を検索する"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* 職種リスト */}
        <div className="space-y-1 mb-8">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`border-b border-gray-200 py-3 px-2 flex justify-between items-center cursor-pointer ${
                selectedJobType === job.id ? "bg-blue-50" : ""
              }`}
              onClick={() => handleJobSelect(job.id, job.name)}
            >
              <div>
                <div className="font-medium">{job.name}</div>
                {job.detail && (
                  <div className="text-xs text-gray-500">{job.detail}</div>
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* ボタンエリア */}
        <div className="fixed bottom-16 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white border-t">
          <button
            onClick={() => {
              setSelectedJobType("");
              setSelectedJobName("");
              sessionStorage.removeItem("jobTypeId");
              sessionStorage.removeItem("jobTypeName");
            }}
            className="px-8 py-3 border border-gray-300 rounded-full text-gray-700"
          >
            リセット
          </button>
          <button
            onClick={handleNext}
            disabled={loading || !selectedJobType}
            className={`px-8 py-3 rounded-full text-white ${
              selectedJobType ? "bg-blue-700" : "bg-gray-400"
            }`}
          >
            {loading ? "処理中..." : "次へ進む"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}