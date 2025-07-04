import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, getPublicProfile, updateProfile,searchUser,getMentorProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);
router.put("/profile", protectRoute, updateProfile);
router.get("/search",protectRoute,searchUser)
// router.get("/mentor/:username",protectRoute,getMentorProfile)

export default router;
