import os from "os"
import * as Pty from 'node-pty'
import { store } from "./store";
import { eeltoggle, selectEelWaitStarted } from "./Slices/eelWaitSlice";
const { remote } = window.require("electron")
const pty: typeof Pty = remote.require('node-pty')
const fp = remote.require("find-free-port")
declare global {
    interface Window {
        eel: Ieel;
    }
}
declare global {
    interface Window {
        store: any
    }
}


export interface Ieel {
    expose: Function,
    fixCode: Function,
    [key: string]: Function
}

// remote.require("http://localhost:8080/eel.js")


// eel.expose(print, "print")
// eel.set_host("ws://localhost:8080")
export const eel = window.eel;


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}