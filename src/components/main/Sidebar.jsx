import React from "react";
import uuid from "uuid/dist/v1";
import ListElement from "./ListElement";
import { selectSim } from "../../Slices/simSlices";
import { useSelector } from "react-redux";
const Sidebar = (props) => {
	const sim = useSelector(selectSim);

	return (
		<div className="ProjectPanel noselect">
			<div className="projectTree ProjectPanel noselect">
				{Object.entries(sim).map((iter) => {
					return <ListElement key={uuid()} keyarray={[iter[0]]} />;
				})}
			</div>
		</div>
	);
};
export default Sidebar;
