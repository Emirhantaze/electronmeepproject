import React, {useContext,useState} from 'react'
import { SimContext } from '../../context/Sim';
import uuid from 'uuid/dist/v1'
import { SpecsContext } from '../../context/SpecsContext';


export default function SpecsPanel() {
    let {specsonoff,selected,selectedText,selectedTextSetter} = useContext(SpecsContext)
    const {sim,setState} = useContext(SimContext)
    const [text, setText] = useState("");
    let onoff = specsonoff ? "block":"none"
  return (
    <div className={"propertiesPanel"} id={"propertiesPanel"} style={{display:onoff,}}>
    <div></div>
    <div className="noselect" style={{height:"55px", borderBottom : "0.1px solid black", display: selected===false?"none":"unset"}}>
        <label>
            {selectedText}
            </label>
            <div>    
            <input style={{marginRight:"5px"}} type="text" value={text}
                            onKeyPress={(event) => {if(event.key==="Enter"){
                              if(selected===false){

                              }
                              else{
                              let obj = Object.assign({},sim)
                              let keyarray = Object.assign([],selected)
                              console.log(keyarray)
                              obj = changeObjWithArray(obj,keyarray,text)
                              selectedTextSetter(`${keyarray[keyarray.length-1]}:${text}`)
                              setState(obj)
                              
                            }
                            }}}
                            onChange={(event)=>{setText(event.target.value)}}/>

            <input style={{marginRight:"5px"}} type="submit" value="OK" onSubmit={()=>{
              if(selected===false){

              }
              else{
              let obj = Object.assign({},sim)
              let keyarray = Object.assign([],selected)
              console.log(keyarray)
              obj = changeObjWithArray(obj,keyarray,text)
              selectedTextSetter(`${keyarray[keyarray.length-1]}:${text}`)
              setState(obj)
              
            }
            }}/>
            </div>
       </div>
    </div>
  );
}

const changeObjWithArray = (obj,keyarray,target) =>{
  if(keyarray.length===1)
  {
    obj[keyarray[0]] = target
    return obj
  }
  else{
    
    let copyedkeyarray = Object.assign([],keyarray)
    copyedkeyarray.splice(0,1)
    obj[keyarray[0]] = changeObjWithArray(obj[keyarray[0]],copyedkeyarray,target)
    return obj
  }
}