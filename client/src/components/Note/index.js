import React, { useState } from "react";
import { Paper, Box, ClickAwayListener, Fade } from "@mui/material";
import "./note.css";
import Toolbar from "../toolbar";
import ContentTitle from "./ContentTitle";
import ContentText from "./ContentText";
import axios from "axios";
const Note = ({ note, dispatch, id }) => {
	const [ishovered, setIsHovered] = useState(false);
	const [isedit, setIsEdit] = useState(false);
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);
	const [editmode, setEditMode] = useState(false);
	const handleClickAway = async () => {
		setEditMode(false);
		setIsEdit(false);
		dispatch({
			type: "EDIT_NOTE",
			payload: {
				id,
				title,
				content,
			},
		});
		const { data } = await axios.patch(
			`/api/update-notes/${id}`,
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
			} else {
				console.log("not updated");
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleTitleChange = (e) => {
		setTitle(e.target.value);
		if (e.target.value === "") {
			setEditMode(false);
		} else {
			setEditMode(true);
		}
	};
	const handleContentChange = (e) => {
		setContent(e.target.value);
		if (e.target.value === "") {
			setEditMode(false);
		} else {
			setEditMode(true);
		}
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
					<ClickAwayListener
						onClickAway={editmode ? handleClickAway : () => {}}
					>
						<div onClick={() => setIsEdit(true)}>
							<div>
								<ContentTitle
									isedit={isedit}
									title={title}
									handleTitleChange={handleTitleChange}
									note={note}
								/>
								<ContentText
									isedit={isedit}
									content={content}
									handleContentChange={handleContentChange}
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
