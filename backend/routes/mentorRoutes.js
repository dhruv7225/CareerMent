
import express from "express";
import { searchMentors } from "../controllers/mentorController.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// console.log("backend route");
router.get("/search", protectRoute, searchMentors);
export default router;
