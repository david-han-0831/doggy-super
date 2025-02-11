// doggy-super/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies, nextUrl } = req;
  // 로그인 페이지 ("/")와 public 페이지는 보호하지 않음
  const whitelist = ["/", "/public"];
  const url = nextUrl.clone();

  // 현재 요청 경로가 화이트리스트에 포함되어 있다면 그대로 진행
  if (whitelist.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 인증이 필요한 모든 경로에서는 httpOnly 쿠키에 저장된 refresh_token이 있어야 함
  const refreshToken = cookies.get("refresh_token");
  if (!refreshToken) {
    // refresh_token이 없으면 로그인 페이지로 리다이렉트
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 (API, _next, favicon 등은 제외)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
