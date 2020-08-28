import React, { useState } from "react";
import uuid from "uuid/dist/v1";
import SidebarElement from "./SidebarElement";
import { useSelector } from "react-redux";
import { selectSim } from "../../Slices/simSlices";
const ListElement = (props) => {
	const sim = useSelector(selectSim);
	let rendered = [];
	let obj = Object.assign({}, sim);
	const [display, dsiplaySetter] = useState("none");
	for (let i = 0; i < props.keyarray.length; i++) {
		if (typeof obj[props.keyarray[i]] === `object`)
			obj = Object.assign({}, obj[props.keyarray[i]]);
		else obj = obj[props.keyarray[i]];
	}
	rendered.push(
		<SidebarElement
			click={[display, dsiplaySetter]}
			key={uuid()}
			keyarray={[...props.keyarray]}
		>{`${props.keyarray[props.keyarray.length - 1]}:${
			typeof obj === `object` ? `` : obj
		}`}</SidebarElement>
	);
	if (typeof obj === `object`) {
		rendered.push(
			<div style={{ display: display }} key={uuid()}>
				{Object.entries(obj).map(([key, value]) => {
					return <ListElement key={uuid()} keyarray={[...props.keyarray, key]} />;
				})}
			</div>
		);
	}
	return <div>{rendered}</div>;
};
export default ListElement;
