import express, { json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
// import router
import authRouter from "./Router/authRouter.js";
import notesRouter from "./Router/notesRouter.js";
const app = express();
const PORT = 3001;

config();
// connect with mongodb database
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db"));

//middlewares
app.use(json());
app.use(cors());
// you can use the router here like this
app.use("/api", authRouter);

app.use("/api", notesRouter);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build"));
});
// server config
app.listen(PORT, () => {
	console.log(`server is running at ${PORT}`);
});
