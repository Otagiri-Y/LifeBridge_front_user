// src/lib/api.ts

// バックエンドのURL（ローカル or デプロイ環境）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * FastAPI の /test に接続し、接続状態を取得
 */
export async function checkConnection(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE_URL}/test`);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    return data.message || "Unknown response";
  } catch (error) {
    console.error("接続エラー:", error);
    return "接続エラー";
  }
}


