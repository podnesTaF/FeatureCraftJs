import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  let changed = false;

  const cookieStore = cookies();
  const token = cookieStore.get(process.env.AUTH_COOKIE_NAME || "");

  const isAuthed = !!token;

  if (request.nextUrl.pathname.startsWith("/oauth")) {
    const token = url.searchParams.get("token");

    if (token && token.length > 0) {
      url.searchParams.delete("token");
      changed = true;
    }

    if (changed) {
      const response = NextResponse.redirect(
        new URL("/auth/oauth", request.url)
      );

      response.cookies.set({
        name: process.env.AUTH_COOKIE_NAME || "",
        value: token || "",
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      });

      return response;
    } else {
      const response = NextResponse.redirect(new URL("/", url));

      return response;
    }
  }

  if (request.nextUrl.pathname.startsWith("/auth") && isAuthed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !isAuthed) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
