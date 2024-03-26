"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { AuthenticatedUser } from "../../model";

export const getServerSessionData = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.AUTH_COOKIE_NAME || "");

  if (!token) return null;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

  const jwtPayload = jwt.verify(token?.value, jwtSecret);

  return jwtPayload as AuthenticatedUser;
};
