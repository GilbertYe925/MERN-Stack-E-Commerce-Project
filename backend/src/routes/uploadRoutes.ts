import express from 'express';
import multer from 'multer';
import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';

const router = express.Router();

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {   
    const fileTypes = /\.(jpe?g|png|webp)$/i;
    const mimetypes = /^image\/(jpe?g|png|webp)$/;
    const mimetype = file.mimetype;

    if (mimetypes.test(mimetype) && fileTypes.test(file.originalname)) {
        return cb(null, true);
    } else {
        return cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
    }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req: Request, res: Response) => {
   uploadSingleImage(req, res, async (err: any) => {
    if (err) {
        return res.status(400).json({message: err.message});
    } 
    
    if (!req.file) {
        return res.status(400).json({message: 'No file provided'});
    }

    try {
        // Convert buffer to base64 data URI for Cloudinary
        const base64String = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64String, {
            folder: 'products', // Optional: organize images in a folder
            resource_type: 'image',
        });
        
        return res.status(200).json({
            message: 'Image uploaded successfully', 
            image: result.secure_url // Use secure_url for HTTPS
        });
        
    } catch (error: any) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({message: error.message || 'Failed to upload image to cloud storage'});
    }
   });
});


export default router;