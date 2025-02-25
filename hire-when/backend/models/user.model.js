import mongoose from "mongoose"

// Create and define user schema
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			immutable: true,
			trim: true,
		},
		email: {
			// TODO: add regex validation in route level
			type: String,
			required: true,
			lowercase: true,
			immutable: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

// Create User model
const User = mongoose.model("User", userSchema)
export default User
