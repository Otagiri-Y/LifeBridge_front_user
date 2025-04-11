// pages/index.tsx または app/page.tsx
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import MessageScreen from "@/components/MessageScreen";

export default function Home() {
  // 必要に応じて状態管理やAPIコールをここに追加
  // 例: const [messages, setMessages] = useState([]);

  // 最新の更新日時（実際の実装ではAPIから取得するか、サーバーサイドで生成）
  const lastUpdated = "2025/4/24 17:00 更新";

  // 検索履歴（実際の実装では状態管理やローカルストレージから取得）
  const searchHistory: string[] = [];

  // メッセージがあるかどうか（実際の実装ではAPIから取得）
  const hasMessages = false;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* 検索バーコンポーネント */}
        <SearchBar lastUpdated={lastUpdated} searchHistory={searchHistory} />

        {/* メッセージ画面コンポーネント */}
        <MessageScreen hasMessages={hasMessages} />
      </main>

      <Footer />
    </div>
  );
}
