enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
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

export interface ISignupResponse {
  status: number;
  success: boolean;
  message: string;
  error?: string[] | string;
  data?: ISignupData;
}
