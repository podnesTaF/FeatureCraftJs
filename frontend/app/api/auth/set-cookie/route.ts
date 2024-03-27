import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token }: { token: string } = await req.json();

  if (token.length > 0) {
    const cookieStore = cookies();
    cookieStore.set(process.env.AUTH_COOKIE_NAME || "", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    });

    console.log(
      "cookie set",
      cookies().get(process.env.AUTH_COOKIE_NAME || "")
    );

    return NextResponse.json(
      { data: "success" },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json(
    { message: "Cookie is not set" },
    {
      status: 500,
    }
  );
}
