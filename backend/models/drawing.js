import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/team-cors", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const DrawingSchema = new mongoose.Schema({
    instruction: { type: String , required: true},
    roomId: { type: String, required: true },
    round: { type: Number, required: true },
    username: { type: String, required: true },
    strokes: { type: Array, required: true }
})

const Drawing = mongoose.model("Drawing", DrawingSchema);

export default Drawing;