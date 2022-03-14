import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
	Stack,
	TextField,
	Button,
	Paper,
	CircularProgress,
	Typography,
} from "@mui/material";
import axios from "axios";
import ErrorComponent from "../error";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailerr, setEmailErr] = useState("");
	const [passerr, setPassErr] = useState("");
	const [isloading, setIsLoading] = useState(false);
	let navigate = useNavigate();
	const handleForm = (e) => {
		setIsLoading(true);
		if (email === "" && password === "") {
			setIsLoading(false);
			setEmailErr("Email should not be empty");
			setPassErr("Password should not be empty");
		} else {
			axios
				.post("/api/login", {
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
	};
	if (localStorage.getItem("token")) {
		return <Navigate to="/home" />;
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				marginTop: "10%",
			}}
		>
			<Paper ishovered={5} className="signup-container">
				<Stack spacing={2}>
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
							onChangeCapture={handlePass}
						/>
					)}
					{isloading ? (
						<Button variant="outlined">
							<CircularProgress size={25} />
						</Button>
					) : (
						<Button variant="outlined" onClick={handleForm} loading>
							Login
						</Button>
					)}
					<Link to={"/"} style={{textDecoration:'none'}}>
						<Typography color="#FBBC04" textAlign="center">
							Click here to Register If you have haven't
						</Typography>
					</Link>
				</Stack>
			</Paper>
		</div>
	);
};

export default Login;
