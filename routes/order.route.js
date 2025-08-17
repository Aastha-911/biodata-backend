import express from "express";
import { createOrder, verifyOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-order", verifyOrder);

export default router;
