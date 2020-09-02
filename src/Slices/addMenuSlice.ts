import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../App";
const slice = createSlice({
    name: "addMenuonoff",
    initialState: {
        value: true
    } as IaddMenuonoffState,
    reducers: {
        addMenuonoffSetter: (state: IaddMenuonoffState) => {
            state.value = !state.value
        }
    }

})

export interface IaddMenuonoffState {
    value: boolean
}



export const selectAddMenuOnOff = (state: RootState) => {
    return state.addMenuonoff.value
}

export const { addMenuonoffSetter } = slice.actions
export default slice.reducer