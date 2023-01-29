import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const DrawingSchema = new mongoose.Schema({
    instruction: { type: String , required: true},
    roomId: { type: String, required: true },
    round: { type: Number, required: true },
    username: { type: String, required: true },
    strokes: { type: Array, required: true }
})

const Drawing = mongoose.model("Drawing", DrawingSchema);

export default Drawing;