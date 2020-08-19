import React, { useContext } from 'react'
import { SpecsContext } from '../../../context/SpecsContext';

export const SpecsOnOffButton = () => {
    const {specsonoff,specsonoffSetter} = useContext(SpecsContext)

    return (
        <button onClick={()=>{
            if(specsonoff){
                specsonoffSetter(false)
            }
            else{
                specsonoffSetter(true)
            }
        }}>specs on off</button>
    )
}
