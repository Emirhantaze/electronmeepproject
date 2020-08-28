import React from "react";
import uuid from "uuid/dist/v1";
import { useDispatch } from "react-redux";
import { selectedSetter, selectedTextSetter } from "../../Slices/specsOnOffSlice";
const SidebarElement = (props) => {
	const dispatch = useDispatch();

	let temp = [];

	if (props.keyarray.length - 1 === 0) {
	} else {
		temp = [];
		for (let i = 0; i < props.keyarray.length - 1; i++) {
			temp.push(<div key={uuid()} className="elementIndent"></div>);
		}
	}
	return (
		<div
			className="element"
			onClick={() => {
				/**
				 * close down menu state changer
				 */
				if (props.click[0] === "none") {
					props.click[1]("block");
				} else {
					props.click[1]("none");
				}
				dispatch(selectedSetter(props.keyarray));
				dispatch(selectedTextSetter(props.children));
			}}
		>
			<div className="treeElement">
				{temp}
				{props.children}
			</div>
		</div>
	);
};
export default SidebarElement;
