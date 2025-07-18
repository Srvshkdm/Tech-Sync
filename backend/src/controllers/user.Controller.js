import bcrypt from 'bcrypt';
import { User, UserVerification, PasswordReset } from '../models/index.js';
import { v4 as uuid } from 'uuid';
import {
    sendVerificationEmail,
    validateRegex,
    getTransporter,
    generateTokens,
    validatePassword,
} from '../utils/index.js';
import {
    OK,
    SERVER_ERROR,
    BAD_REQUEST,
    PENDING,
} from '../constants/statusCodes.js';
import { cookieOptions } from '../constants/cookie.js';
import { getPasswordResetMailLayout } from '../constants/mails.js';

// verify email
const verifyEmail = async (req, res) => {
    try {
        let { userId, uniqueString } = req.params;
        const verificationRecord = await UserVerification.findOne({ userId });
        if (verificationRecord) {
            //verification record exists
            const { expiresAt } = verificationRecord;
            const hashedUniqueString = verificationRecord.uniqueString;

            // check for expired unique string
            if (expiresAt < Date.now()) {
                // record expired => delete it
                const deletedVerificationRecord =
                    await UserVerification.deleteOne({ userId });
                if (deletedVerificationRecord) {
                    const deletedUser = await User.deleteOne({ _id: userId });
                    if (deletedUser) {
                        res.status(BAD_REQUEST).json({
                            message:
                                'your verification link has expired please sign up again',
                        });
                    }
                }
            } else {
                //link is not expired => proceed

                // compare hashed string
                const doesStringsMatch = bcrypt.compareSync(
                    uniqueString,
                    hashedUniqueString
                );
                if (doesStringsMatch) {
                    const updatedUser = await User.updateOne(
                        { _id: userId },
                        { verified: true }
                    );
                    if (updatedUser) {
                        const deletedVerificationRecord =
                            await UserVerification.deleteOne({ userId });
                        if (deletedVerificationRecord) {
                            res.status(OK).json({
                                message: 'email verified successfully',
                            });
                        }
                    }
                } else {
                    res.status(BAD_REQUEST).json({
                        message: 'invalid verification details provided.',
                    });
                }
            }
        } else {
            res.status(BAD_REQUEST).json({
                message:
                    "Account doesn't exit or has been verified already, Please sign up or login",
            });
        }
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'error occured while email verification.',
            error: err.message,
        });
    }
};

const register = async (req, res) => {
    try {
        let { name, email, phone, password, redirectURL } = req.body;
        name = name.trim();
        email = email.trim();
        phone = phone.trim();

        if (!name || !email || !password || !phone) {
            return res.status(BAD_REQUEST).json({
                message: 'empty input fields!',
            });
        }

        // regex validation
        let isValid = validateRegex('name', name);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message:
                    'only letters are allowed and should not exceed 15 characters.',
            });
        }

        isValid = validateRegex('email', email);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: 'please enter a valid email.',
            });
        }

        isValid = validateRegex('password', password);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: 'Password length should be at least 8 characters',
            });
        }

        //check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            //Already exists
            return res.status(BAD_REQUEST).json({
                message: 'user already exists with this email',
            });
        } else {
            //create new user
            //password hashing ( auto done using pre hook )
            const newUser = await User.create({
                name,
                email,
                password,
                phone,
            });

            // send mail
            if (newUser) {
                return await sendVerificationEmail(newUser, redirectURL, res);
            }
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occured while registering user !',
            error: err.message,
        });
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email.trim();
        password = password.trim();

        if (!email || !password) {
            return res.status(BAD_REQUEST).json({
                message: 'Empty credentials provided !',
            });
        }

        //check if user exists
        const user = await User.findOne({ email });

        if (user) {
            //user exists

            //check if user is verified
            if (!user.verified) {
                return res.status(BAD_REQUEST).json({
                    message:
                        'Email has not been verified yet. Check your inbox',
                });
            } else {
                const isPasswordVerified = await validatePassword(
                    password,
                    user.password // hashed password
                );
                if (isPasswordVerified) {
                    // generate tokens
                    const { accessToken, refreshToken } =
                        await generateTokens(user);

                    // update user's refreshToken
                    user.refreshToken = refreshToken;
                    await user.save();

                    // send cookies
                    return res
                        .status(OK)
                        .cookie('accessToken', accessToken, {
                            ...cookieOptions,
                            maxAge: parseInt(process.env.ACCESS_TOKEN_MAXAGE),
                        })
                        .cookie('refreshToken', refreshToken, {
                            ...cookieOptions,
                            maxAge: parseInt(process.env.REFRESH_TOKEN_MAXAGE),
                        })
                        .json(user);
                } else {
                    res.status(BAD_REQUEST).json({
                        message: 'invalid credentials.',
                    });
                }
            }
        } else {
            res.status(BAD_REQUEST).json({
                message: 'user not found.',
            });
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while logging the user.',
            error: err.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, {
            $set: { refreshToken: '' },
        });
        return res
            .status(OK)
            .clearCookie('accessToken', cookieOptions)
            .clearCookie('refreshToken', cookieOptions)
            .json({ message: 'user logged out successfully' });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while logging out user',
            err: err.message,
        });
    }
};

const updateRole = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { role } = req.body;
        const user = await User.findById(_id);
        if (!user.verified) {
            return res.status(BAD_REQUEST).json({
                message: 'Email has not been verified yet. Check your inbox',
            });
        } else {
            user.designation = role;
            await user.save();
        }
        next();
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error while updating user role',
            error: err.message,
        });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndDelete(_id);
        return res
            .status(OK)
            .clearCookie('accessToken', cookieOptions)
            .clearCookie('refreshToken', cookieOptions)
            .json({ message: 'user account deleted successfully' });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while deleting user account',
            err: err.message,
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(OK).json(user);
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'error occured while fetching the current logged in user',
            err: err.message,
        });
    }
};

// reset password logics
const requestResetPassword = async (req, res) => {
    try {
        const { email, redirectURL } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (user) {
            //check if user is verified
            if (!user.verified) {
                res.status(BAD_REQUEST).json({
                    message:
                        'Your email has not been verified yet. Check your inbox',
                });
            } else {
                //user is verified so we can proceed with reset email
                //Clear existing reset records
                await PasswordReset.deleteMany({
                    userId: user._id,
                });
                await sendPasswordResetEmail(user, redirectURL, res);
            }
        } else {
            res.status(BAD_REQUEST).json({
                message: 'user not found',
            });
        }
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'error occured while requesting for reset password',
            error: err.message,
        });
    }
};

const sendPasswordResetEmail = async (user, redirectURL, res) => {
    try {
        const { _id, email } = user;
        const resetString = uuid() + _id;
        const url = `${redirectURL}/${_id}/${resetString}`;

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Reset Password',
            html: getPasswordResetMailLayout(url),
        };

        const newPasswordResetRecord = await PasswordReset.create({
            userId: _id,
            resetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        if (newPasswordResetRecord) {
            // send the email
            const transporter = await getTransporter();
            await transporter.sendMail(mailOptions);
            //reset email sent and password reset record saved
            res.status(PENDING).json({
                message: 'password reset email sent',
            });
        }
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'error occured while sending password reset email',
            error: err.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { resetString, newPassword } = req.body;
        const userId = req.user._id;

        if (!newPassword) {
            return res
                .status(BAD_REQUEST)
                .json({ message: 'empty password field' });
        }
        const resetRecord = await PasswordReset.findOne({ userId });

        if (resetRecord) {
            //password reset record exists so we proceed
            const { expiresAt } = resetRecord;
            const hashedResetString = resetRecord.resetString;
            //check for expired reset string
            if (expiresAt < Date.now()) {
                const deletedResetRecord =
                    await PasswordReset.findByIdAndDelete(resetRecord._id);
                if (deletedResetRecord) {
                    // Reset record deleted successfully
                    return res.status(BAD_REQUEST).json({
                        message:
                            'Your password reset link has expired, Please try again.',
                    });
                }
            } else {
                //valid reset record exists so we validate the reset string
                //first compare the hashed reset string

                const doesResetStringsMatch = bcrypt.compareSync(
                    resetString,
                    hashedResetString
                );
                if (doesResetStringsMatch) {
                    //strings matched
                    const hashedPassword = bcrypt.hashSync(newPassword, 10);

                    //update user password
                    const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        {
                            $set: { password: hashedPassword },
                        },
                        { new: true }
                    );
                    if (updatedUser) {
                        //update complete now delete reset record
                        const deletedResetRecord =
                            await PasswordReset.findByIdAndDelete(
                                resetRecord._id
                            );
                        if (deletedResetRecord) {
                            //reset reset record deleted
                            return res.status(OK).json({
                                message: 'password has been reset successfully',
                            });
                        }
                    }
                } else {
                    //existing record but incorrect reset string
                    return res.status(BAD_REQUEST).json({
                        message:
                            'Invalid reset credentials provided. Please try again with valid credentials.',
                    });
                }
            }
        } else {
            return res.status(BAD_REQUEST).json({
                message:
                    'No reset record with provided details found, Please try again.',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(SERVER_ERROR).json({
            message: 'error occured while reseting password',
            error: err.message,
        });
    }
};

export {
    register,
    verifyEmail,
    login,
    logout,
    updateRole,
    deleteAccount,
    getCurrentUser,
    resetPassword,
    requestResetPassword,
    sendPasswordResetEmail,
};
