import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/team-cors', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

const model = mongoose.model('UserSchema', UserSchema)

export default model;