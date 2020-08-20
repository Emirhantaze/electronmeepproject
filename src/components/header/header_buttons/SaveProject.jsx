import React from 'react'
import { useContext } from 'react';
import { SimContext } from '../../../context/Sim';
import { FileNamesContext } from '../../../context/FileNamesContext';
const {remote} = window.require('electron')
const { dialog } = remote.require('electron')
const win = remote.getCurrentWindow();
const fs = remote.require('fs')
export const SaveProject = () => {
    const {sim,simSetter} = useContext(SimContext)
    const {currentProjectPath,currentProjectPathSetter} = useContext(FileNamesContext)
    return (
        <div className="horizontal-button" onClick={
            async ()=>{
                if(currentProjectPath===undefined){
                    const selection = await dialog.showMessageBox(win,{
                        title : "No Project Opened",
                        detail : "You dont have any opened project right now. You can open a project or create new project by clicking buttons.",
                        buttons: ["Cancel", "Create new project", "Open a project"]
                    })   
                    if(selection.response ===1){

                    }
                    else if(selection.response===2){
                        const  options = {
                            title: "Select folder for saved simulation",
                            properties:["openDirectory"]
                        }   
                        const path = await dialog.showOpenDialog(win,options)
                        if(path.canceled){
                            
                        }
                        else{
                            currentProjectPathSetter(path.filePaths[0])
                            fs.readFile(path.filePaths[0]+`/project.json`,(_,data)=>{
                                simSetter(JSON.parse(data.toString()))
                            });
                        }
                    }
                }else{

                    await fs.writeFile(currentProjectPath+`/project.json`, JSON.stringify(sim), 'utf8', ()=>{});
                }
            }
        }>Save Project</div>
    )
}
