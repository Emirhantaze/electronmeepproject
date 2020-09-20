import React from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import "./styles/main.css";
import { store } from "./store";
import { Provider } from "react-redux";
import "./Meep/meepGeom";
import "./eelconfig"

import { AddMenu } from "./components/AddMenu";

//  Reducer declerations




const App = () => {
	return (
		<div style={{ height: "100vh" }}>
			<Provider store={store}>
				<AddMenu />
				<Header />
				<Main />
			</Provider>
		</div>
	);
};

export default App;
