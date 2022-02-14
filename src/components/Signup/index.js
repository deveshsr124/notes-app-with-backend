import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import "./signup.css";
const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();
	const handleForm = (e) => {
		e.preventDefault();
		axios
			.post("/api/register", {
				name,
				email,
				password,
			})
			.then((data) => {
				if (data.data.isLoggedIn === true) {
					localStorage.setItem("token", data.data.token);
					navigate("/home");
				} else {
					console.log("not authorized");
				}
			});
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
			<Paper isHovered={5} className="signup-container">
				<Stack spacing={2}>
					<TextField
						required
						id="outlined-required"
						label="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						required
						id="outlined-required"
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						required
						id="outlined-required"
						label="Password"
						value={password}
						onChangeCapture={(e) => setPassword(e.target.value)}
					/>
					<Button variant="contained" onClick={handleForm}>
						Register
					</Button>
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
