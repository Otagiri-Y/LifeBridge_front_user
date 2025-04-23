// components/MessageScreen.tsx
import React from "react";

type MessageScreenProps = {
  hasMessages: boolean;
  messages?: Array<{
    id: string;
    content: string;
    date: string;
  }>;
};

const MessageScreen: React.FC<MessageScreenProps> = ({
  hasMessages = false,
  messages = [],
}) => {
  // メッセージがない場合の表示
  if (!hasMessages) {
    return (
      <div className="flex flex-col items-center text-center p-6">
        <h2 className="text-xl text-black font-bold mb-4">メッセージはありません</h2>
        <p className="text-black mb-8">
          応募後に企業から連絡を受け取った際、
          <br />
          メッセージの通知を受け取れます。
        </p>
        <a
          href="home"
          className="border border-gray-500 rounded-md px-8 py-3 text-black hover:bg-gray-100 transition-colors inline-block"
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

export default MessageScreen;
