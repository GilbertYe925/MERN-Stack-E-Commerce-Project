import express from 'express';
import {authenticate, authorize} from '../middleware/authMiddleware';
import { createCategory, updateCategory, removeCategory, listCategory, readCategory } from '../controllers/categoryController';

const router = express.Router();

router.route('/').post(authenticate, authorize, createCategory);
router.route('/:id').put(authenticate, authorize, updateCategory);
router.route('/:id').delete(authenticate, authorize, removeCategory);
router.route('/categories').get(listCategory);
router.route('/:id').get(readCategory);

export default router;