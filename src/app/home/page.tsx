"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

// APIのベースURLを環境変数または定数として定義義
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// 仕事概要に表示する可能性のあるタグのリスト
const JOB_SUMMARY_TAGS = [
  "業界未経験歓迎",
  "完全週休2日制",
  "年間休日120日以上",
  "学歴不問",
  "副業・WワークOK",
  "社会保険完備",
  "車・バイク通勤可",
  "インセンティブあり",
];

// JobCardに表示するデータの型定義
interface JobData {
  job_id: number;
  company_id: number;
  company_name: string;
  job_title: string;
  company_job_type: string;
  job_description: string;
  work_location: string;
  work_hours: string;
  salary: number;
  number_of_openings: number;
  skill_1?: string;
  skill_2?: string;
  skill_3?: string;
  tag_1?: string;
  tag_2?: string;
  tag_3?: string;
  employment_purpose?: string;
  expected_role?: string;
}

// 配列からランダムに指定した数の要素を選択する関数
const getRandomItems = (array: string[], count: number): string[] => {
  // 配列をコピーして元の配列を変更しないようにする
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  // 指定された数だけ要素を取り出す（配列の長さを超えないように）
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// JobCardコンポーネント - 各求人情報を表示
const JobCard: React.FC<{ job: JobData }> = ({ job }) => {
  // 各ジョブカードが表示されるとき、ランダムなタグを生成
  const [summaryTags, setSummaryTags] = useState<string[]>([]);

  useEffect(() => {
    // ランダムに3〜5個のタグを選択
    const tagCount = Math.floor(Math.random() * 3) + 3; // 3, 4, 5のいずれか
    setSummaryTags(getRandomItems(JOB_SUMMARY_TAGS, tagCount));
  }, [job.job_id]); // job_idが変わったときだけ再計算（実質マウント時のみ）

  // 給与の表示形式を設定する関数 - 単位換算を修正
  const formatSalary = (salary?: number) => {
    if (!salary || salary <= 0) {
      return "応相談";
    }
    // 単位変換を行わない - データベースの値をそのまま使用
    return `月給 ${salary}万円以上`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
      <h3 className="text-lg font-semibold mb-1">{job.job_title}</h3>
      <p className="text-sm text-gray-600 mb-2">{job.company_name}</p>

      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="text-sm">{job.work_location}</span>
      </div>

      <div className="flex items-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm">{formatSalary(job.salary)}</span>
      </div>

      <div className="mb-3">
        <p className="text-sm font-medium mb-1">
          この仕事に活かせる経験・スキル
        </p>
        <div className="flex flex-wrap gap-1">
          {job.skill_1 && (
            <span className="bg-gray-200 text-xs px-2 py-1 rounded">
              {job.skill_1}
            </span>
          )}
          {job.skill_2 && (
            <span className="bg-gray-200 text-xs px-2 py-1 rounded">
              {job.skill_2}
            </span>
          )}
          {job.skill_3 && (
            <span className="bg-gray-200 text-xs px-2 py-1 rounded">
              {job.skill_3}
            </span>
          )}
          {!job.skill_1 && !job.skill_2 && !job.skill_3 && (
            <span className="text-xs text-gray-500">指定なし</span>
          )}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm font-medium mb-1">仕事概要</p>
        <div className="flex flex-wrap gap-1">
          {summaryTags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium mb-1">仕事内容</p>
        <p className="text-sm">{job.job_description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/personal_job_detail/`}
          className="w-full bg-primary-navy text-white text-center py-3 rounded font-medium"
        >
          オファーする
        </Link>
        <Link
          href={`/personal_occupation`}
          className="w-full border border-gray-300 text-center py-3 rounded font-medium"
        >
          条件を変更する
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 最新の更新日時
  const lastUpdated = "2025/4/24 17:00 更新";

  // 検索履歴
  const searchHistory: string[] = [];

  useEffect(() => {
    // ローカルストレージをクリア（必要に応じて）
    // localStorage.removeItem('matchedJob');

    const fetchJobs = async () => {
      try {
        setLoading(true);

        // ローカルストレージから保存されたデータを取得
        const savedJobs = localStorage.getItem("matchedJob");

        if (savedJobs) {
          // 保存されているデータがあればそれを使用
          const parsedJobs = JSON.parse(savedJobs);
          console.log("Saved Jobs Data:", parsedJobs);
          setJobs(parsedJobs);
          setError("");
          return;
        }

        // 保存データがなければAPIを呼び出す（認証付き）
        const token = localStorage.getItem("token");
        if (!token) {
          setError("認証情報がありません。再度ログインしてください。");
          setJobs([]);
          return;
        }

        // FastAPIサーバーのURLを指定（認証トークン付き）
        const response = await fetch(`${API_BASE_URL}/api/search`, {
          method: "POST", // メソッドを明示的にPOSTに指定
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // 空のJSONオブジェクトを送信
        });

        // レスポンスのステータスコードをチェック
        if (!response.ok) {
          if (response.status === 404) {
            setJobs([]);
            setError("検索条件に一致する求人が見つかりませんでした。");
          } else if (response.status === 401) {
            setError("認証期限が切れています。再度ログインしてください。");
          } else {
            throw new Error(`API error: ${response.status}`);
          }
          return;
        }

        // Content-Typeをチェック
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("APIからの応答が不正です");
        }

        const data = await response.json();
        console.log("API Response Data:", data);
        setJobs(data);
        // 取得したデータをローカルストレージに保存
        localStorage.setItem("matchedJob", JSON.stringify(data));
        setError("");
      } catch (err) {
        console.error("求人データの取得に失敗しました:", err);
        setError(
          "データの読み込み中にエラーが発生しました。しばらくしてから再度お試しください。"
        );
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // サンプルデータ（API接続ができない場合のフォールバック）
  const sampleJobs: JobData[] = [
    {
      job_id: 1,
      company_id: 101,
      company_name: "株式会社税関コンサルタンツ",
      job_title: "官公庁が中心顧客の建設コンサルルート営業",
      company_job_type: "営業",
      job_description:
        "建設コンサル営業 官公庁案件中心で社会に自分の仕事が残る喜びを味わえる！【具体的には】建設コンサルタント営業。公共インフラの整備を行政にはたらきかける営業です。",
      work_location: "山梨県甲府市中央",
      work_hours: "9:00-18:00",
      salary: 45,
      number_of_openings: 2,
      skill_1: "最終顧客：関連企業",
      skill_2: "営業先：一般社員",
      skill_3: "提案力",
    },
    {
      job_id: 2,
      company_id: 102,
      company_name: "株式会社税関コンサルタンツ",
      job_title: "官公庁が中心顧客の建設コンサルルート営業",
      company_job_type: "営業",
      job_description:
        "建設コンサル営業 官公庁案件中心で社会に自分の仕事が残る喜びを味わえる！【具体的には】建設コンサルタント営業。公共インフラの整備を行政にはたらきかける営業です。",
      work_location: "山梨県甲府市中央",
      work_hours: "9:00-18:00",
      salary: 35,
      number_of_openings: 1,
      skill_1: "最終顧客：関連企業",
      skill_2: "営業先：一般社員",
    },
    {
      job_id: 3,
      company_id: 103,
      company_name: "株式会社税関コンサルタンツ",
      job_title: "官公庁が中心顧客の建設コンサルルート営業",
      company_job_type: "営業",
      job_description:
        "建設コンサル営業 官公庁案件中心で社会に自分の仕事が残る喜びを味わえる！【具体的には】建設コンサルタント営業。公共インフラの整備を行政にはたらきかける営業です。",
      work_location: "山梨県甲府市中央",
      work_hours: "9:00-18:00",
      salary: 30,
      number_of_openings: 3,
      skill_1: "最終顧客：関連企業",
      skill_2: "営業先：一般社員",
      skill_3: "コミュニケーション力",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow px-4">
        {/* 検索バーコンポーネント */}
        <SearchBar lastUpdated={lastUpdated} searchHistory={searchHistory} />

        {/* 見出し */}
        {!loading && !error && jobs.length > 0 && (
          <div className="my-4 text-center">
            <h2 className="text-lg font-semibold">
              Life Bridgeがあなたと企業をマッチング
            </h2>
            <h3 className="text-xl font-bold">あなたの志向に合った求人</h3>
          </div>
        )}
        {/* ローディング表示 */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
          </div>
        )}

        {/* エラー表示 */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded my-4">
            <p>{error}</p>
          </div>
        )}

        {/* 検索結果がない場合 */}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">前回の検索条件</p>
            <p className="text-gray-800 font-semibold">結果は見つかりません</p>
          </div>
        )}

        {/* 求人カード一覧 */}
        {!loading && !error && jobs.length > 0 ? (
          <div className="my-4 space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        ) : (
          // バックアップとしてサンプルデータを表示（デモのみ・開発時）
          process.env.NODE_ENV === "development" &&
          !loading &&
          error && (
            <div className="my-4 space-y-4">
              <p className="text-sm text-amber-600 mb-2">
                ※開発モード: サンプルデータを表示中
              </p>
              {sampleJobs.map((job) => (
                <JobCard key={job.job_id} job={job} />
              ))}
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
