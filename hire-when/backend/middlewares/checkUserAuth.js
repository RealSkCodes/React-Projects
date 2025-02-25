import jwt from "jsonwebtoken"

const checkUserAuth = (req, res, next) => {
	// Access the cookie from request
	const token = req.cookies?.access_token

	// Check if no cookie is present
	if (!token) return res.status(401).json({ error: "Token not found!" })

	// Validate the available cookie with JWT secret
	jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, user) => {
		if (err) return res.status(401).json({ error: "Invalid token!" })
		req.user = {
			id: user,
		}
		next()
	})
}

export default checkUserAuth
