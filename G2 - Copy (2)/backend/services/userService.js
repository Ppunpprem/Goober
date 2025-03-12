// In your userService.js (or similar file)
import { User } from "../models/User.js"; // Adjust path as needed

export const assignBadgeToUser = async (userId, badge) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Add the badge to the user's badges array if not already added
    if (!user.badges.includes(badge)) {
      user.badges.push(badge);
      await user.save();
      return { success: true, message: `Badge "${badge}" assigned successfully.` };
    }

    return { success: false, message: "Badge already assigned" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
