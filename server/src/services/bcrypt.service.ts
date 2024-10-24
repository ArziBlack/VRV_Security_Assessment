import { BCRYPT_ROUND } from "../config";
import { BcryptServiceInterface } from "../interfaces/params";
import bcrypt from "bcrypt";

class bcrypt_service implements BcryptServiceInterface {
    public static hashPassword = (password: string): string => {
        const salt = bcrypt.genSaltSync(Number(BCRYPT_ROUND));
        return bcrypt.hashSync(password, salt);
    };

    public static comparePassword = (password: string, hash: string): boolean => {
        return bcrypt.compareSync(password, hash);
    };    
}

export default bcrypt_service;