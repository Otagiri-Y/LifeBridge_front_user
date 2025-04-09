import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/lib/mysql";
import { cookies } from "next/headers";
import crypto from "crypto";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

// リクエストボディの型定義
interface CompleteRegistrationRequest {
  userId: number;
  lastCompany?: string | null;
  jobType?: string | null;
  jobTypeDetail?: string | null;
}

// ユーザーの型定義
interface User extends RowDataPacket {
  user_id: number;
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      lastCompany,
      jobType,
      jobTypeDetail,
    }: CompleteRegistrationRequest = await request.json();

    // 基本的なバリデーション
    if (!userId) {
      return NextResponse.json(
        { message: "ユーザーIDが必要です" },
        { status: 400 }
      );
    }

    try {
      return await withDb(async (connection) => {
        // ユーザーIDの存在確認
        const [users] = await connection.execute<User[]>(
          "SELECT * FROM users WHERE user_id = ? LIMIT 1",
          [userId]
        );

        if (users.length === 0) {
          return NextResponse.json(
            { message: "ユーザーが見つかりません" },
            { status: 404 }
          );
        }

        // ユーザー情報を更新
        await connection.execute<ResultSetHeader>(
          `UPDATE users 
           SET last_company = ?, 
               job_type = ?, 
               job_type_detail = ?
           WHERE user_id = ?`,
          [lastCompany || null, jobType || null, jobTypeDetail || null, userId]
        );

        // セッショントークンを生成してログイン状態にする
        const sessionToken = crypto.randomUUID();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 1週間後に有効期限

        // セッションをデータベースに保存
        await connection.execute<ResultSetHeader>(
          "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)",
          [sessionToken, userId, expiresAt]
        );

        // クッキーにセッショントークンを保存
        cookies().set({
          name: "session_token",
          value: sessionToken,
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict", // オプションで追加できます
        });
        return NextResponse.json(
          {
            message: "登録が完了しました",
            userId: userId,
            redirectTo: "/home", // ログイン後のリダイレクト先
          },
          { status: 200 }
        );
      });
    } catch (dbError: unknown) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        {
          message: `データベースエラーが発生しました: ${
            dbError instanceof Error ? dbError.message : "不明なエラー"
          }`,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        message: `サーバーエラーが発生しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`,
      },
      { status: 500 }
    );
  }
}
