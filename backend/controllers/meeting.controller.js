import { log } from "console";
import Meeting from "../models/meeting.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { fileURLToPath } from "url";

export const createMeeting = async (req, res) => {
	try {
		const  { mentorName, studentName,meetingName,date,time,meetingId } = req.body;
		let	newMeeting = new Meeting({
				mentorName: mentorName,
				studentName: studentName,
				createBy: req.user._id,
                meetingId: meetingId,
                meetingName: meetingName,
                date,
                time
			});
		await newMeeting.save();
        res.status(201).json(newMeeting);

	} catch (error) {
		console.error("Error in create Meeting controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
export const myMeetings = async (req, res) => {
	try {
	  if (!req.user || !req.user._id) {
		return res.status(400).json({ message: "User not authenticated" });
	  }
	  const id = req.params.id
	  const user = await User.findOne({_id : id})
	
	const filterField = user.mentor  ? "mentorName" : "studentName";
const requests = await Meeting.find({ [filterField]: user.username  });
			
	res.json(requests);
	
	} catch (error) {
	  console.error("Error in get meetings controller:", error);
	  res.status(500).json({ message: "Server error" });
	}
  };
  
  // DELETE
  export const deleteMeeting = async (req, res) => {
	try {
	  const { meetingId } = req.params;
	  const deleted = await Meeting.findOneAndDelete({ meetingId }); // better
	  if (!deleted) {
		return res.status(404).json({ message: "Meeting not found" });
	  }
	  res.status(200).json({ message: "Meeting deleted successfully" });
	} catch (err) {
	  console.error("Delete error:", err);
	  res.status(500).json({ error: "Failed to delete meeting" });
	}
  };
  
  
  // UPDATE
  export const updateMeeting = async (req, res) => {
	try {
	  const { meetingId } = req.params;
	  const updatedData = req.body;
	  const updated = await Meeting.findOneAndUpdate(
		{ meetingId },
		updatedData,
		{ new: true }
	  );
	  if (!updated) {
		return res.status(404).json({ message: "Meeting not found" });
	  }
	  res.status(200).json(updated);
	} catch (err) {
	  console.error("Update error:", err);
	  res.status(500).json({ error: "Failed to update meeting" });
	}
  };
  
  