import React, {useContext} from 'react'
import { SimContext } from '../../context/Sim';
import uuid from 'uuid/dist/v1'
import { SpecsContext } from '../../context/SpecsContext';
 const SidebarElement = (props)=>{
    const {sim,setState} = useContext(SimContext)
    const {selectedSetter,selectedTextSetter} = useContext(SpecsContext)
    let temp =[];

    if(props.keyarray.length-1===0){

    }else{
        temp = []
        for(let i = 0; i<props.keyarray.length-1;i++){
            temp.push(<div key={uuid()} className="elementIndent"></div>)
        }
    }
    return (
      
        <div className='element' onClick={()=>{

            /**
             * close down menu state changer
             */
            if(props.click[0]==="none"){

                props.click[1]("block");
            }else{
                props.click[1]("none");

            }
            selectedSetter(props.keyarray)
            selectedTextSetter(props.children)

        }}>
            <div className = 'treeElement'>{temp}{props.children}</div>
        </div>
    
    )
}
export default SidebarElement;