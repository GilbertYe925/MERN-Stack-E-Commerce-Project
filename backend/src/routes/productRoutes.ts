import express from 'express';
import formidable from 'express-formidable';
import {authenticate, authorize} from '../middleware/authMiddleware';
import checkId from '../middleware/checkId';
import { 
    addProduct, 
    updateProductDetails, 
    removeProduct, 
    fetchProducts, 
    fetchProductById, 
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts } from '../controllers/productController';


const router = express.Router();

router.route('/')
.get(fetchProducts)
.post(authenticate, authorize, formidable(), addProduct);

router.route('/allproducts').get(fetchAllProducts);

router.route('/:id/reviews').post(authenticate, checkId, addProductReview);

router.get('/top', fetchTopProducts);
router.get('/new', fetchNewProducts);

router.route('/:id')
.put(authenticate, authorize, checkId, formidable(), updateProductDetails)
.delete(authenticate, authorize, checkId, removeProduct)
.get(checkId, fetchProductById);

router.route('/filtered-products').post(filterProducts);

export default router;