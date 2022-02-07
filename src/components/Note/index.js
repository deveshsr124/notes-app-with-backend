import React, { useState } from "react";
import { Paper, Box, ClickAwayListener, Fade } from "@mui/material";
import "./note.css";
import Toolbar from "../toolbar";
import ContentTitle from "./ContentTitle";
import ContentText from "./ContentText";
const Note = ({ note, dispatch, id }) => {
	const [ishovered, setIsHovered] = useState(false);
	const [isedit, setIsEdit] = useState(false);
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);
	const handleClickAway = () => {
		setIsEdit(false);
		dispatch({
			type: "EDIT_NOTE",
			payload: {
				id,
				title,
				content,
			},
		});
	};
	return (
		<div>
			<Paper
				className="note-container"
				onMouseOver={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				elevation={ishovered ? 3 : 0}
				sx={{
					border: ishovered ? "" : "1px solid #DDDDDD",
					borderRadius: "7px",
				}}
			>
				<Box sx={{ padding: "5px" }}>
					<ClickAwayListener onClickAway={handleClickAway}>
						<div onClick={() => setIsEdit(true)}>
							<div>
								<ContentTitle
									isedit={isedit}
									title={title}
									setTitle={setTitle}
									note={note}
								/>
								<ContentText
									isedit={isedit}
									content={content}
									setContent={setContent}
									note={note}
								/>
							</div>
						</div>
					</ClickAwayListener>
				</Box>
				<Fade in={ishovered || isedit}>
					<div>
						<Toolbar
							dispatch={dispatch}
							id={id}
							title={title}
							content={content}
						/>
					</div>
				</Fade>
			</Paper>
		</div>
	);
};

export default Note;
