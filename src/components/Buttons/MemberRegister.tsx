// src/components/Buttons/MemberRegister.tsx
import React from "react";

type BadgeType = {
  text: string;
  color: string;
};

type MemberRegisterProps = {
  text: string;
  badge?: BadgeType;
  onClick?: () => void; // onClickはオプションに変更
};

const MemberRegister: React.FC<MemberRegisterProps> = ({
  text,
  badge,
  onClick,
}) => {
  // バッジの背景色を設定
  const getBadgeColor = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <button
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg w-full relative"
      onClick={onClick}
    >
      {badge && (
        <span
          className={`absolute -top-2 -right-2 ${getBadgeColor(
            badge.color
          )} text-white text-xs px-2 py-1 rounded-full`}
        >
          {badge.text}
        </span>
      )}
      {text}
    </button>
  );
};

export default MemberRegister;