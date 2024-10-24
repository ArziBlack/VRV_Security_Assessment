export interface TokenPayload {
    email: string | null;
    role?: string | null;
}

export abstract class BcryptServiceInterface {
    public static hashPassword: (password: string) => string;
    public static comparePassword: (password: string, hash: string) => boolean;
}
  