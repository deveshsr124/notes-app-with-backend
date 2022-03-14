import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import axios from "axios";
const Toolbar = ({ dispatch, id, title, content }) => {
	const [load, setIsLoad] = useState(false);
	const deleteNote = async () => {
		setIsLoad(true);
		const { data } = await axios.delete(
			`/api/delete-note/${id}`,
			{},
			{
				headers: {
					withCredentials: true,
				},
			}
		);
		try {
			if (data.status === 200) {
				setIsLoad(false);
				dispatch({
					type: "DELETE_NOTE",
					payload: id,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<Box
				sx={{
					display: "flex",
					justifyContent: "right",

					cursor: "pointer",
				}}
			>
				{load ? (
					<CircularProgress size={22} sx={{ color: "black" }} />
				) : (
					<DeleteOutlined sx={{ fontSize: "22px" }} onClick={deleteNote} />
				)}
			</Box>
		</div>
	);
};

export default Toolbar;
