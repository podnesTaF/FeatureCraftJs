import { IUser } from "./IUser";

export type IUserRole = {
  userId: number;
  roleId: number;
  user: IUser;
  role: IRole;
  name: string;
  active: boolean;
};

export type IRole = {
  id: number;
  name: string;
  description: string;
};

export enum Role {
  Admin = "Admin",
  User = "User",
  Test = "Test",
}
