let notesId = 0;
export const initialState = {
	notes: [],
	authCreds: null,
};
//CRUD operations
export const notesreducer = (state, action) => {
	let newState = { ...state };
	switch (action.type) {
		case "SET_USER_DATA":
			newState.authCreds = action.data;
			return newState;
		case "GET_ALL_NOTES":
			newState.notes = action.payload;
			return newState;
		case "CREATE_NOTE":
			const note = {
				_id: action._id,
				title: action.title,
				content: action.content,
			};
			return { ...state, notes: [...state.notes, note] };
		case "EDIT_NOTE":
			newState.notes = newState.notes.filter((data) => {
				return data._id === action.payload.id
					? ((data.title = action.payload.title),
					  (data.content = action.payload.content))
					: { ...data };
			});
			return newState;
		case "DELETE_NOTE":
			newState.notes = newState.notes.filter((data) => {
				return data._id !== action.payload;
			});
			return newState;
		default:
			break;
	}
};
