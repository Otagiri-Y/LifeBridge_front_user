import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { withDb } from "@/lib/mysql";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

// パスワードハッシュ化の設定
const SALT_ROUNDS = 10;

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      lastCompany,
      jobType,
      jobTypeDetail,
      // 他の追加フィールドがあれば追加
    } = await request.json();

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
        const [users] = await connection.execute(
          'SELECT * FROM users WHERE user_id = ? LIMIT 1',
          [userId]
        );

        const userArray = users as any[];
        if (userArray.length === 0) {
          return NextResponse.json(
            { message: "ユーザーが見つかりません" },
            { status: 404 }
          );
        }

        // ユーザー情報を更新
        await connection.execute(
          `UPDATE users 
           SET last_company = ?, 
               job_type = ?, 
               job_type_detail = ?
           WHERE user_id = ?`,
          [
            lastCompany || null,
            jobType || null,
            jobTypeDetail || null,
            userId
          ]
        );

        // セッショントークンを生成してログイン状態にする
        const sessionToken = uuidv4();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 1週間後に有効期限

        // セッションをデータベースに保存
        await connection.execute(
          'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)',
          [sessionToken, userId, expiresAt]
        );

        // クッキーにセッショントークンを保存
        const cookieStore = cookies();
        cookieStore.set({
          name: "session_token",
          value: sessionToken,
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1週間
        });

        return NextResponse.json(
          { 
            message: "登録が完了しました",
            userId: userId,
            redirectTo: "/home" // ログイン後のリダイレクト先
          },
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