import { getServerSessionData } from "@/src/entities/main";

export default async function Home() {
  const user = await getServerSessionData();
  return (
    <>
      <div className="mt-20">
        <h3>{user ? `Welcome ${user.email}` : "You are not logged in"}</h3>
      </div>
    </>
  );
}

