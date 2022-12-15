import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    email: {type: String, required: true},
    type: {type: Boolean},
    dateAndTime: {type: Date, required: true},
    content: {type: String, required: true}
});

export const MessageModel = mongoose.model("Message", MessageSchema);