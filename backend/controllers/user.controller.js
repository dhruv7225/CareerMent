import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getSuggestedConnections = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user._id).select("connections");

		// find users who are not already connected, and also do not recommend our own profile!! right?
		const suggestedUser = await User.find({})
			

		res.json(suggestedUser);
	} catch (error) {
		console.error("Error in getSuggestedConnections controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getPublicProfile = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username }).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		console.error("Error in getPublicProfile controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getMentorProfile = async(req,res) =>{
	try {
		console.log(req.params.username);
		
		const mentor = await User.findOne({ username: req.params.username }).select("-password");

		if (!mentor) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(mentor);
	} catch (error) {
		console.error("Error in getPublicProfile controller:", error);
		res.status(500).json({ message: "Server error" });
	}
}

export const updateProfile = async (req, res) => {
	try {
		const allowedFields = [
			"name",
			"username",
			"headline",
			"about",
			"location",
			"profilePicture",
			"bannerImg",
			"skills",
			"experience",
			"education",
			"availability"
		];

		const updatedData = {};

		for (const field of allowedFields) {
			if (req.body[field]) {
				updatedData[field] = req.body[field];
			}
		}

		if (req.body.profilePicture) {
			const result = await cloudinary.uploader.upload(req.body.profilePicture);
			updatedData.profilePicture = result.secure_url;
		}

		if (req.body.bannerImg) {
			const result = await cloudinary.uploader.upload(req.body.bannerImg);
			updatedData.bannerImg = result.secure_url;
		}

		const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true }).select(
			"-password"
		);

		res.json(user);
	} catch (error) {
		console.error("Error in updateProfile controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const searchUser = async (req, res) => {
	const query = req.query.q;
	if (!query) {
	  return res.status(400).json({ error: 'Search query is required' });
	}
  
	try {
	  // MongoDB example
	  const results = await User.findOne({ username: query })

	console.log("hi" + results);
		
	  res.json(results);
	} catch (error) {
		  console.error('Error fetching search results:', error);
	  res.status(500).json({ error: 'Internal server error' });
	}
}