import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Stack,
	TextField,
	Button,
	Paper,
	Typography,
	CircularProgress,
} from "@mui/material";
import axios from "axios";
import "./signup.css";
import ErrorComponent from "../error";
const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailerr, setEmailErr] = useState("");
	const [passerr, setPassErr] = useState("");
	const [nameerr, setNameErr] = useState("");
	const [isloading, setIsLoading] = useState(false);
	let navigate = useNavigate();
	const handleForm = (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (email === "" && password === "") {
			setIsLoading(false);
			setEmailErr("Email should not be empty");
			setPassErr("Password should not be empty");
			setNameErr("Name should not be empty ");
		} else {
			axios
				.post("/api/register", {
					name,
					email,
					password,
				})
				.then((data) => {
					setIsLoading(false);
					if (data.data.isLoggedIn === true) {
						localStorage.setItem("token", data.data.token);
						navigate("/home");
					} else {
						setPassErr(data.data);
					}
				});
		}
	};
	const handleEmail = (e) => {
		setEmail(e.target.value.replace(/ /g, ""));
		setEmailErr("");
	};
	const handlePass = (e) => {
		setPassword(e.target.value.replace(/ /g, ""));
		setPassErr("");
		if (e.target.value.length < 8) {
			setPassErr("Password length must be atleast 8 Characters");
			if (e.target.value === "") {
				setPassErr("");
			}
		}
	};
	const handleName = (e) => {
		setName(e.target.value);
		setNameErr("");
	};
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				marginTop: "8%",
			}}
		>
			<Paper ishovered={5} className="signup-container">
				<Stack spacing={2}>
					{nameerr !== "" ? (
						<ErrorComponent
							helperText={nameerr}
							value={name}
							onChange={handleName}
						/>
					) : (
						<TextField
							required
							id="outlined-required"
							label="Name"
							value={name}
							onChange={handleName}
						/>
					)}
					{emailerr !== "" ? (
						<ErrorComponent
							helperText={emailerr}
							value={email}
							onChange={handleEmail}
						/>
					) : (
						<TextField
							required
							id="outlined-required"
							label="Email"
							value={email}
							onChange={handleEmail}
						/>
					)}
					{passerr !== "" ? (
						<ErrorComponent
							helperText={passerr}
							value={password}
							onChange={handlePass}
						/>
					) : (
						<TextField
							required
							id="outlined-required"
							label="Password"
							value={password}
							onChange={handlePass}
						/>
					)}

					{isloading ? (
						<Button variant="outlined">
							<CircularProgress size={25} />
						</Button>
					) : (
						<Button variant="outlined" onClick={handleForm}>
							Register
						</Button>
					)}

					<Typography
						fontWeight="bold"
						color="#FBBC04"
						textAlign="center"
						sx={{ cursor: "pointer" }}
						onClick={() => {
							navigate("/login");
						}}
					>
						Click here to Login
					</Typography>
				</Stack>
			</Paper>
		</div>
	);
};

export default Register;
