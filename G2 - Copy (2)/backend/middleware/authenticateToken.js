import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Extract token from "Authorization: Bearer <token>"

    if (!token) {
        return res.status(401).json({ msg: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = decoded.userId; 
        next(); 
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};

export default authenticateToken; 
