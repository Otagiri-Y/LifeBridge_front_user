import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { withDb } from "@/lib/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// 型定義
interface UserRegistrationData {
  name: string;
  address?: string;
  birthdate?: string;
  email: string;
  password: string;
}

interface ExistingUser extends RowDataPacket {
  id: number;
  email: string;
}

// パスワードハッシュ化の設定
const SALT_ROUNDS = 10;

export async function POST(request: NextRequest) {
  try {
    const { name, address, birthdate, email, password }: UserRegistrationData = 
      await request.json();

    // 基本的なバリデーション
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "名前、メールアドレス、パスワードは必須です" },
        { status: 400 }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "有効なメールアドレスを入力してください" },
        { status: 400 }
      );
    }

    // パスワードの複雑さチェック
    if (password.length < 6) {
      return NextResponse.json(
        { message: "パスワードは6文字以上である必要があります" },
        { status: 400 }
      );
    }

    try {
      return await withDb(async (connection) => {
        // メールアドレスの重複チェック
        const [existingUsers] = await connection.execute<ExistingUser[]>(
          "SELECT * FROM users WHERE email = ? LIMIT 1",
          [email]
        );

        if (existingUsers.length > 0) {
          return NextResponse.json(
            { message: "このメールアドレスは既に登録されています" },
            { status: 409 }
          );
        }

        // パスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // MySQLの日付形式に変換
        const formattedBirthdate = birthdate
          ? new Date(birthdate).toISOString().split("T")[0]
          : null;

        // ユーザーの登録
        const [result] = await connection.execute<ResultSetHeader>(
          "INSERT INTO users (name, address, birth_date, email, password) VALUES (?, ?, ?, ?, ?)",
          [name, address || null, formattedBirthdate, email, hashedPassword]
        );

        // 挿入されたユーザーIDを取得
        const userId = result.insertId;

        return NextResponse.json(
          {
            message: "ユーザー登録が完了しました",
            userId: userId,
          },
          { status: 201 }
        );
      });
    } catch (dbError: unknown) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { message: `データベースエラーが発生しました: ${dbError instanceof Error ? dbError.message : '不明なエラー'}` },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: `サーバーエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}` },
      { status: 500 }
    );
  }
}