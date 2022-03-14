import React from "react";
import { Paper, Box, Skeleton } from "@mui/material";
const Loader = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				border: "1px solid #DDDDDD",
				borderRadius: "7px",
				width: "20%",
				height: "auto",
				padding: "5px",
			}}
		>
			<Skeleton
				animation="wave"
				sx={{ paddingBottom: "10px", marginBottom: "5px" }}
			/>
			<Skeleton animation="wave" sx={{ paddingBottom: "40px" }} />
		</Paper>
	);
};

export default Loader;
