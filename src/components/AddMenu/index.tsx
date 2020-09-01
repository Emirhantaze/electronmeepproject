import React from 'react'
import style from "./View.module.css"
import 'bootstrap/dist/css/bootstrap.css';
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
            <div className={style.Absolute + " dasdasd"} >
                <div className={style.cancel} onClick={cancelbuttonfunc} >
                    <Cancel />
                </div>
                <div className="container-lg" style={{ height: "100%" }}>
                    <div className="row" style={{ height: "100%" }}>

                        <div className="col-sm-2 mr-5 ml-2" style={{ border: "1px solid black" }}>

                        </div>


                        <div className="col-sm-9" style={{ border: "1px solid black" }}></div>
                    </div>
                </div>
            </div>
            : ""}
        </div>)
}
