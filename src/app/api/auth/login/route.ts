import { NextRequest, NextResponse } from "next/server";

// 実際のアプリでは、データベースからのユーザー認証ロジックがここに入ります
// この例ではモックデータを使用しています
const mockUsers = [
  { email: "test@example.com", password: "password123" },
  { email: "user@example.com", password: "securepass" },
];

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

    // ユーザー認証
    // 実際のアプリではデータベースからユーザーを検索します
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "メールアドレスまたはパスワードが正しくありません" },
        { status: 401 }
      );
    }

    // 認証成功
    // 実際のアプリではセッションまたはJWTトークンを発行します
    return NextResponse.json(
      {
        message: "ログイン成功",
        user: { email: user.email },
        // token: "jwt_token_would_go_here"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}