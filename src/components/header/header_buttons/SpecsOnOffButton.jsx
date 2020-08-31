import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { specsonoffSetter, selectSpecsonoff } from "../../../Slices/specsOnOffSlice";

export const SpecsOnOffButton = () => {
	const specsonoff = useSelector(selectSpecsonoff);
	const dispatch = useDispatch();
	return (
		<div
			className="horizontal-button noselect"
			onClick={() => {
				if (specsonoff) {
					dispatch(specsonoffSetter(false));
				} else {
					dispatch(specsonoffSetter(true));
				}
			}}
		>
			specs on off
		</div>
	);
};
