import { Document } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user?: Document & {
                _id: string;
                username: string;
                email: string;
                isAdmin: boolean;
            };
        }
    }
}

export {};

