import { AuthApi } from "@/src/entities/main";
import { useAuth } from "..";

export const useLogout = () => {
  const { logout: clientLogout } = useAuth();

  const logout = async () => {
    const authApi = new AuthApi();
    await authApi.logout();

    window.location.href = "/";
  };

  return {
    logout,
  };
};
