import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import asyncHandler from './asyncHandler';
import {Request, Response, NextFunction} from 'express';

const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    token = req.cookies?.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const authorize = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
});

export { authenticate, authorize };