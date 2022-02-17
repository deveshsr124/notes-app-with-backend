import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { useNotesContextValue } from "./context/NotesContext";
const ProtectedRoutes = ({ isloggedIn }) => {
	return isloggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
