import React from "react";
import { InputBase, Typography } from "@mui/material";
import "./note.css";
const ContentText = ({ isedit, content, setContent, note }) => {
	return (
		<div>
			{isedit ? (
				<InputBase
					className="content-input-edit"
					placeholder="Enter content"
					inputProps={{ "aria-label": "note content" }}
					multiline={true}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			) : (
				<Typography
					sx={{
						overflowWrap: "break-word",
						fontFamily: "Roboto Mono",
					}}
					variant="body1"
				>
					{note.content}
				</Typography>
			)}
		</div>
	);
};

export default ContentText;
