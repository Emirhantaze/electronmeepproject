import React from 'react';
import {useContext} from 'react';
import { SimContext } from '../../context/Sim';
import { SpecsContext } from '../../context/SpecsContext';
const {remote} = window.require('electron')
const { dialog } = remote.require('electron')
const fs = remote.require('fs')

const Header = () => {
    const {sim , setState} = useContext(SimContext)
    const {specsonoff,specsonoffSetter} = useContext(SpecsContext)
    return (
        <div className='top-bar'>
            <button onClick={()=>
            {
               const path = dialog.showOpenDialogSync()
               fs.readFile(path[0],(err,data)=>{
                setState(JSON.parse(data.toString()))
            });
            }}
            >import sim from file</button>
            <button onClick={()=>{
                if(specsonoff){
                    specsonoffSetter(false)
                }
                else{
                    specsonoffSetter(true)
                }
            }}>specs on off</button>
            <button onClick={
                ()=>{
                    let path = dialog.showSaveDialogSync({
                      defaultpath:"/home/"
                    })  

                    fs.writeFileSync(path, JSON.stringify(sim), 'utf8', ()=>{});
                }
            }>save simulation file</button>
        </div>
    );
}

export default Header;
