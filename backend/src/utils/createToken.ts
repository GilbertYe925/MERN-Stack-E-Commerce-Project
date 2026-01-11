import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';

const generateToken = (res: Response, userId: string) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string, {expiresIn: '30d'});

    // Set JWT as an HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Must be true in production for cross-site
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // 'none' required for cross-site
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
}

export default generateToken;

