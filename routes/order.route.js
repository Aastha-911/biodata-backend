import express from "express";
import {
    createOrder,
    verifyOrder,
    getAllOrders,
    getOrderDetails,
    deleteOrderById,
    updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-order", verifyOrder);
router.post("/get-all-orders", getAllOrders);
router.post("/get-order-details", getOrderDetails);
router.post("/delete", deleteOrderById);
router.post("/update-status", updateOrderStatus);

export default router;
