import { cookies } from "next/headers";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

const ADMIN_COOKIE = "admin-auth";

export default async function Admin() {
  const cookiesStore = await cookies();
  const isAdmin = cookiesStore.get(ADMIN_COOKIE)?.value === "true";

  return isAdmin ? <AdminPanel /> : <AdminLogin />;
}

