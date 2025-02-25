import express from "express"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import Joi from "joi"
import jwt from "jsonwebtoken"
import checkUserAuth from "../middlewares/checkUserAuth.js"

const userRouter = express.Router()

// Signup Route
userRouter.post("/api/signup", async (req, res) => {
	try {
		// Request data validation check
		const schema = Joi.object().keys({
			username: Joi.string().alphanum().min(3).max(50).required(),
			email: Joi.string().email().required(),
			password: Joi.string()
				.pattern(
					new RegExp(
						"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[\\S]{8,}$"
					)
				)
				.required(),
		})
		const { error, value } = schema.validate(req.body)
		if (error) return res.status(400).json({ error: error.details[0].message })

		// Destructure the request data
		const { username, email, password } = value // TODO: bcrypt leaks memory find fix later
		// Check if user(email) already exists
		const existingUserByEmail = await User.findOne({ email: email })
		if (existingUserByEmail) {
			return res.status(409).json({ error: "Email already exists!" })
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(
			password,
			parseInt(process.env.BCRYPT_SALT_ROUND) || 10
		)
		const userData = new User({
			username: username,
			email: email,
			password: hashedPassword,
		})

		// Save the data to db
		await userData.save()
		res.status(201).json({ message: "User created successfully!" })
	} catch (err) {
		console.log(err)
		res
			.status(500)
			.json({ error: "Internal Server Error", details: err.message })
	}
})

// Login route
userRouter.post("/api/login", async (req, res) => {
	try {
		// Request data validation
		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string()
				.pattern(
					new RegExp(
						"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[\\S]{8,}$"
					)
				)
				.required(),
		})
		const { error, value } = schema.validate(req.body)
		if (error) return res.status(400).json({ error: error.details[0].message })

		// Destructure the request data
		const { email, password } = value // TODO: bcrypt leaks memory find fix later
		// Search the user by email
		const existingUserByEmail = await User.findOne({ email: email })
		if (!existingUserByEmail)
			return res.status(401).json({ error: "Invalid email or password!" })

		// Compare the hashed password with request password
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUserByEmail.password
		)
		if (!isPasswordCorrect)
			return res.status(401).json({ error: "Invalid email or password!" })

		// Setup JWT token in cookie
		const payload = {
			id: existingUserByEmail._id,
		}
		const token = jwt.sign(payload, process.env.JWT_AUTH_SECRET, {
			expiresIn: "1y",
		})
		res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json({ message: "Login successfully! " + existingUserByEmail.username })
	} catch (err) {
		res.json({ error: err })
	}
})

// Logout route
userRouter.post("/api/logout", (req, res) => {
	try {
		res.clearCookie("access_token")
		res.json({ message: "Logout Successfully!" })
	} catch (err) {
		res.json({ error: err })
	}
})

userRouter.post("/api/user/edit", checkUserAuth, (req, res) => {
	res.json({ message: "Secure route accessed!" })
})

export default userRouter
