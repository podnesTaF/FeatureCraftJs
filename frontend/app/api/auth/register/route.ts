import {
  AuthenticatedUser,
  CreateUserDto,
} from "@/src/entities/main/auth/model";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createUserDto: CreateUserDto = await req.body();
    const { data } = await axios.post<AuthenticatedUser>(
      `${process.env.API_URL}/auth/register`,
      createUserDto
    );

    const cookieStore = cookies();

    cookieStore.set("global-auth-token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    });

    Response.json(data);
  } catch (error: any) {
    const { response } = error;
    Response.json(response?.data || { message: "An error occurred" });
  }
}
