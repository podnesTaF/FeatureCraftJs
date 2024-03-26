import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();

  cookieStore.delete(process.env.AUTH_COOKIE_NAME || "");

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
