import { createContext, useContext, useReducer } from "react";

// for creating the context
export const NotesContext = createContext();

// context provider
export const NotesContextProvider = ({ initialState, reducer, children }) => {
	return (
		<NotesContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</NotesContext.Provider>
	);
};

// for getting the data out of context
export const useNotesContextValue = () => useContext(NotesContext);
