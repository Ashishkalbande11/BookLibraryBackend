import Order from "../models/order.js";
import User from "../models/user.js";

export const placeOrder = async(req,res) => {
    try {
        const {id} = req.headers;
        const {order} = req.body;
        for(const orderData of order){
            const newOrder = new Order ({user : id, book : orderData._id});
            const orderDataFromDB = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push : {orders : orderDataFromDB._id},
            });

            await User.findByIdAndUpdate(id, {
                $pull : {cart : orderData._id},
            });
        } 
        return res.json({
            status : "Success",
            message : "Order placed Successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "An error occoured"});
    }
}

export const orderHistory = async(req,res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate : {path: "book"},
        })
        const ordersData = userData.orders.reverse();

        return res.json({
            status:"Success",
            data : ordersData,
        });
    } catch (error) {
        return res.status(500).json({message: "An error occoured"});
    }
}

export const getAllOrders = async(req, res) => {
    try {
        const userData = await Order.find()
        .populate({
            path: "book",
        })
        .populate({
            path: "user",
        })
        .sort({createdAt : -1});

        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({message : "An error occoured"});
    }
}

export const updateStatus  = async(req, res) => {
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {
            status: req.body.status,
        });

        return res.json({
            status:"Success",
            message : "Status updated successfully",
        });
    } catch (error) {
        return res.status(500).json({message : "An error occoured"});  
    }
}