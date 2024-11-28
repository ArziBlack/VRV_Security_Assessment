export enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  MODERATOR = "MODERATOR",
  SECURITY_ANALYST = "SECURITY_ANALYST",
  PENETRATION_TESTER = "PENETRATION_TESTER",
  NETWORK_ADMINISTRATOR = "NETWORK_ADMINISTRATOR",
}

interface ISignupData {
  name: string;
  email: string;
  password: string;
  id: number;
  uid: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface ISigninData {
  id: number;
  uid: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  token: string;
}

export interface ISignupResponse {
  status: number;
  success: boolean;
  message: string;
  error?: string[] | string;
  data?: ISignupData;
}

export interface ISigninResponse {
  status: number;
  success: boolean;
  message: string;
  error?: string[] | string;
  data?: ISigninData;
}
