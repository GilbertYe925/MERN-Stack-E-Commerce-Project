import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { Product } from '../models/productModel';


const addProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {name, description, price, category, brand, quantity} = req.fields as {
            name?: string;
            description?: string;
            price?: string | number;
            category?: string;
            brand?: string;
            quantity?: string | number;
        };
        //validation
        switch (true) {
            case !name:
                return res.json({message: 'Name is required'});
            case !description:
                return res.json({message: 'Description is required'});
            case !price:
                return res.json({message: 'Price is required'});
            case !category:
                return res.json({message: 'Category is required'});
            case !brand:
                return res.json({message: 'Brand is required'});
            case !quantity:
                return res.json({message: 'Quantity is required'});
        }
        // Convert string values to numbers to match model types
        const productData: any = {
            ...req.fields,
            price: typeof price === 'string' ? parseFloat(price) : price,
            quantity: typeof quantity === 'string' ? parseInt(quantity, 10) : quantity,
        };
        const product = await Product.create(productData);
        product.save();
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});


const updateProductDetails = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {name, description, price, category, brand, quantity} = req.fields as {
            name?: string;
            description?: string;
            price?: string | number;
            category?: string;
            brand?: string;
            quantity?: string | number;
        };
        //validation
        switch (true) {
            case !name:
                return res.json({message: 'Name is required'});
            case !description:
                return res.json({message: 'Description is required'});
            case !price:
                return res.json({message: 'Price is required'});
            case !category:
                return res.json({message: 'Category is required'});
            case !brand:
                return res.json({message: 'Brand is required'});
            case !quantity:
                return res.json({message: 'Quantity is required'});
        }
        // Convert string values to numbers to match model types
        const updateData: any = {
            ...req.fields,
            price: typeof price === 'string' ? parseFloat(price) : price,
            quantity: typeof quantity === 'string' ? parseInt(quantity, 10) : quantity,
        };
        const product = await Product.findByIdAndUpdate(id, updateData, {new: true});
        res.status(200).json(product);
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

const removeProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500);
        throw new Error(error.message);
    }
});


const fetchProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const pageSize = 6
        const keyword = req.query.keyword as string ? {name: {$regex: req.query.keyword, $options: 'i'}} : {};
        const count = await Product.countDocuments({...keyword});
        
        const products = await Product.find({...keyword}).limit(pageSize);

        res.json({
            products, 
            page: 1, 
            pages: Math.ceil(count / pageSize), 
            hasMore: false});
    } catch (error: any) {
        res.status(500);
        throw new Error(error.message);
    }
});


const fetchProductById = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (product) {
            return res.status(200).json(product);
        } else{
            return res.status(404).json({message: 'Product not found'});
        }
    } catch (error: any) {
        res.status(404).json({message: 'Product not found'});
    }
});   


const fetchAllProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({createdAt: -1});
        return res.status(200).json(products);
    } catch (error: any) {
        res.status(500);
        throw new Error(error.message);
    }
});

const addProductReview = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {rating, comment} = req.body;
        const product = await Product.findById(id);
        if (product) {
            const alreadyReviewed = product.reviews.find((r: any) => r.user.toString() === req.user?._id.toString());
            if (alreadyReviewed) {
                return res.status(400).json({message: 'Product already reviewed'});
            } else{
                const review = {
                    name: req.user?.username,
                    rating: Number(rating),
                    comment,
                    user: req.user?._id,
                }
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / product.reviews.length;
                await product.save();
                return res.status(201).json({message: 'Review added successfully'});
            }
        } else{
            return res.status(404).json({message: 'Product not found'});
        }
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

const fetchTopProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4);
        return res.status(200).json(products);
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});


const fetchNewProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const products = await Product.find({}).sort({createdAt: -1}).limit(5);
        return res.status(200).json(products);
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});


const filterProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {checked, radio} = req.body;

        let args: any = {}
        if (checked.length > 0) args.category = checked;
        if (radio.length > 0) args.price = {$gte: radio[0], $lte: radio[1]};
        const products = await Product.find(args)
        res.json(products);
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});
export { 
    addProduct, 
    updateProductDetails, 
    removeProduct, 
    fetchProducts, 
    fetchProductById, 
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts };