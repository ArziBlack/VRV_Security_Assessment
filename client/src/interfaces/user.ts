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
