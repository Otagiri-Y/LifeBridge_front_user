import React from "react";
import Image from "next/image";

type UndevelopedScreenProps = {
  hasMessages: boolean;
  messages?: Array<{
    id: string;
    content: string;
    date: string;
  }>;
};

const UndevelopedScreen: React.FC<UndevelopedScreenProps> = ({
  hasMessages = false,
  messages = [],
}) => {
  // メッセージがない場合の表示
  if (!hasMessages) {
    return (
      <div className="flex flex-col items-center text-center p-6">
        <h2 className="text-xl font-bold mb-4">リソースの関係で未開発です</h2>
        <p className="text-gray-500 mb-8">
          大変申し訳ありませんが、
          <br />
          今後の実装をお待ちください。
        </p>

        {/* 画像を先に表示 */}
        <div className="mb-8">
          <Image
            src="/ozigi_suit_man_color 1.svg"
            alt="お詫びの画像"
            width={120}
            height={100}
          />
        </div>

        {/* 閉じるボタンは画像の後に表示 */}
        <a
          href="home"
          className="border border-gray-300 rounded-md px-8 py-3 text-gray-700 hover:bg-gray-100 transition-colors inline-block"
        >
          閉じる
        </a>
      </div>
    );
  }

  // メッセージがある場合の表示
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">メッセージ一覧</h2>
      {messages.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {messages.map((message) => (
            <li key={message.id} className="py-4">
              <div className="flex justify-between">
                <p className="font-medium">{message.content}</p>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">表示するメッセージがありません。</p>
      )}
    </div>
  );
};

export default UndevelopedScreen;
