import { assignBadgeToUser } from "../services/userService.js";

export const assignBadge = async (req, res) => {
  const { userId, badge } = req.body; 
  if (!userId || !badge) {
    return res.status(400).json({ error: "User ID and badge are required" });
  }

  const result = await assignBadgeToUser(userId, badge);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.message });
  }
};
