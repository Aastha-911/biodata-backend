import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "template",
        required: true,
    },
    price: { type: Number, required: true },
    biodataDetailsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bioDataDetails",
        required: true
    },
    razorpayOrderId: { type: String, required: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
