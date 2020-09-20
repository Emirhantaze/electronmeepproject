import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const slice = createSlice({
	name: "sim",
	initialState: {
		sim: {},
	} as simState,
	reducers: {
		simSetter: (state, action) => {
			state.sim = action.payload;
		},
	},
});

export type simState = {
	sim: Object;
};

export const { simSetter } = slice.actions;

export const selectSim = (state: RootState) => state.sim.sim;

export default slice.reducer;
