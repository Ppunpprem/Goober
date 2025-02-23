import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Import auth middleware

const router = express.Router();

// Example protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ msg: "This is a protected route" });
});

export default router;
