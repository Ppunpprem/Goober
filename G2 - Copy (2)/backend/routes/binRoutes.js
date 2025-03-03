import express from "express";

const router = express.Router();
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Auth route to check if the server is working
router.get("/", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

export default router;
