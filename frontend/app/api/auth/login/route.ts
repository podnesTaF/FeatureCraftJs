import { EmailLoginSchema } from "@/src/entities/main";
import { AuthenticatedUser } from "@/src/entities/main/auth/model";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const loginData: EmailLoginSchema = req.body;

    const { data } = await axios.post<AuthenticatedUser & { token: string }>(
      `${process.env.API_URL}/auth/login`,
      loginData
    );

    const cookieStore = cookies();

    cookieStore.set("global-auth-token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json({ message: error.message || "An error occurred" });
  }
}
