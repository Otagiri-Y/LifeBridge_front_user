"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FilterModal from "./FilterModal";

type FilterOption = {
  label: string;
  value: string | null;
};

type Option = {
  id: string;
  label: string;
  value: string;
};

type SearchFilterProps = {
  onSearch: () => void;
  onReset: () => void;
};

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onReset }) => {
  // 各フィルターのモーダル表示状態
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showJobTypeModal, setShowJobTypeModal] = useState(false);
  const [showWorkStyleModal, setShowWorkStyleModal] = useState(false);

  // 各フィルターの初期状態
  const [locationFilter, setLocationFilter] = useState<FilterOption>({
    label: "指定なし",
    value: null,
  });

  const [jobTypeFilter, setJobTypeFilter] = useState<FilterOption>({
    label: "指定なし",
    value: null,
  });

  const [workStyleFilter, setWorkStyleFilter] = useState<FilterOption>({
    label: "指定なし",
    value: null,
  });

  // サンプルのオプションリスト
  const locationOptions: Option[] = [
    { id: "kofu", label: "甲府市", value: "kofu" },
    { id: "fujiyoshida", label: "富士吉田市", value: "fujiyoshida" },
    { id: "minami_alps", label: "南アルプス市", value: "minami_alps" },
    { id: "fuefuki", label: "笛吹市", value: "fuefuki" },
    { id: "chuo", label: "中央市", value: "chuo" },
  ];

  const jobTypeOptions: Option[] = [
    { id: "sales", label: "営業", value: "sales" },
    { id: "plan", label: "企画", value: "plan" },
    { id: "marketing", label: "マーケティング", value: "marketing" },
    { id: "finance", label: "金融", value: "finance" },
    { id: "corporate", label: "事務", value: "corporate" },
  ];

  const workStyleOptions: Option[] = [
    { id: "fulltime", label: "正社員", value: "fulltime" },
    { id: "contract", label: "契約社員", value: "contract" },
    { id: "outsourcing", label: "業務委託", value: "outsourcing" },
    { id: "parttime", label: "パート・アルバイト", value: "parttime" },
    { id: "freelance", label: "フリーランス", value: "freelance" },
  ];

  // フィルター選択時の処理
  const handleLocationSelect = (option: Option) => {
    setLocationFilter({
      label: option.label,
      value: option.value || null,
    });
    setShowLocationModal(false);
  };

  const handleJobTypeSelect = (option: Option) => {
    setJobTypeFilter({
      label: option.label,
      value: option.value || null,
    });
    setShowJobTypeModal(false);
  };

  const handleWorkStyleSelect = (option: Option) => {
    setWorkStyleFilter({
      label: option.label,
      value: option.value || null,
    });
    setShowWorkStyleModal(false);
  };

  // リセットボタンの処理
  const handleReset = () => {
    setLocationFilter({ label: "指定なし", value: null });
    setJobTypeFilter({ label: "指定なし", value: null });
    setWorkStyleFilter({ label: "指定なし", value: null });
    onReset();
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* 勤務地フィルター */}
      <div className="border border-gray-500 rounded-lg">
        <button
          className="w-full py-4 px-4 flex items-center justify-between text-black"
          onClick={() => setShowLocationModal(true)}
        >
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-black text-sm font-bold">勤務地</div>
              <div>{locationFilter.label}</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      </div>

      {/* 職種フィルター */}
      <div className="border border-gray-500 rounded-lg">
        <button
          className="w-full py-4 px-4 flex items-center justify-between text-black"
          onClick={() => setShowJobTypeModal(true)}
        >
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-black text-sm font-bold">職種</div>
              <div>{jobTypeFilter.label}</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      </div>

      {/* 働き方フィルター */}
      <div className="border border-gray-500 rounded-lg">
        <button
          className="w-full py-4 px-4 flex items-center justify-between text-black"
          onClick={() => setShowWorkStyleModal(true)}
        >
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M9 11L12 14L22 4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-black text-sm font-bold">働き方</div>
              <div>{workStyleFilter.label}</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      </div>

      {/* 検索ボタン - buttonからLinkに変更 */}
      <Link
        href="/personal_job_detail"
        className="bg-primary-navy hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg w-full mt-8 block text-center"
        onClick={() => {
          // 元の検索処理も実行
          onSearch();
        }}
      >
        検索
      </Link>

      {/* リセットボタン */}
      <button
        className="border border-gray-500 hover:bg-gray-100 text-blue-900 font-bold py-3 px-4 rounded-lg w-full"
        onClick={handleReset}
      >
        リセット
      </button>

      {/* モーダルコンポーネント */}
      <FilterModal
        title="勤務地 "
        options={locationOptions}
        selectedValue={locationFilter.value}
        onSelect={handleLocationSelect}
        onClose={() => setShowLocationModal(false)}
        isOpen={showLocationModal}
      />

      <FilterModal
        title="職種"
        options={jobTypeOptions}
        selectedValue={jobTypeFilter.value}
        onSelect={handleJobTypeSelect}
        onClose={() => setShowJobTypeModal(false)}
        isOpen={showJobTypeModal}
      />

      <FilterModal
        title="働き方"
        options={workStyleOptions}
        selectedValue={workStyleFilter.value}
        onSelect={handleWorkStyleSelect}
        onClose={() => setShowWorkStyleModal(false)}
        isOpen={showWorkStyleModal}
      />
    </div>
  );
};

export default SearchFilter;