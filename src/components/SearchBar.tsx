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
    <div className="bg-secondary-blue p-4 w-full">
      {/* 最終更新日時 */}
      <div className="text-black text-sm mb-2">{lastUpdated}</div>

      {/* 検索バー */}
      <div className="relative mb-2">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-black" />
        </div>
        <input
          type="text"
          placeholder="気になる企業を探す  勤務地、職種などを選択"
          className="pl-10 pr-4 py-2 w-full rounded-full border text-black  border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy focus:border-transparent"
        />
      </div>

      {/* 検索履歴 */}
      <div className="text-sm">
        <p className="text-black">前回の検索条件</p>
        {searchHistory.length > 0 ? (
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index} className="text-primary-navy">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black">検索履歴はありません。</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
