import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const setCookie = (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body; // Assume the token is sent in the request body

  // Set the cookie
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("global-auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    })
  );

  res.status(200).json({ success: true });
};

export default setCookie;
