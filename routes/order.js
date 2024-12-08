import { Router } from "express";
import { getAllOrders, orderHistory, placeOrder, updateStatus } from "../controller/orderController.js";
import authenticateToken from "../controller/authController.js";


const router = Router();

router.post("/place-order",authenticateToken, placeOrder);

router.get("/order-history", authenticateToken, orderHistory);

router.get("/get-all-orders", authenticateToken, getAllOrders);

router.put("/update-status/:id", authenticateToken, updateStatus);


export default router;