import React from "react";
import { InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import "./header.css";
const SearchBar = ({ searchterm, setSearchTerm }) => {
	return (
		<div className="search-container">
			<div className="search-icon-div">
				<Search />
			</div>
			<InputBase
				placeholder="Search By Title..."
				className="input-search"
				value={searchterm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
};

export default SearchBar;
