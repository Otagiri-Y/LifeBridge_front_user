// components/SearchBar.tsx
import React from "react";
import { SearchIcon } from "lucide-react";

type SearchBarProps = {
  lastUpdated?: string;
  searchHistory?: string[];
};

const SearchBar: React.FC<SearchBarProps> = ({
  lastUpdated = "2025/4/24 17:00 更新",
  searchHistory = [],
}) => {
  return (
    <div className="bg-blue-100 p-4 w-full">
      {/* 最終更新日時 */}
      <div className="text-gray-500 text-sm mb-2">{lastUpdated}</div>

      {/* 検索バー */}
      <div className="relative mb-2">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="気になる企業を探す  勤務地、職種などを選択"
          className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* 検索履歴 */}
      <div className="text-sm">
        <p className="text-gray-500">前回の検索条件</p>
        {searchHistory.length > 0 ? (
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index} className="text-blue-500">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">検索履歴はありません。</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
