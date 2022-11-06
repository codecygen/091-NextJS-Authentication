import { hash } from 'bcrypt';

export const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12);

    return hashedPassword;
};