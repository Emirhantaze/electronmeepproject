import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom"
import "./app/main-page.css"
import propertiesopenbtn from "./app/icons/propertiesopenbtn.png"
import logo from "./app/icons/logo192.png"
import Plot from 'react-plotly.js';
// import App from "./components/App"
import "xterm/css/xterm.css"
const fileDialog = require("file-dialog")
const { remote, ipcRenderer } = window.require('electron');
const { Menu, MenuItem, ipcMain } = remote;
const fs = remote.require('fs');
const customTitlebar = window.require('custom-electron-titlebar'); 
require("./renderer")
var Terminal = window.require('xterm').Terminal;

let x = [1, 2, 3, 4, 5], y = [1, 2, 3, 4, 5];
let meep;
let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#3A506B'),
    icon: logo,
    height:"28px"
});
const menu = new Menu();
menu.append(new MenuItem({
    label: 'Open Your Project',
    click: () => { }
}));
MyTitleBar.updateMenu(menu);
// 3. Update Titlebar text
MyTitleBar.updateTitle('ElectronMeepProj V-0.0.3');

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Data:[]
        }
    }
    render(){
        return (
            <div>
                <div id = "xterm" className="terminal"></div>
                <div>   <div onClick={() => { window.ptyProcess.write("start\r") }}>Start!!</div>
                    <div onClick={() => {this.setState({Data:[{
                        x:x,y:y
                    }]})}}>showplot!!</div>
                    <Plot
                        data={this.state.Data   }
                        layout={{ width: 500, height: 500, title: 'A Fancy Plot' }}
                    />
        </div> </div> )
    }
}

ReactDOM.render(<App/>,document.getElementById("root"))

const xterm = new Terminal();
xterm.open(document.getElementById('xterm'));
let i = 0;
// Setup communication between xterm.js and node-pty
xterm.onData(data => {
    window.ptyProcess.write(data)
});
window.ptyProcess.on('data', function (data) {
    console.log(data)
    if (data.substr(0, 10) =="!!!!!!!!!!")
    {
        if(i==0){
            x=JSON.parse(data.splice(0,10))
            console.log(x)
            i++;

        }
        else{
            y = JSON.parse(data.splice(0, 10))
            i--;
        }
    }
    xterm.write(data);

});