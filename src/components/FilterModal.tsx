"use client";

import React from "react";
import { X } from "lucide-react";

type Option = {
  id: string;
  label: string;
  value: string;
};

type FilterModalProps = {
  title: string;
  options: Option[];
  selectedValue: string | null;
  onSelect: (option: Option) => void;
  onClose: () => void;
  isOpen: boolean;
};

const FilterModal: React.FC<FilterModalProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        {/* モーダルヘッダー */}
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}を選択</h2>
          <button onClick={onClose} className="p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* モーダル本文 - オプションリスト */}
        <div className="py-2 max-h-96 overflow-y-auto">
          <div className="divide-y">
            {/* 「指定なし」オプション */}
            <button
              className={`w-full text-left p-4 hover:bg-gray-100 flex items-center ${
                selectedValue === null ? "bg-blue-50" : ""
              }`}
              onClick={() =>
                onSelect({ id: "none", label: "指定なし", value: "" })
              }
            >
              <span className="flex-grow">指定なし</span>
              {selectedValue === null && (
                <span className="text-blue-700">✓</span>
              )}
            </button>

            {/* その他のオプション */}
            {options.map((option) => (
              <button
                key={option.id}
                className={`w-full text-left p-4 hover:bg-gray-100 flex items-center ${
                  selectedValue === option.value ? "bg-blue-50" : ""
                }`}
                onClick={() => onSelect(option)}
              >
                <span className="flex-grow">{option.label}</span>
                {selectedValue === option.value && (
                  <span className="text-blue-700">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* モーダルフッター - 閉じるボタン */}
        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-primary-navy text-white rounded-lg font-medium"
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
