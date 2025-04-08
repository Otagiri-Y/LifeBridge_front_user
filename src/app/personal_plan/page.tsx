import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Tailwind CSS 動作確認
        </h1>
        <p className="text-gray-700">Tailwind CSS は正しく動作しています！</p>
      </div>
    </div>
  );
}
