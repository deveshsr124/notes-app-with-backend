import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "../header";
import { useNotesContextValue } from "../../context/NotesContext";
import NotesCreate from "../NotesCreate";
import Note from "../Note";
import { Grid, Box, Skeleton } from "@mui/material";
import axios from "axios";
import Loader from "../loader";
const Home = () => {
	const [{ notes }, dispatch] = useNotesContextValue();
	const [searchterm, setSearchTerm] = useState("");
	const [isloading, setIsLoading] = useState(false);
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
		setIsLoading(true);
		const { data } = await axios.get("/api/all-notes", {
			withCredentials: true,
		});
		try {
			setIsLoading(false);
			if (data.notes !== []) {
				dispatch({
					type: "GET_ALL_NOTES",
					payload: data.notes,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	if (!localStorage.getItem("token")) {
		return <Navigate to="/login" />;
	}
	return (
		<div>
			<Header searchTerm={searchterm} setSearchTerm={setSearchTerm} />
			<div
				style={{ marginTop: "10%", display: "flex", justifyContent: "center" }}
			>
				<NotesCreate setIsLoading={setIsLoading} />
			</div>

			{isloading ? (
				<Box
					marginLeft="5%"
					marginTop="5%"
					marginRight="5%"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Loader />
					<Loader />
					<Loader />
					<Loader />
				</Box>
			) : (
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
			)}
		</div>
	);
};

export default Home;
