import React from "react";
import { TextField } from "@mui/material";
const errorComponent = ({ helperText, value, onChange }) => {
	return (
		<TextField
			error
			id="outlined-error-helper-text"
			helperText={helperText}
			value={value}
			onChange={onChange}
		/>
	);
};

export default errorComponent;
