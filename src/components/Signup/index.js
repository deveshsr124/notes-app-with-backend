import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import axios from "axios";
const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleForm = (e) => {
		e.preventDefault();
		axios
			.post("/api/register", {
				name,
				email,
				password,
			})
			.then((data) => console.log(data));
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
			</Stack>
		</div>
	);
};

export default Register;
