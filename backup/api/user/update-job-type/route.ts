import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/lib/mysql";
import { ResultSetHeader } from "mysql2/promise";

// リクエストボディの型定義
interface UpdateJobTypeRequest {
  userId: string;
  jobType: string;
  jobTypeDetail?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const { userId, jobType, jobTypeDetail }: UpdateJobTypeRequest =
      await request.json();

    // 基本的なバリデーション
    if (!userId) {
      return NextResponse.json(
        { message: "ユーザーIDが必要です" },
        { status: 400 }
      );
    }

    if (!jobType) {
      return NextResponse.json(
        { message: "職種を選択してください" },
        { status: 400 }
      );
    }

    // 数値に変換
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      return NextResponse.json(
        { message: "無効なユーザーIDです" },
        { status: 400 }
      );
    }

    try {
      // データベース接続とクエリ実行
      return await withDb(async (connection) => {
        // ユーザーの職種情報を更新
        await connection.execute<ResultSetHeader>(
          "UPDATE users SET job_type = ?, job_type_detail = ? WHERE user_id = ?",
          [jobType, jobTypeDetail || null, userIdNumber]
        );

        return NextResponse.json(
          {
            message: "職種情報を保存しました",
            success: true,
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
          success: false,
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
        success: false,
      },
      { status: 500 }
    );
  }
}
