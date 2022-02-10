import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/mainbody";

const RouterComponent = () => {
	return (
		<Routes>
			<React.Fragment>
				<Route exact path="/" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</React.Fragment>
		</Routes>
	);
};

export default RouterComponent;
