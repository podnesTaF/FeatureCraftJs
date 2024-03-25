import { IUserRole } from "./IRole";

export type IUser = {
  id: number;

  fullName: string;

  email: string;

  password: string;

  imageName: string;

  emailVerified: boolean;

  roles: IUserRole[];

  rolesShort?: string[];
};
