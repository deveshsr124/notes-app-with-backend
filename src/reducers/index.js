let notesId = 0;
export const initialState = {
	notes: [],
};
//CRUD operations
export const notesreducer = (state, action) => {
	let newState = { ...state };
	switch (action.type) {
		case "CREATE_NOTE":
			const note = {
				id: notesId,
				title: action.title,
				content: action.content,
			};
			notesId += 1;
			return { ...state, notes: [...state.notes, note] };
		case "EDIT_NOTE":
			newState.notes = newState.notes.filter((data) => {
				return data.id === action.payload.id
					? ((data.title = action.payload.title),
					  (data.content = action.payload.content))
					: { ...data };
			});
			return newState;
		case "DELETE_NOTE":
			newState.notes = newState.notes.filter((data) => {
				return data.id !== action.payload;
			});
			return newState;
		default:
			break;
	}
};
