import React from "react";
import { FormHelperText } from "@mui/material";
const errorComponent = ({ message }) => {
	return <FormHelperText error={true}>{message}</FormHelperText>;
};

export default errorComponent;
