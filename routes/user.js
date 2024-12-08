import { Router } from "express";
import authenticateToken from "../controller/authController.js";
import { getUserInformation, signInReq, signUpReq, updateAddress } from "../controller/userController.js";

const router = Router();

router.post('/sign-up', signUpReq);

router.post('/sign-in', signInReq);

router.get("/get-user-information", authenticateToken, getUserInformation);

router.put("/update-address", authenticateToken, updateAddress);


export default router;