import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		mentor: {type: Boolean, default: false},
		profilePicture: {
			type: String,
			default: "",
		},
		bannerImg: {
			type: String,
			default: "",
		},
		headline: {
			type: String,
			default: "",
		},
		location: {
			type: String,
			default: "Earth",
		},
		about: {
			type: String,
			default: "",
		},
		skills: [String],
		experience: [
			{
				title: String,
				company: String,
				startDate: Date,
				endDate: Date,
				description: String,
			},
		],
		education: [
			{
				school: String,
				fieldOfStudy: String,
				startYear: Number,
				endYear: Number,
			},
		],
		connections: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		availability: [
			{
				date: {
					type: Date,
					required: true,
				},
				timeSlots: [
					{
						startTime: {
							type: String, // Use ISO 8601 format like "09:00"
							required: true,
						},
						booked:{
							type: Boolean,
							required: true,
							default: false,
						}
						// endTime: {
						// 	type: String, // Use ISO 8601 format like "10:00"
						// 	required: true,
						// },
					},
				],
			},
		],
		
	},
	{ timestamps: true }
);

userSchema.index({ username: 'text' });

const User = mongoose.model("User", userSchema);

export default User;
