import React, {useContext} from 'react'
import { SimContext } from '../../context/Sim';
import uuid from 'uuid/dist/v1'
import ListElement from './ListElement';
 const Sidebar = (props)=>{
    const {sim,simSetter} = useContext(SimContext)
    
    return (
        <div className='ProjectPanel noselect'>
        <div className='projectTree ProjectPanel noselect'>
            {Object.entries(sim).map( iter => {

            return(<ListElement key={uuid()} keyarray={[iter[0]]}/>);
            }
            )}
        </div>
        </div>
    )
}
export default Sidebar;