import React from "react";
import { Box } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
const Toolbar = ({ dispatch, id, title, content }) => {
	return (
		<div>
			<Box
				sx={{
					display: "flex",
					justifyContent: "right",

					cursor: "pointer",
				}}
			>
				<DeleteOutlined
					sx={{ fontSize: "22px" }}
					onClick={() => {
						dispatch({
							type: "DELETE_NOTE",
							payload: id,
						});
					}}
				/>
			</Box>
		</div>
	);
};

export default Toolbar;
