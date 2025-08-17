import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    template: {
        id: { type: String, required: true },
        name: { type: String, required: true },
    },
    price: { type: Number, required: true },
    biodataDetailsId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
