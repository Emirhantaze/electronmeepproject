import React from 'react';
import {useContext} from 'react';
import { SimContext } from '../../context/Sim';
import { SpecsContext } from '../../context/SpecsContext';
const {remote} = window.require('electron')
const { dialog } = remote.require('electron')
const fs = remote.require('fs')
const win = remote.getCurrentWindow();
const Header = () => {
    const {sim , simSetter} = useContext(SimContext)
    const {specsonoff,specsonoffSetter} = useContext(SpecsContext)
    return (
        <div className='top-bar'>
            <button onClick={ async () =>
            {   
                const  options = {
                    title: "Select folder for saved simulation",
                    properties:["openDirectory"]
                }   
               const path = await dialog.showOpenDialog(win,options)
               fs.readFile(path.filePaths[0]+`/project.json`,(err,data)=>{
                simSetter(JSON.parse(data.toString()))
            });
            }}
            >import sim from file</button>

          {  /**
            specsonoff setter button 
            
            */}
            <button onClick={()=>{
                if(specsonoff){
                    specsonoffSetter(false)
                }
                else{
                    specsonoffSetter(true)
                }
            }}>specs on off</button>


            <button onClick={
                async ()=>{
                    const  options = {
                            title: "Select folder for saved simulation",
                            properties:["openDirectory"]
                        }   
                    const path = await dialog.showOpenDialog(win,options)
                    fs.writeFileSync(path.filePaths[0]+`/project.json`, JSON.stringify(sim), 'utf8', ()=>{});
                }
            }>save simulation file</button>
        </div>
    );
}

export default Header;
