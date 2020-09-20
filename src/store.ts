import { configureStore } from "@reduxjs/toolkit";
import fileNameReducer from "./Slices/fileNameSlices";
import simReducer from "./Slices/simSlices";
import specsOnOffReducer from "./Slices/specsOnOffSlice";
import addMenuonoffReducer from "./Slices/addMenuSlice";
import eelWaitReducer from "./Slices/eelWaitSlice";

export const store = configureStore({
    reducer: {
        fileName: fileNameReducer,
        sim: simReducer,
        specsOnOff: specsOnOffReducer,
        addMenuonoff: addMenuonoffReducer,
        eelWait: eelWaitReducer
    },
});
window.store = store;
const state = store.getState();
export type RootState = typeof state;