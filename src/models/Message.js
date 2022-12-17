import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    email: {type: String, required: true},
    content: {type: String, required: true}
},
{
    timestamps: true
});

export const MessageModel = mongoose.model("Message", MessageSchema);