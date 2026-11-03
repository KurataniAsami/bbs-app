import { decrypt } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

// ログインしていない時に公開するページを指定
const PUBLIC_PATHS = ['/login', '/signup'];

export async function proxy(request: NextRequest) {
  // アクセス先のURLを取得
  const { pathname } = request.nextUrl;  // login にアクセスした場合、pathnameがlogin

  // cookieからセッションを取得
  const cookie = request.cookies.get('session');
  const session = await decrypt(cookie?.value);  // decryptでJWTを検証

  const isAuthenticated = !!session?.userId;  // userIdが存在すればログイン済と判断する
  // 公開ページかどうかを判定
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path))

  // ログイン済ユーザー
  // ログイン時にPUBLIC_PATHSのURLにアクセスした場合、ホーム画面にリダイレクトする
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 未ログインユーザーが公開していないページにアクセスした場合
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// proxyを起動しない
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};