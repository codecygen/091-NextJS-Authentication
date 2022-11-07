import { hash, compare } from 'bcrypt';

// This section converts entered password into
// hashed password. It is used in registration.
export const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12);

    return hashedPassword;
};

// This section is used to compare the password entered by user
// with the password in database. So it is used for authorization.
// Here, the first argument is the entered password by someone who
// is trying to login, and other one is the hashed password that is
// already stored in database for that specific user.
// This function is used in [...nextauth].js file.
export const verifyPassword = async (password, hashedPassword) => {
    const isValid = compare(password, hashedPassword);
    return isValid;
};