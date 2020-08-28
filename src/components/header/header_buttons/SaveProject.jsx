import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentProjectPathSetter, selectCurrentProjectPath } from "../../../Slices/fileNameSlices";
import { selectSim, simSetter } from "../../../Slices/simSlices";

const { remote } = window.require("electron");
const { dialog } = remote.require("electron");
const win = remote.getCurrentWindow();
const fs = remote.require("fs");
export const SaveProject = () => {
	const sim = useSelector(selectSim);
	const currentProjectPath = useSelector(selectCurrentProjectPath);
	const dispatch = useDispatch();
	return (
		<div
			className="horizontal-button"
			onClick={async () => {
				if (currentProjectPath === undefined) {
					const selection = await dialog.showMessageBox(win, {
						title: "No Project Opened",
						detail:
							"You dont have any opened project right now. You can open a project or create new project by clicking buttons.",
						buttons: ["Cancel", "Create new project", "Open a project"],
					});
					if (selection.response === 1) {
						alert("this is not developed right now");
					} else if (selection.response === 2) {
						const options = {
							title: "Select folder for saved simulation",
							properties: ["openDirectory"],
						};
						const path = await dialog.showOpenDialog(win, options);
						if (path.canceled) {
						} else {
							dispatch(currentProjectPathSetter(path.filePaths[0]));
							fs.readFile(path.filePaths[0] + `/project.json`, (_, data) => {
								dispatch(simSetter(JSON.parse(data.toString())));
							});
						}
					}
				} else {
					await fs.writeFile(
						currentProjectPath + `/project.json`,
						JSON.stringify(sim),
						"utf8",
						() => {}
					);
				}
			}}
		>
			Save Project
		</div>
	);
};
