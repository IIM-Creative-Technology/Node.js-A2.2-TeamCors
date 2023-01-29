import mongoose from "mongoose";
import User from "../routes/user.js";
mongoose.connect('mongodb://localhost:27017/gartic-phone')

const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
