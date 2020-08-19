import React from 'react';
import {useContext} from 'react';
import { SimContext } from '../../../context/Sim';
const {remote} = window.require('electron')
const { dialog } = remote.require('electron')
const fs = remote.require('fs')
const win = remote.getCurrentWindow();



export const ImportSimButton = () => {
    const {simSetter} = useContext(SimContext)
    return (
            <button onClick={ async () =>
            {   
                const  options = {
                    title: "Select folder for saved simulation",
                    properties:["openDirectory"]
                }   
               const path = await dialog.showOpenDialog(win,options)
               fs.readFile(path.filePaths[0]+`/project.json`,(_,data)=>{
                simSetter(JSON.parse(data.toString()))
            });
            }}
            >import sim from file</button>            
        
    )
}
