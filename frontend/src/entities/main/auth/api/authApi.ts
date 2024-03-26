import { createApiInstance } from "@/src/shared/api";
import axios from "axios";
import { AuthenticatedUser, CreateUserDto } from "../model";

export class AuthApi {
  private instance;

  constructor() {
    this.instance = createApiInstance();
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
}
