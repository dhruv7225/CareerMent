import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
    createMeeting,
    myMeetings
} from "../controllers/meeting.controller.js";
import { deleteMeeting, updateMeeting } from "../controllers/meeting.controller.js";


const router = express.Router();

//router.get("/", protectRoute, getFeedPosts);
router.post("/create", protectRoute, createMeeting);
router.get("/:id/all",protectRoute, myMeetings);

router.delete("/:meetingId", deleteMeeting);
router.put("/:meetingId", updateMeeting);

// router.delete("/delete/:id", protectRoute, deletePost);
// router.get("/:id", protectRoute, getPostById);

export default router;
