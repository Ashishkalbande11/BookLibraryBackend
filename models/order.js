import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Types.ObjectId,
            ref : "user",
        },
        book : {
            type : mongoose.Types.ObjectId,
            ref : "books",
        },
        status : {
            type : String,
            default : "Order Placed",
            enum : ["Order Placed", "Out for delivery", 'Delivered', 'Canceled'],
        },
    },
    {timestamps : true}
)

const order = mongoose.model("order", orderSchema);

export default order;