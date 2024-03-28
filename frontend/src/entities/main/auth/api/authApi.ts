import { createApiInstance } from "@/src/shared/api";
import axios from "axios";
import { AuthenticatedUser, CreateUserDto } from "../model";

export class AuthApi {
  private instance;

  constructor(token?: string) {
    this.instance = createApiInstance(token);
  }

  async login(credentials: { email?: string; password?: string }) {
    const { data } = await axios.post<AuthenticatedUser>(
      `/api/auth/login`,
      credentials
    );
    return data;
  }

  async register(dto: CreateUserDto) {
    const { data } = await axios.post<AuthenticatedUser>(
      "/api/auth/register",
      dto
    );
    return data;
  }

  async logout() {
    const { data } = await axios.post(`/api/auth/logout`);
    return data;
  }

  async setCookie(token: string) {
    const { data } = await axios.post("/api/auth/set-cookie", { token });
    return data;
  }

  async setEmail(email: string) {
    const { data } = await this.instance.patch<AuthenticatedUser>(
      `/auth/set-email`,
      { email }
    );
    return data;
  }
}
