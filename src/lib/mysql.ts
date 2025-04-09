import mysql from "mysql2/promise";

// MySQLデータベース接続設定
const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "life_db",
  ssl: {
    // Azure MySQL用のSSL設定
    rejectUnauthorized: true,
  },
};

// デバッグ用：設定を出力（本番環境では削除してください）
console.log("DB Config:", {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  // パスワードは表示しません
  password: dbConfig.password ? "設定あり" : "設定なし",
  database: dbConfig.database,
});

/**
 * データベース接続を作成し、クエリを実行するためのヘルパー関数
 * @param callback データベース接続を使用して処理を行うコールバック関数
 * @returns コールバック関数の戻り値
 */
export async function withDb<T>(
  callback: (connection: mysql.Connection) => Promise<T>
): Promise<T> {
  const connection = await mysql.createConnection(dbConfig);
  try {
    return await callback(connection);
  } finally {
    await connection.end();
  }
}

/**
 * 単一のクエリを実行するためのヘルパー関数
 * @param query SQLクエリ
 * @param params クエリパラメータ
 * @returns クエリ結果
 */
export async function query<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  return withDb(async (connection) => {
    const [rows] = await connection.execute(query, params);
    return rows as T[];
  });
}

/**
 * 単一のレコードを取得するためのヘルパー関数
 * @param query SQLクエリ
 * @param params クエリパラメータ
 * @returns 1件のレコードまたはnull
 */
export async function queryOne<T = any>(
  query: string,
  params: any[] = []
): Promise<T | null> {
  const rows = await query<T>(query, params);
  return rows.length > 0 ? rows[0] : null;
}
