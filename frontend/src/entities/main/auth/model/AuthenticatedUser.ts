export type AuthenticatedUser = {
  id: number;
  fullName: string;
  email: string;
  roles: RequestRole[];
  imageName: string;
  token: string;
};

export interface RequestRole {
  id: number;
  name: string;
  active: boolean;
}
