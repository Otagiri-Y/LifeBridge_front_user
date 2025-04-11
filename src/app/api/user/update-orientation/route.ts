import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/lib/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

// リクエストボディの型定義
interface UpdateOrientationRequest {
  userId: string;
  workPurpose?: string[]; // 働く目的
  idealRole?: string[]; // 理想の役割
  contribute?: string[]; // 貢献したい相手
  personalValues?: string[]; // 大事にする価値観
}

// 既存のユーザー指向性を確認するための型
interface UserOrientation extends RowDataPacket {
  orientation_id: number;
  user_id: number;
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      workPurpose,
      idealRole,
      contribute,
      personalValues,
    }: UpdateOrientationRequest = await request.json();

    // 基本的なバリデーション
    if (!userId) {
      return NextResponse.json(
        { message: "ユーザーIDが必要です" },
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
        // ユーザーの既存設定を確認
        const [existingOrientations] = await connection.execute<
          UserOrientation[]
        >("SELECT orientation_id FROM user_orientation WHERE user_id = ?", [
          userIdNumber,
        ]);

        // 各項目をJSON形式に変換（複数選択を保存するため）
        const workPurposeJson =
          workPurpose && workPurpose.length > 0
            ? JSON.stringify(workPurpose)
            : null;
        const idealRoleJson =
          idealRole && idealRole.length > 0 ? JSON.stringify(idealRole) : null;
        const contributeJson =
          contribute && contribute.length > 0
            ? JSON.stringify(contribute)
            : null;
        const personalValuesJson =
          personalValues && personalValues.length > 0
            ? JSON.stringify(personalValues)
            : null;

        if (existingOrientations.length > 0) {
          // 既存の設定がある場合は更新
          await connection.execute<ResultSetHeader>(
            `UPDATE user_orientation 
             SET work_purpose = ?, 
                 ideal_role = ?, 
                 contribute = ?,
                 personal_values = ?
             WHERE user_id = ?`,
            [
              workPurposeJson,
              idealRoleJson,
              contributeJson,
              personalValuesJson,
              userIdNumber,
            ]
          );
        } else {
          // 既存の設定がない場合は新規作成
          await connection.execute<ResultSetHeader>(
            `INSERT INTO user_orientation 
             (user_id, work_purpose, ideal_role, contribute, personal_values) 
             VALUES (?, ?, ?, ?, ?)`,
            [
              userIdNumber,
              workPurposeJson,
              idealRoleJson,
              contributeJson,
              personalValuesJson,
            ]
          );
        }

        return NextResponse.json(
          {
            message: "働き方の指向性を保存しました",
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
