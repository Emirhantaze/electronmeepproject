import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const slice = createSlice({
	name: "specsOnOffSlice",
	initialState: { selected: false, specsonoff: false, selectedText: "" } as SpecsOnOffState,
	reducers: {
		specsonoffSetter: (state: SpecsOnOffState, action) => {
			state.specsonoff = action.payload;
		},
		selectedSetter: (state: SpecsOnOffState, action) => {
			state.selected = action.payload;
		},
		selectedTextSetter: (state: SpecsOnOffState, action) => {
			state.selectedText = action.payload;
		},
	},
});

export type SpecsOnOffState = {
	selected: boolean;
	specsonoff: boolean;
	selectedText: string;
};

export const { selectedSetter, selectedTextSetter, specsonoffSetter } = slice.actions;
export default slice.reducer;

export const selectSpecsonoff = (state: RootState) => {
	return state.specsOnOff.specsonoff;
};
