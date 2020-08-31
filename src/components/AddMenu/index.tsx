import React from 'react'
import style from "./View.module.css"
import { ReactComponent as Cancel } from "./cancel.svg"
import { useDispatch, useSelector } from 'react-redux'
import { addMenuonoffSetter, selectAddMenuOnOff } from '../../Slices/addMenuSlice'

export const AddMenu = () => {
    const value = useSelector(selectAddMenuOnOff)
    const dispatch = useDispatch();
    const cancelbuttonfunc = () => {
        dispatch(addMenuonoffSetter())
    }
    return (
        <div>{value ?
            <div className={style.Absolute} >
                <div className={style.cancel} onClick={cancelbuttonfunc} >
                    <Cancel />
                </div>
                <div></div>
            </div>
            : ""}
        </div>)
}
