import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();

  const isAuthed =
    cookieStore.get(process.env.AUTH_COOKIE_NAME || "") !== undefined;

  if (request.nextUrl.pathname.startsWith("/auth") && isAuthed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !isAuthed) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
