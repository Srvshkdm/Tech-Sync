import jwt from 'jsonwebtoken';

const generateTokens = async (user) => {
    try {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user._id);

        return { accessToken, refreshToken };
    } catch (err) {
        throw new Error(`error occured while generating tokens, error: ${err}`);
    }
};

const generateAccessToken = async (user) => {
    return jwt.sign(
        { user }, // saving complete user in access token
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

const generateRefreshToken = async (userId) => {
    return jwt.sign(
        {
            userId, // just saving the _id in refresh token in db
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export { generateTokens, generateAccessToken, generateRefreshToken };
