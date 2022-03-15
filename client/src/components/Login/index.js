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
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailerr, setEmailErr] = useState("");
	const [passerr, setPassErr] = useState("");
	const [isloading, setIsLoading] = useState(false);
	let navigate = useNavigate();
	const handleForm = async (e) => {
		setIsLoading(true);
		if (email === "" && password === "") {
			setIsLoading(false);
			setEmailErr("Email required");
			setPassErr("Password required");
		} else {
			const { data } = await axios.post("/api/login", {
				email,
				password,
			});

			if (data.isLoggedIn === true) {
				setIsLoading(false);
				navigate("/home");
				localStorage.setItem("token", data.token);
			} else {
				setIsLoading(false);
				if (data === "email not found") {
					setEmailErr("Email address doesn't exists");
				}
				if (data === "Invalid Password") {
					setPassErr("Invalid password");
				}
				if (data.errors.find((item, index) => item.param === "email")) {
					setEmailErr(
						data.errors.find((item, index) => item.param === "email").msg
					);
				}
				if (data.errors.find((item, index) => item.param === "password")) {
					setPassErr(
						data.errors.find((item, index) => item.param === "password").msg
					);
				}
			}
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
					<TextField
						required
						id="outlined-required"
						label="Email"
						helperText={emailerr !== "" ? emailerr : ""}
						error={emailerr !== "" ? true : false}
						value={email}
						onChange={handleEmail}
					/>

					<TextField
						required
						id="outlined-required"
						label="Password"
						helperText={passerr !== "" ? passerr : ""}
						error={passerr !== "" ? true : false}
						value={password}
						onChangeCapture={handlePass}
					/>

					{isloading ? (
						<Button
							variant="contained"
							sx={{
								backgroundColor: "#FBBC04",
								color: "white",
								"&:hover": {
									background: "#FBBC04",
								},
							}}
						>
							<CircularProgress size={25} sx={{ color: "white" }} />
						</Button>
					) : (
						<Button
							variant="contained"
							onClick={handleForm}
							sx={{
								backgroundColor: "#FBBC04",
								color: "white",
								"&:hover": {
									background: "#FBBC04",
								},
							}}
						>
							Login
						</Button>
					)}
					<Link to={"/"} style={{ textDecoration: "none" }}>
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
