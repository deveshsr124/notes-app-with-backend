import React, { useState, useEffect } from "react";
import Header from "../header";
import { useNotesContextValue } from "../../context/NotesContext";
import NotesCreate from "../NotesCreate";
import Note from "../Note";
import { Grid, Box } from "@mui/material";
import axios from "axios";
const Home = () => {
	const [{ notes }, dispatch] = useNotesContextValue();
	const [searchterm, setSearchTerm] = useState("");
	const searchFilter = (val) => {
		if (searchterm === "") {
			return val;
		} else if (val.title.toLowerCase().includes(searchterm.toLowerCase())) {
			return val;
		}
	};
	useEffect(() => {
		getNotes();
	}, []);
	const getNotes = async () => {
		const { data } = await axios.get("/api/all-notes", {
			withCredentials: true,
		});
		try {
			data.notes !== []
				? dispatch({
						type: "GET_ALL_NOTES",
						payload: data.notes,
				  })
				: console.log("no notes found ");
		} catch (err) {
			console.log(err);
		}
	};
	console.log("notes", notes);
	return (
		<div>
			<Header searchTerm={searchterm} setSearchTerm={setSearchTerm} />
			<div
				style={{ marginTop: "10%", display: "flex", justifyContent: "center" }}
			>
				<NotesCreate />
			</div>
			<Box marginLeft="5%" marginTop="5%" marginRight="5%">
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 12, md: 12 }}
				>
					{notes
						.filter((val) => searchFilter(val))
						.map((item) => {
							return (
								<Grid item xs={12} sm={4} md={3} key={item._id}>
									<Note note={item} dispatch={dispatch} id={item._id} />
								</Grid>
							);
						})}
				</Grid>
			</Box>
		</div>
	);
};

export default Home;
