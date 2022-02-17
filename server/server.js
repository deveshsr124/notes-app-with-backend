import express, { json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
// import router
import authRouter from "./Router/authRouter.js";
import notesRouter from "./Router/notesRouter.js";
const app = express();
const PORT = process.env.PORT ||3001;

config();
// connect with mongodb database
mongoose
	.connect(process.env.DB_CONNECT)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`mongoDb connected and server has been started at ${PORT}`);
		}); 
	})
	.catch((err) => console.log("error in connecting in db"));

//middlewares
app.use(json());
app.use(cors());
// you can use the router here like this
app.use("/api", authRouter);

app.use("/api", notesRouter);
//serving the build folder
app.use(express.static("../build"));
// server config

app.get("*", (req, res) => {
	res.redirect("/");
});

app.use((req, res) => {
	res.status(404).send("404 page found");
});
