import jwt from "jsonwebtoken";

const checkUserAuth = (req, res, next) => {
  // Access the accessToken from request headers
  const token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers.authorization);
  // Check if no cookie is present
  if (!token) return res.status(401).json({ error: "Token not found!" });

  // Validate the available cookie with JWT secret
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token!" });
    req.user = user;
    console.log(req.user.id); // TODO: remove this line later
    next();
  });
};

export default checkUserAuth;
