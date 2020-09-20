import { createSlice } from "@reduxjs/toolkit";
import { Path } from "typescript";
import { RootState } from "../store";
const slice = createSlice({
	name: "fileName" as string,

	initialState: {
		currentProjectPath: null,
	} as fileNameState,
	reducers: {
		currentProjectPathSetter: (state, action) => {
			console.log(action.payload);
			state.currentProjectPath = action.payload;
		},
	},
});

export type fileNameState = {
	currentProjectPath: Path | string | null;
};

export const { currentProjectPathSetter } = slice.actions;

export const selectCurrentProjectPath = (state: RootState) =>
	state.fileName.currentProjectPath;
export default slice.reducer;
