import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/mainbody";
const Routers = () => {
	return (
		<div>
			<Router>
				<div>
					<Routes>
						<Route exact path="/" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/home" element={<Home />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
};

export default Routers;
