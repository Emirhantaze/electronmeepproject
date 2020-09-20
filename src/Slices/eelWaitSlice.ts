import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const slice = createSlice({
    name: "eelWait",
    initialState: {
        started: false
    } as IeelWaitState,
    reducers: {
        eeltoggle: (state) => {
            state.started = !state.started;
        }
    }
});

export interface IeelWaitState {
    started: boolean
}

export const { eeltoggle } = slice.actions;

export const selectEelWaitStarted = (state: RootState) => { return (state.eelWait.started) }


export default slice.reducer;