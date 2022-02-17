import React from "react";
import { InputBase, Button, Box } from "@mui/material";
import "./textbox.css";
import axios from "axios";
const NotesCreate = ({
	setInFocus,
	title,
	content,
	setContent,
	dispatch,
	setTitle,
}) => {
	const createNote = async () => {
		const { data } = await axios.post(
			"/api/create-notes",
			{
				title: title,
				content: content,
			},
			{
				headers: {
					withCredentials: true,
				},
			}
		);
		try {
			if (data.status === 200) {
				dispatch({
					type: "CREATE_NOTE",
					title: data.data.title,
					content: data.data.content,
				});
				setTitle("");
				setContent("");
				setInFocus(false);
			} else {
				console.log("error");
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div
			style={{
				width: "500px",
				height: "100%",
				//border: "1px solid black",
				textAlign: "left",
				padding: "5px",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<InputBase
				className="content-input"
				placeholder="Enter content"
				inputProps={{ "aria-label": "note content" }}
				multiline={true}
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<Box display="flex" justifyContent="right" mt="10px" width="95%">
				{title !== "" || content !== "" ? (
					<Button
						variant="contained"
						sx={{
							width: "100px",
							marginRight: "10px",
							backgroundColor: "#FBBC04",
							fontWeight: "bold",
							"&:hover": {
								background: "#FBBC04",
							},
						}}
						onClick={createNote}
					>
						Add
					</Button>
				) : (
					<Button
						variant="contained"
						disabled
						sx={{
							width: "100px",
							marginRight: "10px",
							fontWeight: "bold",
						}}
					>
						Add
					</Button>
				)}
				<Button
					variant="outlined"
					sx={{
						width: "100px",
						color: "#FBBC04",
						fontWeight: "bold",
						borderColor: "#FBBC04",
						"&:hover": {
							background: "white",
							color: "#FBBC04",
							borderColor: "#FBBC04",
						},
					}}
					onClick={() => {
						setInFocus(false);
						setTitle("");
						setContent("");
					}}
				>
					Cancel
				</Button>
			</Box>
		</div>
	);
};

export default NotesCreate;
