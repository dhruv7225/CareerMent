import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import meetingRoutes from "./routes/meeting.route.js"
import mentorsRoutes from "./routes/mentorRoutes.js"
import "./lib/websocket_server.js"
import { connectDB } from "./lib/db.js";
import { Server } from 'socket.io';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
}

app.use(express.json({ limit: "5mb" })); 
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);
app.use("/api/v1/meeting", meetingRoutes);
app.use("/api/v1/mentors", mentorsRoutes  );

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	connectDB();
});

let skillsData = [];
let questionAnswers = [];

app.post('/skills', (req, res) => {
  const { selectedSkills, documents } = req.body;
  if (!selectedSkills || selectedSkills.length === 0) {
    return res.status(400).send('Skills data is required.');
  }
  if (!documents || documents.some((doc) => !doc.name || !doc.link)) {
    return res.status(400).send('Valid documents are required.');
  }
  skillsData.push({ id: skillsData.length + 1, skills: selectedSkills, documents });
  res.status(200).send('Skills and documents saved successfully.');
});

app.post('/questions', (req, res) => {
  const { answers } = req.body;
  if (!answers || Object.keys(answers).length === 0) {
    return res.status(400).send('Answers are required.');
  }
  questionAnswers.push({ id: questionAnswers.length + 1, answers });
  res.status(200).send('Answers saved successfully.');
});

app.post('/api/v1/mentee-referrals', async (req, res) => {
	const { menteeName, skills, description, challenges } = req.body;
	try {
	  const referral = new MenteeReferral({ menteeName, skills, description, challenges });
	  await referral.save();
	  res.status(201).json({ message: 'Mentee referred successfully!' });
	} catch (error) {
	  console.error('Error referring mentee:', error);
	  res.status(500).json({ message: 'Failed to refer mentee.' });
    }
  });

  app.post('/api/v1/submit-feedback', (req, res) => {
	console.log('Feedback Received:', req.body);
	res.json({ message: 'Feedback submitted successfully!' });
  });
  