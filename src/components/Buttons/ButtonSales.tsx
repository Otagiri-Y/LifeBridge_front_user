"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant,
  disabled = false,
  className = "",
}) => {
  const baseStyles = "px-8 py-3 rounded-full transition-colors focus:outline-none";
  
  const variantStyles = {
    primary: `text-white ${
      disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
    }`,
    secondary: `border border-gray-300 text-gray-700 ${
      disabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-100 active:bg-gray-200"
    }`,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
};

export default Button;