import { Role } from "../src/interfaces/role";

export interface IUser {
  id: number; 
  uid: string; 
  name: string;
  email: string;
  password: string;
  role: Role; 
  createdAt: Date;
  updatedAt: Date; 
}