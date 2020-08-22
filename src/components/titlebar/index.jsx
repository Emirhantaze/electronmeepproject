import React, {}from 'react'
import {useContext} from 'react';
import { SimContext } from '../../context/Sim';
import { FileNamesContext } from '../../context/FileNamesContext';
import { SpecsContext } from '../../context/SpecsContext';
import { useState } from 'react';
const {remote} = window.require('electron')
const { dialog } = remote.require('electron')
const fs = remote.require('fs')
const win = remote.getCurrentWindow();
const {Menu,MenuItem} = remote
const customTitlebar = window.require('custom-electron-titlebar');
export const TitleBar = (props) =>{

    // contexts are defined
    const [isfirstrun,isfirstrunSetter] = useState(true)
    const {sim,simSetter} = useContext(SimContext)
    const {currentProjectPath,currentProjectPathSetter} = useContext(FileNamesContext)
    const {specsonoff,specsonoffSetter} = useContext(SpecsContext)


    // Submenu functions 

    const importProjectButtonFunction = async ()=>{
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
    }

    const saveProjectfunction = async ()=>{
        if(currentProjectPath===undefined){
            const selection = await dialog.showMessageBox(win,{
                title : "No Project Opened",
                detail : "You dont have any opened project right now. You can open a project or create new project by clicking buttons.",
                buttons: ["Cancel", "Create new project", "Open a project"]
            })   
            if(selection.response ===1){
                alert("this is not developed right now")
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

    const saveProjectToDiffFunction = async () => {
        const  options = {
            title: "Select folder for saved simulation",
            properties:["openDirectory"]
        }   
        const path = await dialog.showOpenDialog(win,options)
            if(path.cancelled ){

                fs.writeFileSync(path.filePaths[0]+`/project.json`, JSON.stringify(sim), 'utf8', ()=>{});
            }else{
                alert("cancelled")
            }
    }

    const specsOnOffFunction = ()=>{
        if(specsonoff){
            specsonoffSetter(false)
        }
        else{
            specsonoffSetter(true)
        }
    }

    if(isfirstrun){

        window.titlebar = new customTitlebar.Titlebar({
            backgroundColor: customTitlebar.Color.fromHex('#444'),
            shadow:true,
        });
        
        
        const menu = new Menu();
        menu.append(new MenuItem({
            label: 'Project',
            submenu: [
                {
                    label:"Import Project From Folder",
                    click : importProjectButtonFunction
                    
                },
                {
                    label:"Save Project",
                    click: saveProjectfunction
                },
                {
                    label: "Save Project To Different Folder",
                    click:saveProjectToDiffFunction
                }
            ]
        }));
        menu.append(new MenuItem({
        label:"Specs On/Off",
        click:specsOnOffFunction
    }));
    
    window.titlebar.updateMenu(menu);
    isfirstrunSetter(false)
}
    return (<div>{specsonoff}</div>)
}
