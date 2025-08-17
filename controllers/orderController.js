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

