import React from 'react'
import style from "./View.module.css"
import 'bootstrap/dist/css/bootstrap.css';
import { v1 } from "uuid";
import { ReactComponent as Cancel } from "./cancel.svg"
import { useDispatch, useSelector } from 'react-redux'
import { addMenuonoffSetter, selectAddMenuOnOff } from '../../Slices/addMenuSlice'
import { meepGeomClasses } from "../../Meep/meepConstants"

export const AddMenu = () => {
    const value = useSelector(selectAddMenuOnOff)
    const dispatch = useDispatch();
    const cancelbuttonfunc = () => {
        dispatch(addMenuonoffSetter())
    }
    return (
        <div>{value ?
            <div className={style.Absolute + " "} >

                <div className={style.top_bar}>
                    <div className={style.cancel} onClick={cancelbuttonfunc} >
                        <Cancel />
                    </div>
                </div>
                <div className="container-lg" style={{ height: "calc(100% - 30px)" }}>
                    <div className="row" style={{ height: "calc(100% - 30px)" }}>
                        <div className="col-2 p-1 mr-2 ml-2" style={{ border: "1px solid black", overflowY: "scroll" }}>
                            {meepGeomClasses.map((value, _) => {
                                return <SelectMenuItem key={v1()} item_name={value.__classname} />
                            })}
                        </div>
                        <div className="col-sm-9" style={{ border: "1px solid black" }}></div>
                    </div>
                </div>
            </div>
            : ""}
        </div>)
}

// 
export interface ISelectMenuItemprop {
    item_name: string,
}


export const SelectMenuItem = (prop: ISelectMenuItemprop) => {

    return (
        <div className={style.selectPanelItem + " noselect"} onClick={() => { console.log("test") }}>
            <input className={style.selectPanelCheck} type="checkbox" aria-label="Checkbox for following text input" />
            <span className={style.selectPaneltemspan + " no-select"}> {prop.item_name}</span>
        </div>
    )
} 