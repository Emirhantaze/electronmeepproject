import React, { useState } from "react";
import { selectSim, simSetter } from "../../Slices/simSlices";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../App";
import { selectedTextSetter } from "../../Slices/specsOnOffSlice";
var cloneDeep = require("lodash.clonedeep");

export default function SpecsPanel() {
	const sim = useSelector(selectSim);
	const { specsonoff, selected, selectedText } = useSelector(
		(state: RootState) => state.specsOnOff
	);
	const dispatch = useDispatch();
	const [text, setText] = useState("");
	let onoff = specsonoff ? "block" : "none";
	return (
		<div className={"propertiesPanel"} id={"propertiesPanel"} style={{ display: onoff }}>
			<div></div>
			<div
				className="noselect"
				style={{
					height: "55px",
					borderBottom: "0.1px solid black",
					display: selected === false ? "none" : "unset",
				}}
			>
				<label>{selectedText}</label>
				<div>
					<input
						style={{ marginRight: "5px" }}
						type="text"
						value={text}
						onKeyPress={(event) => {
							if (event.key === "Enter") {
								if (selected === false) {
								} else {
									let obj = cloneDeep(sim);
									let keyarray = Object.assign([], selected);
									console.log(keyarray);
									obj = changeObjWithArray(obj, keyarray, text);
									dispatch(
										selectedTextSetter(
											`${keyarray[keyarray.length - 1]}:${text}`
										)
									);
									dispatch(simSetter(obj));
								}
							}
						}}
						onChange={(event) => {
							setText(event.target.value);
						}}
					/>

					<input
						style={{ marginRight: "5px" }}
						type="submit"
						value="OK"
						onSubmit={() => {
							if (selected === false) {
							} else {
								let obj = cloneDeep(sim);

								let keyarray = Object.assign([], selected);
								console.log(keyarray);
								obj = changeObjWithArray(obj, keyarray, text);
								dispatch(
									selectedTextSetter(`${keyarray[keyarray.length - 1]}:${text}`)
								);
								dispatch(simSetter(obj));
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}

const changeObjWithArray = (
	obj: any,
	keyarray: Array<string | number>,
	target: string | number
) => {
	if (keyarray.length === 1) {
		obj[keyarray[0]] = target;
		return obj;
	} else {
		let copyedkeyarray = Object.assign([], keyarray);
		copyedkeyarray.splice(0, 1);
		obj[keyarray[0]] = changeObjWithArray(obj[keyarray[0]], copyedkeyarray, target);
		return obj;
	}
};
