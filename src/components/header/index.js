import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import {
	Box,
	// InputBase,
	IconButton,
	// Snackbar,
	// ClickAwayListener,
	// Icon,
	Typography,
	AppBar,
	Toolbar,
	Popover,
} from "@mui/material";
// import { LightMode } from "@mui/icons-material";
import { DescriptionOutlined, AccountCircle } from "@mui/icons-material";
import SearchBar from "./SearchBar";
// import { useThemeContextValue } from "../../context/ThemContextProvider";
import axios from "axios";
const Header = ({ searchterm, setSearchTerm }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	let navigate = useNavigate();
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		axios.post("/api/logout").then((data) => {
			if (data.status === 200) {
				localStorage.clear();
				navigate("/");
			} else {
				console.log("error occured in logout");
			}
		});
	};
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	return (
		<div>
			<AppBar
				elevation={0}
				sx={{
					backgroundColor: "#FFF",
					borderBottom: "1px solid #E0E0E0",
					color: "black",
				}}
			>
				<Toolbar>
					<div style={{ flex: "0.3", paddingLeft: "10px" }}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography fontSize="16px" fontWeight="bold" paddingRight="10px">
								Notes
							</Typography>
							<DescriptionOutlined sx={{ fontSize: "25px" }} />
						</div>
					</div>
					<Box flex="0.7" alignItems="center">
						<SearchBar searchterm={searchterm} setSearchTerm={setSearchTerm} />
					</Box>
					<IconButton onClick={handleClick}>
						<AccountCircle />
					</IconButton>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
					>
						<Typography sx={{ p: 2, cursor: "pointer" }} onClick={handleLogout}>
							Logout
						</Typography>
					</Popover>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
