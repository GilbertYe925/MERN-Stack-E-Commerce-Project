import { Request, Response } from 'express';
import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";

function calcPrices(orderItems: any[]){
    const itemPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxPrice = Number((itemPrice * 0.15).toFixed(2));
    const shippingPrice = itemPrice >= 100 ? 0 : 10;
    const totalPrice = itemPrice + taxPrice + shippingPrice;
    return { itemPrice: Number(itemPrice.toFixed(2)), taxPrice, shippingPrice: Number(shippingPrice.toFixed(2)), totalPrice: Number(totalPrice.toFixed(2))};
}

const createOrder = async (req: Request, res: Response) => {

    try{
        const {orderItems, shippingAddress, paymentMethod} = req.body;
        if (orderItems && orderItems.length === 0){
            res.status(400);
            throw new Error("No order items");
        }
            const itemsFromDB = await Product.find({
                _id: { $in: orderItems.map((x: any) => x._id) },
            });
            const dbOrderItems = orderItems.map((itemFromClient: any) => {
                const matchingItemFromDB = itemsFromDB.find((itemFromDB: any) => itemFromDB._id.toString() === itemFromClient._id.toString());
                if (matchingItemFromDB){
                    // Check if enough stock is available
                    if (matchingItemFromDB.countInStock < itemFromClient.quantity) {
                        res.status(400);
                        throw new Error(`Not enough stock available for ${matchingItemFromDB.name}. Available: ${matchingItemFromDB.countInStock}, Requested: ${itemFromClient.quantity}`);
                    }
                    const { _id, ...rest } = itemFromClient;
                    return {
                        ...rest,
                        product: matchingItemFromDB._id,
                        price: matchingItemFromDB.price,
                        quantity: itemFromClient.quantity,
                    };
                }else{
                    res.status(404);
                    throw new Error("Product not found");
                }
            });
            const {itemPrice, taxPrice, shippingPrice, totalPrice} = calcPrices(dbOrderItems);
            const order = new Order({
                user: req.user?._id,
                orderItems: dbOrderItems,
                shippingAddress,
                paymentMethod,
                itemPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });
            const createdOrder = await order.save();
            
            // Update product inventory
            for (const item of dbOrderItems) {
                await Product.findByIdAndUpdate(
                    item.product,
                    { $inc: { countInStock: -item.quantity } },
                    { new: true }
                );
            }
            
            res.status(201).json(createdOrder);
    }catch(error){
        res.status(500).json({message: "Error creating order", error: error});
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try{
        const orders = await Order.find({}).populate("user", "_id username");
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({message: "Error getting orders", error: error});
    }
};

const getUserOrders = async (req: Request, res: Response) => {
    try{
        const orders = await Order.find({user: req.user?._id});
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({message: "Error getting orders", error: error});
    }
};

const countTotalOrders = async (req: Request, res: Response) => {
    try{
        const totalOrders = await Order.countDocuments();
        res.status(200).json(totalOrders);
    }catch(error){
        res.status(500).json({message: "Error counting total orders", error: error});
    }
};

const calculateTotalSales = async (req: Request, res: Response) => {
    try{
        const orders = await Order.find();
        const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        res.status(200).json(totalSales);
    }catch(error){
        res.status(500).json({message: "Error calculating total sales", error: error});
    }
};


const calculateTotalSalesByDate = async (req: Request, res: Response) => {
    try{
        const salesByDate = await Order.aggregate([
            {
                $match: {
                    isPaid: true,
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
                    totalSales: { $sum: "$totalPrice" },
                },
            },
        ]);

        res.status(200).json(salesByDate);
    }catch(error){
        res.status(500).json({message: "Error calculating sales by date", error: error});
    }
};


const findOrderById = async (req: Request, res: Response) => {
    try{
        const order = await Order.findById(req.params.id).populate("user", "username email");
        if (order){
            res.status(200).json(order);
        }else{
            res.status(404).json({message: "Order not found"});
        }
    }catch(error){
        res.status(500).json({message: "Error finding order", error: error});
    }
};


const markOrderAsPaid = async (req: Request, res: Response) => {
    try{
        const order = await Order.findById(req.params.id);
        if (order){
            order.isPaid = true;
            order.paidAt = new Date(Date.now());
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer?.email_address,
            };
            await order.save();
            res.status(200).json(order);
        } else {
            res.status(404).json({message: "Order not found"});
        }
    }catch(error){
        res.status(500).json({message: "Error marking order as paid", error: error});
    }
};


const markOrderAsDelivered = async (req: Request, res: Response) => {
    try{
        const order = await Order.findById(req.params.id);
        if (order){
            order.isDelivered = true;
            order.deliveredAt = new Date(Date.now());
            await order.save();
            res.status(200).json(order);
        } else {
            res.status(404).json({message: "Order not found"});
        }
    }catch(error){
        res.status(500).json({message: "Error marking order as delivered", error: error});
    }
};

export { 
    createOrder, 
    getAllOrders, 
    getUserOrders, 
    countTotalOrders, 
    calculateTotalSales, 
    calculateTotalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
 };
