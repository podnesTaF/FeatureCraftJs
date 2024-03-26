import { AuthenticatedUser } from "@/src/entities/main/auth/model";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const registerDto = await req.json();
    const { data } = await axios.post<AuthenticatedUser>(
      `${process.env.API_URL}/auth/register`,
      registerDto
    );

    const cookieStore = cookies();

    if (!data.token)
      return NextResponse.json(
        { message: "An error occurred" },
        { status: 500 }
      );

    cookieStore.set(process.env.AUTH_COOKIE_NAME || "", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    const { response } = error;
    return NextResponse.json(
      response?.data || { message: "An error occurred" },
      {
        status: 500,
      }
    );
  }
}
