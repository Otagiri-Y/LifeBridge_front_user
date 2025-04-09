import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withDb } from "@/lib/mysql";

export async function POST(request: NextRequest) {
  try {
    const { last_company } = await request.json();

    // 基本的なバリデーション
    if (!last_company) {
      return NextResponse.json(
        { message: "会社名を入力してください" },
        { status: 400 }
      );
    }

    // セッションからユーザーIDを取得（認証済みユーザーを前提とする）
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { message: "認証が必要です" },
        { status: 401 }
      );
    }

    try {
      // データベース接続とクエリ実行
      return await withDb(async (connection) => {
        // 1. セッショントークンからユーザーIDを取得
        const [sessions] = await connection.execute(
          'SELECT user_id FROM sessions WHERE token = ? AND expires_at > NOW() LIMIT 1',
          [sessionToken]
        );

        const sessionArray = sessions as any[];
        if (sessionArray.length === 0) {
          return NextResponse.json(
            { message: "セッションが無効です" },
            { status: 401 }
          );
        }

        const userId = sessionArray[0].user_id;

        // 2. ユーザーの会社名を更新
        await connection.execute(
          'UPDATE users SET last_company = ? WHERE user_id = ?',
          [last_company, userId]
        );

        return NextResponse.json(
          { message: "会社名を保存しました" },
          { status: 200 }
        );
      });
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { message: `データベースエラーが発生しました: ${dbError.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: `サーバーエラーが発生しました: ${error.message}` },
      { status: 500 }
    );
  }
}