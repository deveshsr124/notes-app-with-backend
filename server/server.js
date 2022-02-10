import express, { json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
// import router
import authRouter from "./Router/authRouter.js";
import notesRouter from "./Router/notesRouter.js";
const app = express();
const PORT = 3001;

config();
// connect with mongodb database
mongoose.connect(
	"mongodb+srv://devesh:devesh124@cluster0.clpvp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	() => console.log("connected to db")
);

//middlewares
app.use(json());
// you can use the router here like this
app.use("/api", authRouter);

app.use("/api", notesRouter);

// server config
app.listen(PORT, () => {
	console.log(`server is running at ${PORT}`);
});
