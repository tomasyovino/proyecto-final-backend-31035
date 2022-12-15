import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    products: {type: Array, required: true, max: 100},
    orderNumber: {type: Number, required: true},
    createdAt: {type: Date},
    state: {type: String},
    userEmail: {type: String, required: true},
});

export const OrderModel = mongoose.model("Order", OrderSchema);