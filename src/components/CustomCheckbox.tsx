"use client";

import React from "react";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div
      className={`p-4 flex items-center border border-gray-300 rounded-md transition-colors ${
        checked ? "bg-blue-50" : "bg-gray-50"
      }`}
      onClick={() => onChange(id)}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onChange(id);
          e.preventDefault();
        }
      }}
    >
      <div className="w-6 h-6 mr-3 border border-gray-300 flex items-center justify-center bg-white">
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className="text-lg">{label}</span>
    </div>
  );
};

export default CustomCheckbox;