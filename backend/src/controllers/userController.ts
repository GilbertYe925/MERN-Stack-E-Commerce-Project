import { Request, Response } from 'express';
import User from '../models/userModel';
import asyncHandler from '../middleware/asyncHandler';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/createToken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail';

/**
 * Create a new user
 * @param req - The request object
 * @param res - The response object
 * @returns The created user
 */
const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    // validate request body
    if (!username || !email || !password) {
        throw new Error('All fields are required');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, password: hashedPassword });

    // create user
    try {
        await user.save();

        generateToken(res, user._id.toString());

        res
        .status(201)
        .json({
            _id: user._id, 
            username: user.username, 
            email: user.email, 
            isAdmin: user.isAdmin
        });
    } catch (error) {
        res.status(400)
        throw new Error('Failed to create new user')
    }
    
    
});

/*
 * Login a user
 * @param req - The request object
 * @param res - The response object
 * @returns The logged in user
 */
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {
            generateToken(res, existingUser._id.toString());
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
            return;
        } else {
            throw new Error('Invalid password');
        }
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

});

/**
 * Logout a user
 * @param req - The request object
 * @param res - The response object
 * @returns The logged out user
 */
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

/**
 * Get all users
 * @param req - The request object
 * @param res - The response object
 * @returns The list of users
 */
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find({});
    res.status(200).json(users);
});

/**
 * Get the current user's profile
 * @param req - The request object
 * @param res - The response object
 * @returns The current user's profile
 */
const getCurrentUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        throw new Error('User not found');
    }
});

/**
 * Update the current user's profile
 * @param req - The request object
 * @param res - The response object
 * @returns The updated user's profile
 */
const updateCurrentUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
/**
 * Get a user by id
 * @param req - The request object
 * @param res - The response object
 * @returns The user
 */
const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * Update a user by id
 * @param req - The request object
 * @param res - The response object
 * @returns The updated user
 */
const updateUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * Delete a user by id
 * @param req - The request object
 * @param res - The response object
 * @returns The deleted user
 */
const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({ _id: user._id });
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * Request password reset
 * @param req - The request object
 * @param res - The response object
 * @returns Success message
 */
const requestPasswordReset = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }

    const user = await User.findOne({ email });

    // Always return success to prevent email enumeration
    if (!user) {
        res.status(200).json({ message: 'If that email exists, a password reset link has been sent.' });
        return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/auth?resetToken=${resetToken}`;

    // Send email
    const emailSubject = 'Password Reset Request';
    const emailHtml = `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
    `;

    try {
        await sendEmail(user.email, emailSubject, emailHtml);
        res.status(200).json({ message: 'If that email exists, a password reset link has been sent.' });
    } catch (error) {
        // Clear the reset token if email fails
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        res.status(500);
        throw new Error('Failed to send reset email');
    }
});

/**
 * Reset password with token
 * @param req - The request object
 * @param res - The response object
 * @returns Success message
 */
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;

    if (!token || !password) {
        res.status(400);
        throw new Error('Token and password are required');
    }

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
});

export { createUser,
     loginUser, 
     logoutUser, 
     getAllUsers, 
     getCurrentUserProfile, 
     updateCurrentUserProfile, 
     getUserById, 
     updateUserById, 
     deleteUserById,
     requestPasswordReset,
     resetPassword
     };