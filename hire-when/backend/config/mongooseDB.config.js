import mongoose from "mongoose"
import "dotenv/config"
const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGODB_URL)
		console.log("Success: Mongoose connected successfully!")
	} catch (err) {
		console.log(err.message)
	}
}
export default connectDB
