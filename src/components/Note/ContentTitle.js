import React from "react";
import { InputBase, Typography } from "@mui/material";
import "./note.css";
const ContentTitle = ({ isedit, title, setTitle, note }) => {
	return (
		<div>
			{isedit ? (
				<InputBase
					className="title-input-edit"
					placeholder="Enter title"
					inputProps={{ "aria-label": "note title" }}
					multiline={true}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			) : (
				<Typography
					varian="subtitle1"
					sx={{
						fontWeight: "bold",
						paddingBottom: "5px",
						fontFamily: "Roboto Mono",
						overflowWrap: "break-word",
					}}
				>
					{note.title}
				</Typography>
			)}
		</div>
	);
};

export default ContentTitle;
