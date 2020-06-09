import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom"
import "./app/main-page.css"
import propertiesopenbtn from "./app/icons/propertiesopenbtn.png"
import logo from "./app/icons/logo192.png"
import App from "./components/App"
const fileDialog = require("file-dialog")
const { remote, ipcRenderer } = window.require('electron');
const { Menu, MenuItem, ipcMain } = remote;
const fs = remote.require('fs');
const customTitlebar = window.require('custom-electron-titlebar'); 


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


class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = Object.assign({}, props);
    }
    render() {
        return (
            <div className="content">
                <ProjectPanel communication={this.props.communication} visibility="visible"/>
                <div className="left-divider"></div>
                <div id="propertiesPanel"></div>
            </div>
        );
    }
}
class ProjectPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
    }
    render() {
        return (
            <div style={{ visibility: this.props.visibility }} className="ProjectPanel noselect">
                <ProjectPanelTopBar communication={this.props.communication}/>
                <ProjectTree communication={this.props.communication} project={[{a:1}]}/>
            </div>
        );
    }
}
class ProjectPanelTopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
    }
    render() {
        return (
            <div id="ProjectPanelTopBar">
                <p style={{ float: 'left', paddingTop: "5px", margin: 0 }}>Simulation</p>
                <div id="openPropertiesbtn" onClick={() => {}}><img alt="" className="img" src={propertiesopenbtn} /></div>
            </div>
        );
    }
}
class ProjectTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
    }
    render() {
        if(! isObjectSame(this.state,this.props))
        this.setState(Object.assign({}, this.props))
        let temp = [];
        
        for(let i = 0;i<this.props.project.length;i++){
            temp.push(<SubProjectTree key={i} subproject={this.props.project[i]}/>)
        }
        return (<div className="projectTree">{temp}</div>);
    }
}
class SubProjectTree extends React.Component{
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
        this.state.clicked=true
    }
    render(){
        if(this.state.clicked){
            let temp = [];
            let key = Object.keys(this.props.subproject);
            console.log(this.props.subproject)
            for(let i = 0; i<key.length;i++){
                temp.push(<SubProjectTreeElement key={i} value={this.props.subproject[key[i]]}/>)
            }
            return( 
            <div>
                <div className="element SubProjectTreeHeader">test</div>
                {temp}
            </div>);
        }else{
            return (
            <div>
                <div className="element SubProjectTreeHeader">test</div>
            </div>);
        }
        
    }
}
class SubProjectTreeElement extends React.Component{
render(){
return<div> {this.props.value}</div>
}
}
class BottomBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
    }
    render() {
        return (
            <div className="bottom-bar"></div>
        );
    }
}

function create() {
    fileDialog({ multiple: true, accept: 'json' }, files => {
        if (files[0].name.includes(".json"))
            fs.readFile(files[0].path, (err, data) => {
                meep = JSON.parse(data.toString())
            });
    });
};
function isObjectSame(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => isObjectSame(x[key], y[key]))
    ) : (x === y);
}
ReactDOM.render(<App/>,document.getElementById("root"))