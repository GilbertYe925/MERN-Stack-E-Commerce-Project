import Category from '../models/categoryModel';
import asyncHandler from '../middleware/asyncHandler';
import { Request, Response } from 'express';

const createCategory = asyncHandler(async (req: Request, res: Response) => {
    try{
        const {name} = req.body;
        if (!name) {
            return res.json({error: 'Category name is required'});
        }
        const existingCategory = await Category.findOne({name});
        if (existingCategory) {
            return res.json({error: 'Category already exists'});
        }
        const category = await new Category({name}).save();
        res.json(category);
    }catch(error: any){
        res.status(500).json(error.message || 'Internal server error');
    }
})

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {name} = req.body;

        const category = await Category.findOne({_id : id});
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }
        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
        
    }catch(error: any){
        res.status(500).json(error.message || 'Internal server error');
    }
})


const removeCategory = asyncHandler(async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }
        res.json({message: 'Category deleted successfully'});
    }catch(error: any){
        res.status(500).json(error.message || 'Internal server error');
    }
})

const listCategory = asyncHandler(async (req: Request, res: Response) => {
    try{
        const categories = await Category.find();
        res.json(categories);
    }catch(error: any){
        res.status(500).json(error.message || 'Internal server error');
    }
})

const readCategory = asyncHandler(async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const category = await Category.findOne({_id : id});
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }
        res.json(category);
    }catch(error: any){
        res.status(500).json(error.message || 'Internal server error');
    }
})

export { createCategory, updateCategory, removeCategory, listCategory, readCategory }
