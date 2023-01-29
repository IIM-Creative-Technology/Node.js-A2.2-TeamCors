import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`)

const RoomSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: {
        type: Array,
    }
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
