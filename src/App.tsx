import React from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import "./styles/main.css";
import { configureStore } from "@reduxjs/toolkit";
import fileNameReducer from "./Slices/fileNameSlices";
import { Provider } from "react-redux";
import simReducer from "./Slices/simSlices";
import specsOnOffReducer from "./Slices/specsOnOffSlice";
//  Reducer declerations
export const store = configureStore({
	reducer: {
		fileName: fileNameReducer,
		sim: simReducer,
		specsOnOff: specsOnOffReducer,
	},
});
const state = store.getState();
export type RootState = typeof state;

const App = () => {
	return (
		<div style={{ height: "100vh" }}>
			<Provider store={store}>
				<Header />
				<Main />
			</Provider>
		</div>
	);
};

export default App;
