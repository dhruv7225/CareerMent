import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
	{
		createBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		mentorName: {type: String, required: true },
		studentName: {type: String, required: true },
		meetingId: { type: String, required: true, unique:true },
		meetingName: { type: String, required: true },
        date: {type: String, required: true},
        time: {type: String, required: true},
	},
	{ timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
