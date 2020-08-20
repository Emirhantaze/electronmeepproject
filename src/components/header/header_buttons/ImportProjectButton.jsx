import React from 'react';
import {useContext} from 'react';
import { SimContext } from '../../../context/Sim';
import { FileNamesContext } from '../../../context/FileNamesContext';
const {remote} = window.require('electron')
const { dialog } = remote.require('electron')
const fs = remote.require('fs')
const win = remote.getCurrentWindow();



export const ImportProjectButton = () => {
    const {simSetter} = useContext(SimContext)
    const {currentProjectPathSetter} = useContext(FileNamesContext)
    return (

            <div className="horizontal-button" id="topbarfirstbutton" onClick={ async () =>
            {   
                const selection = await dialog.showMessageBox(win,{
                    title : "Warning",
                    type:  "warning",
                    buttons:["Ok.","Cancel"],
                    detail: "Unsaved Project will be deleted!"
                })
                if(selection.response===0){

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
                else{
                    
                }
                }}
            >import Project from folder</div>       
               

    )
}
