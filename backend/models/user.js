import mongoose from "mongoose";

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

const User = mongoose.model('User', UserSchema)

export default User;