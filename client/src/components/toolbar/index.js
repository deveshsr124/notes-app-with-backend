import React from "react";
import { Box } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import axios from "axios";
const Toolbar = ({ dispatch, id, title, content }) => {
	const deleteNote = async () => {
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
			data.status === 200
				? dispatch({
						type: "DELETE_NOTE",
						payload: id,
				  })
				: console.log("error occured ");
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
				<DeleteOutlined sx={{ fontSize: "22px" }} onClick={deleteNote} />
			</Box>
		</div>
	);
};

export default Toolbar;
