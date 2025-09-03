import express from "express";
import {
  createOrder,
  verifyOrder,
  getAllOrders,
  getOrderDetails,
  deleteOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-order", verifyOrder);
router.get("/get-all-orders", authenticateToken, getAllOrders);
router.post("/get-order-details", authenticateToken, getOrderDetails);
router.post("/delete", authenticateToken, deleteOrderById);
router.post("/update-status", authenticateToken, updateOrderStatus);

export default router;
