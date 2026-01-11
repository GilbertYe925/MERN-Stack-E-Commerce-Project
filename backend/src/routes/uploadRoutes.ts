import path from 'path';
import express from 'express';
import multer from 'multer';
import { Request, Response } from 'express';
import { FileFilterCallback } from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {   

    const fileTypes = /jpe?g|png|webp/;
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
    const mimetype = file.mimetype

    if (mimetypes.test(mimetype) && fileTypes.test(extname)) {
        return cb(null, true);
    } else {
        return cb(new Error('Invalid file type'));
    }

};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req: Request, res: Response) => {
   uploadSingleImage(req, res, (err: any) => {
    if (err) {
        return res.status(400).json({message: err.message});
    } else if (req.file) {
        return res.status(200).json({message: 'Image uploaded successfully', image: `/${req.file.path}`});
    } else {
        return res.status(400).json({message: 'No file provided'});
    }
   });
});


export default router;