import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

const User = mongoose.model('User', UserSchema)

export default User;