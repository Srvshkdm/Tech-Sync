import bcrypt from 'bcrypt';

export const validatePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compareSync(password, hashedPassword);
    } catch (err) {
        throw err;
    }
};
