import 'server-only';
import { cookies } from 'next/headers';
import { encrypt, decrypt } from "@/utils/jwt";

// ログイン状態（セッション）を管理する処理

// セッションを作成
export async function createSession(userId: string) {

  // 有効期限の設定(現在時刻から7日後が有効期限)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });  // ユーザーIDと有効期限をJWTに含める

  // 作成したセッションをクッキーに保存
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,  // JavaScriptからCookieを読み取れなくする
    secure: true,    // HTTPS通信でのみCookieを送信する
    expires: expiresAt,   // Cookieの有効期限
    sameSite: 'lax',   // 外部サイトからの不正なリクエストを抑制する
    path: '/',   // サイト全体でCookieを利用する
  });
}

// ログイン状態を確認する
export async function verifySession() {
  const cookieStore = await cookies();  // クッキーの取得
  const cookie = cookieStore.get('session');   // sessionという名前のCookieを取り出す
  const session = await decrypt(cookie?.value);

  if (!session?.userId) {
    return null;
  }

  // ユーザーidが存在すればログイン済として返す
  return { isAuth: true, userId: session.userId as string };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}