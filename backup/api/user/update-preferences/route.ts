import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/lib/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

// リクエストボディの型定義
interface UpdatePreferencesRequest {
  userId: string;
  atmosphere?: string[];  // 職場の雰囲気
  ageGroup?: string[];    // 年齢層
  workStyle?: string[];   // 仕事のスタイル
}

// 既存のユーザー設定を確認するための型
interface UserPreference extends RowDataPacket {
  preference_id: number;
  user_id: number;
}

export async function POST(request: NextRequest) {
  try {
    const { userId, atmosphere, ageGroup, workStyle }: UpdatePreferencesRequest = await request.json();

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
        const [existingPreferences] = await connection.execute<UserPreference[]>(
          "SELECT preference_id FROM user_preferences WHERE user_id = ?",
          [userIdNumber]
        );

        // 各項目をJSON形式に変換（複数選択を保存するため）
        const atmosphereJson = atmosphere && atmosphere.length > 0 ? JSON.stringify(atmosphere) : null;
        const ageGroupJson = ageGroup && ageGroup.length > 0 ? JSON.stringify(ageGroup) : null;
        const workStyleJson = workStyle && workStyle.length > 0 ? JSON.stringify(workStyle) : null;

        if (existingPreferences.length > 0) {
          // 既存の設定がある場合は更新
          await connection.execute<ResultSetHeader>(
            `UPDATE user_preferences 
             SET atmosphere = ?, 
                 age_group = ?, 
                 work_style = ?
             WHERE user_id = ?`,
            [atmosphereJson, ageGroupJson, workStyleJson, userIdNumber]
          );
        } else {
          // 既存の設定がない場合は新規作成
          await connection.execute<ResultSetHeader>(
            `INSERT INTO user_preferences 
             (user_id, atmosphere, age_group, work_style) 
             VALUES (?, ?, ?, ?)`,
            [userIdNumber, atmosphereJson, ageGroupJson, workStyleJson]
          );
        }

        return NextResponse.json(
          { 
            message: "職場環境の希望条件を保存しました",
            success: true
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
          success: false
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
        success: false
      },
      { status: 500 }
    );
  }
}