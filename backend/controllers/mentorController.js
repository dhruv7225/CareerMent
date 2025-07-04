import User from "../models/user.model.js";


export const searchMentors = async (req, res) => {
    try {
        
        console.log(req.query)

        const mentors = await User.find(req.query);
        if (mentors) {
            return res.status(200).json(mentors);
        } else {
            return res.status(404).json({ message: "No mentors found" });
        }
    } catch (error) {
        console.error("Error searching mentors:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

