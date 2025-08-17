import Razorpay from "razorpay";
import Order from "../models/order.model.js";
import Template from "../models/template.model.js"; // your template model
import crypto from "crypto";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const { templateId, price, biodataDetailsId } = req.body;

        // Fetch template details
        const templateData = await Template.findById(templateId);
        if (!templateData) return res.status(404).json({ message: "Template not found" });

        const options = {
            amount: price * 100, // in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        const newOrder = await Order.create({
            template: {
                id: templateData._id.toString(),
                name: templateData.name,
            },
            price,
            biodataDetailsId,
            razorpayOrderId: order.id,
        });

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Generate expected signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "paid" },
                { new: true }
            );
            res.json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({ razorpayOrderId: orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Return the order details
        res.status(200).json({
            success: true,
            message: "Order details fetched successfully",
            order: {
                template: order.template,
                price: order.price,
                status: order.status,
                createdAt: order.createdAt,
                razorpayOrderId: order.razorpayOrderId,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("template.id", "name");
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const deleteOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOneAndDelete({ razorpayOrderId: orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Validate status
        const validStatuses = ["created", "paid", "failed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const order = await Order.findOneAndUpdate(
            { razorpayOrderId: orderId },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
