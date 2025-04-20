import React from "react";

type BadgeType = {
  text: string;
  color: string;
};

type MemberRegisterProps = {
  text: string;
  badge?: BadgeType;
  onClick?: () => void;
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
        return "bg-accent-red";
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
      className="bg-primary-navy hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg w-full relative text-lg"
      onClick={onClick}
    >
      {text}
      {badge && (
        <span
          className={`absolute top-0 right-0 ${getBadgeColor(
            badge.color
          )} text-white text-xs px-2 py-1 rounded-sm transform translate-x-1 -translate-y-1`}
        >
          {badge.text}
        </span>
      )}
    </button>
  );
};

export default MemberRegister;