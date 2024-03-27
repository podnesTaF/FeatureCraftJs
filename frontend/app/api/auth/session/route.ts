export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");
  let token;

  console.log("Authorization header", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the Authorization header
    token = authHeader.substring(7, authHeader.length);
  }

  console.log("Bearer token", token);
}
