import { cookies } from "next/headers";
import { withDb } from "@/lib/mysql";
import { RowDataPacket } from "mysql2/promise";
import { NextResponse } from "next/server";

// セッションの型定義
interface Session extends RowDataPacket {
  token: string;
  user_id: number;
  expires_at: Date;
}

// ユーザーの型定義
interface User extends RowDataPacket {
  user_id: number;
  name: string;
  email: string;
  address?: string | null;
  birth_date?: string | null;
  last_company?: string | null;
  job_type?: string | null;
  job_type_detail?: string | null;
}

// レスポンスユーザーの型定義
interface ResponseUser {
  id: number;
  name: string;
  email: string;
  address?: string | null;
  birthDate?: string | null;
  lastCompany?: string | null;
  jobType?: string | null;
  jobTypeDetail?: string | null;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    return await withDb(async (connection) => {
      // セッションを検索
      const [sessions] = await connection.execute<Session[]>(
        "SELECT * FROM sessions WHERE token = ? AND expires_at > NOW() LIMIT 1",
        [sessionToken]
      );

      const userId = sessions[0].user_id;

      // ユーザー情報を取得
      const [users] = await connection.execute<User[]>(
        "SELECT user_id, name, email, address, birth_date, last_company, job_type, job_type_detail FROM users WHERE user_id = ? LIMIT 1",
        [userId]
      );

      // パスワードなどの機密情報を除外したユーザー情報を返す
      const user = users[0];

      const responseUser: ResponseUser = {
        id: user.user_id,
        name: user.name,
        email: user.email,
        address: user.address,
        birthDate: user.birth_date,
        lastCompany: user.last_company,
        jobType: user.job_type,
        jobTypeDetail: user.job_type_detail,
      };

      return NextResponse.json(
        {
          authenticated: true,
          user: responseUser,
        },
        { status: 200 }
      );
    });
  } catch (error: unknown) {
    console.error("Session check error:", error);
    return NextResponse.json(
      {
        authenticated: false,
        message: `セッション確認中にエラーが発生しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`,
      },
      { status: 500 }
    );
  }
}
