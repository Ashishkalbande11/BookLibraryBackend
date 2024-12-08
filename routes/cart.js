import { Router } from "express";
import authenticateToken from "../controller/authController.js"
import User from "../models/user.js";

const router = Router();

router.put("/add-to-cart", authenticateToken, async(req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookPresent = userData.cart.includes(bookid);

        if(isBookPresent){
            return res.json({
                status : "Success",
                message : "Book already exits",
            });
        }
        await User.findByIdAndUpdate(id, {$push : {cart:bookid},});

        return res.json({
            status:"Success",
            message : "Book added to cart",
        });
    } catch (error) {
        return res.status(500).json({message : "An error orcurred"});
    }
})
router.put("/remove-from-cart/:bookid", authenticateToken, async(req, res) => {
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);
        const isBookPresent = userData.cart.includes(bookid);

        await User.findByIdAndUpdate(id, {$pull : {cart:bookid},});
    
        return res.json({
            status:"Success",
            message : "Book removed from cart",
        });
    } catch (error) {
        return res.status(500).json({message : "An error orcurred"});
    }
})

router.get("/get-user-cart", authenticateToken, async(req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status : "Success",
            data : cart,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "An error occured"});
    }
})





export default router;