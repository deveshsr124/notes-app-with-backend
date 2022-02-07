import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button } from "@mui/material";
import axios from "axios";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();
	const handleForm = (e) => {
		axios
			.post("/api/login", {
				email,
				password,
			})
			.then((data) => {
				if (data.data.isLoggedIn === true) {
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
				marginTop: "10%",
			}}
		>
			<Stack spacing={2}>
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
					Submit
				</Button>
			</Stack>
		</div>
	);
};

export default Login;
