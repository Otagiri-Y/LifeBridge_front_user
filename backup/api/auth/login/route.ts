import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { withDb } from "@/lib/mysql";
import { RowDataPacket } from "mysql2/promise";

// ユーザー型定義
interface User extends RowDataPacket {
  user_id: number;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 入力検証
    if (!email || !password) {
      return NextResponse.json(
        { message: "メールアドレスとパスワードを入力してください" },
        { status: 400 }
      );
    }

    try {
      // データベースからユーザーを検索
      return await withDb(async (connection) => {
        const [users] = await connection.execute<User[]>(
          "SELECT * FROM users WHERE email = ? LIMIT 1",
          [email]
        );

        // ユーザーが見つからない場合
        if (users.length === 0) {
          return NextResponse.json(
            { message: "メールアドレスまたはパスワードが正しくありません" },
            { status: 401 }
          );
        }

        const user = users[0];

        // パスワードの検証
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return NextResponse.json(
            { message: "メールアドレスまたはパスワードが正しくありません" },
            { status: 401 }
          );
        }

        // 認証成功
        // sessionsテーブルがないためセッションの保存をスキップ
        
        return NextResponse.json(
          {
            message: "ログイン成功",
            user: { 
              id: user.user_id,
              email: user.email 
            }
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
          }` 
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        message: `サーバーエラーが発生しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }` 
      },
      { status: 500 }
    );
  }
}