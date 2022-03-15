import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
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
const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailerr, setEmailErr] = useState("");
	const [passerr, setPassErr] = useState("");
	const [nameerr, setNameErr] = useState("");
	const [isloading, setIsLoading] = useState(false);
	let navigate = useNavigate();
	const handleForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (email === "" && password === "" && name === "") {
			setIsLoading(false);
			setEmailErr("Email required");
			setPassErr("Password required");
			setNameErr("Name Required");
		} else {
			const { data } = await axios.post("/api/register", {
				name,
				email,
				password,
			});
			if (data === "email already exists") {
				setEmailErr("Email already exists");
			}
			if (data.isLoggedIn === true) {
				setIsLoading(false);
				navigate("/home");
				localStorage.setItem("token", data.token);
			} else {
				setIsLoading(false);
				if (data.errors.find((item, index) => item.param === "name")) {
					setPassErr(
						data.errors.find((item, index) => item.param === "name").msg
					);
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
		// if (e.target.value.length < 8) {
		// 	setPassErr("Password length must be atleast 8 Characters");
		// 	if (e.target.value === "") {
		// 		setPassErr("");
		// 	}
		// }
	};
	const handleName = (e) => {
		setName(e.target.value);
		setNameErr("");
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
				marginTop: "8%",
			}}
		>
			<Paper ishovered={5} className="signup-container">
				<Stack spacing={2}>
					<TextField
						required
						id="outlined-required"
						label="Name"
						helperText={nameerr !== "" ? nameerr : ""}
						error={nameerr !== "" ? true : false}
						value={name}
						onChange={handleName}
					/>

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
						onChange={handlePass}
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
							sx={{
								backgroundColor: "#FBBC04",
								color: "white",
								"&:hover": {
									background: "#FBBC04",
								},
							}}
							onClick={handleForm}
						>
							Register
						</Button>
					)}
					<Link to={"/login"} style={{ textDecoration: "none" }}>
						<Typography color="#FBBC04" textAlign="center">
							Click here to Login
						</Typography>
					</Link>
				</Stack>
			</Paper>
		</div>
	);
};

export default Register;
