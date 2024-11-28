export interface Profile {
  name: string | null;
  password?: string;
  email?: string | null;
  role: string | null;
  country: string;
  phone: string;
  homeAddress: string;
  state: string;
  city?: string;
  organisation: string;
  areasOfFocus?: string[];
  techUsed: string;
}

export interface IGetAllUsers {
  status: number;
  success: boolean;
  message: string;
  error?: string[] | string;
  data?: Profile[];
}

export interface IVerifyUser {
  status: number;
  success: boolean;
  message: string;
  error?: string[] | string;
  data?: Profile[];
}
