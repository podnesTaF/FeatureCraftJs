import cookie from "cookie";
import { NextApiRequest } from "next";

export const getTokenFromServerSideCookie = (
  req: NextApiRequest
): string | null => {
  if (!req.headers.cookie) return null;
  const cookies = cookie.parse(req.headers.cookie);
  return cookies["global-auth-token"] || null;
};
