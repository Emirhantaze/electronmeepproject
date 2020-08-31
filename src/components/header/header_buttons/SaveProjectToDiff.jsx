import React from "react";
import { useSelector } from "react-redux";
import { selectSim } from "../../../Slices/simSlices";
const { remote } = window.require("electron");
const { dialog } = remote.require("electron");
const fs = remote.require("fs");
const win = remote.getCurrentWindow();
export const SaveProjectToDiff = () => {
	const sim = useSelector(selectSim);
	return (
		<div
			className="horizontal-button noselect"
			onClick={async () => {
				const options = {
					title: "Select folder for saved simulation",
					properties: ["openDirectory"],
				};
				const path = await dialog.showOpenDialog(win, options);
				if (path.cancelled) {
					fs.writeFileSync(
						path.filePaths[0] + `/project.json`,
						JSON.stringify(sim),
						"utf8",
						() => { }
					);
				} else {
					alert("cancelled");
				}
			}}
		>
			Save Project to different folder
		</div>
	);
};
