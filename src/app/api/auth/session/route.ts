import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withDb } from "@/lib/mysql";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return await withDb(async (connection) => {
      // セッションを検索
      const [sessions] = await connection.execute(
        'SELECT * FROM sessions WHERE token = ? AND expires_at > NOW() LIMIT 1',
        [sessionToken]
      );

      const sessionArray = sessions as any[];
      if (sessionArray.length === 0) {
        return NextResponse.json(
          { authenticated: false },
          { status: 401 }
        );
      }

      const userId = sessionArray[0].user_id;

      // ユーザー情報を取得
      const [users] = await connection.execute(
        'SELECT user_id, name, email, address, birth_date, last_company, job_type, job_type_detail FROM users WHERE user_id = ? LIMIT 1',
        [userId]
      );

      const userArray = users as any[];
      if (userArray.length === 0) {
        return NextResponse.json(
          { authenticated: false },
          { status: 401 }
        );
      }

      // パスワードなどの機密情報を除外したユーザー情報を返す
      const user = userArray[0];

      return NextResponse.json(
        {
          authenticated: true,
          user: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            address: user.address,
            birthDate: user.birth_date,
            lastCompany: user.last_company,
            jobType: user.job_type,
            jobTypeDetail: user.job_type_detail
          }
        },
        { status: 200 }
      );
    });
  } catch (error: any) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { 
        authenticated: false,
        message: `セッション確認中にエラーが発生しました: ${error.message}` 
      },
      { status: 500 }
    );
  }
}