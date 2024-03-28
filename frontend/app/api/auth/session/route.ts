export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the Authorization header
    token = authHeader.substring(7, authHeader.length);
  }
}
