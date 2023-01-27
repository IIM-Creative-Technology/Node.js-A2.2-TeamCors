import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/gartic-phone')

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
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
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
