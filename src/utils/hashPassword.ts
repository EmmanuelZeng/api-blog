import { hash } from "bcrypt";

//fonction pour hasher le mot de passe
export const hashPassword = (password: string) => {
    const hashedPassword = hash(password, 9);
    return hashedPassword;
}