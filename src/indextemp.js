/*
//////////////////////////////             /////////////////////////////
//////////////////////////////   imports   /////////////////////////////
//////////////////////////////             /////////////////////////////
*/
// import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react"
import ReactDOM from "react-dom"
// import "./app/main-page.css"
// import propertiesopenbtn from "./app/icons/propertiesopenbtn.png"
import logo from "./app/icons/logo192.png"

const fileDialog = require("file-dialog")
const {remote,ipcRenderer} = window.require('electron');
const {Menu,MenuItem ,ipcMain} = remote;
// const fs = remote.require('fs');
const customTitlebar  = window.require('custom-electron-titlebar');



let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#3A506B'),
    icon:logo
});
const menu = new Menu();
menu.append(new MenuItem({
    label: 'Open Your Project',
    click:()=> {}
}));


MyTitleBar.updateMenu(menu);
// 3. Update Titlebar text

MyTitleBar.updateTitle('ElectronMeepProj V-0.0.3');

/*
let propertiesLastKey = 0
let propertiesLastSelected="";
let projectData = []
let PropertyTree =[{name:"test",type:"nobject",value:"test",array:[]}]
let meep = {name: ""}
let ClickedElement = 0;
let projectTree = [
    {text: "name:", array: [0], clickable: false, isclicked: false}
]
let collapsible = {
    PropertiesPanel:"visible",
    ProjectPanel:"visible"
}

class App extends React.Component{
    render(){
        return(
            <div>
                <Content/>
                <BottomBar/>
            </div>
        );
    }
}

class Topbar extends React.Component{
    render(){
        return(
        <div className="top-bar">
            <div id="topbarfirstbutton" className="horizontal-button" onClick={()=>create()}>Open Your Project</div>
        </div>

        );
    }
}

class Content extends React.Component{
    render(){
        return(
            <div className="content">
                <ProjectPanel/>
                <div className="left-divider"></div>
                <div id="propertiesPanel"><PropertiesPanel proptree={PropertyTree} name="temp"/></div>
            </div>
        );
    }
}

class ProjectPanel extends React.Component{
    render(){
        return(
            <div style={{visibility: collapsible["ProjectPanel"]}} className= "ProjectPanel noselect">
                <ProjectPanelTopBar/>
                <ProjectTree/>
            </div>
        );
    }
}

class ProjectPanelTopBar extends React.Component{
    render(){
        return(
            <div id="ProjectPanelTopBar">
                <p style={{float: 'left', paddingTop: "5px", margin: 0}}>Simulation</p>
                <div id="openPropertiesbtn" onClick={()=>Toggle("PropertiesPanel")}><img alt="" className="img" src ={propertiesopenbtn}/></div>
            </div>
        );
    }
}

class ProjectTree extends React.Component{
    render(){
        let temp  = []
        for(let i = 0; i<projectTree.length;i++){
            temp.push(<Element key={i} array={projectTree[i]["array"]} text={projectTree[i]["text"]}
                                       isclicked={projectTree[i]["isclicked"]} clickable={projectTree[i]["clickable"]}/>)
        }
    return(<div className="projectTree">{temp}</div>);
    }
}

class Element extends React.Component{
    render(){
        let temp =[];

        if(this.props.array.length-1===0){

        }else{
            temp = []
            for(let i = 0; i<this.props.array.length-1;i++){
                temp.push(<div key={i} className="elementIndent"></div>)
            }
        }

    return(<div style={{marginLeft:"0px",overflow: "hidden"}} className="element" onClick={()=>{
                    ElementClick(this.props.array,this.props.isclicked,this.props.clickable)
    }}><div className="treeElement">{temp} {this.props.text}</div></div>
        );
    }
}
class PropertiesPanel extends React.Component{
    constructor(props){
        super(props)
        let output={}
        this.state=output}
    render(){
        let temp = [];
        let lastindex = 0;
        for(let i = 0;i<this.props.proptree.length;i++){
            let temparray = Object.assign([],this.props.proptree[i].array)

            temparray.push(i)
            if(this.props.proptree[i].type==="object"){
                temp.push(<PropertiesPanel key = {i+propertiesLastKey} proptree={ChangePropertyTree(temparray)} name={this.props.proptree[i].name}/>)

            }
            else{
                temp.splice(lastindex,0,<PropertiesElement key = {i+propertiesLastKey} name={this.props.proptree[i].name} value={this.props.proptree[i].value} array={this.props.proptree[i].array}/>)
                lastindex++;
            }
            temparray.pop()
        }
        propertiesLastKey+=this.props.proptree.length+1
    return <div className="propertiesPanel"><div className="propertiesTopBar">{this.props.name}</div>{temp}</div>;
    }
}
class PropertiesElement extends React.Component{
    constructor(props){
        super(props)
        let output={
            value:this.props.value,
            name:this.props.name,
            array:this.props.array
        }
        this.state=output
        this.textInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }  handleChange(event) {
        this.setState({value: event.target.value});
      }
    render(){
        if(this.props.type==="object"){
            return(<div className="noselect" style={{height:"55px", borderBottom : "0.1px solid black"}}>
            <label>
                {this.props.name}
                </label>
                    <div className="btn element btn-secondary" onClick={()=>{PropertyClick(this.props.array)}}>
                        Click to open {this.props.name}
                    </div>
           </div>);
        }else{
            return(
            <div className="noselect" style={{height:"55px", borderBottom : "0.1px solid black"}}>
        <label>
            {this.props.name}
            </label>
                <div>
            <input style={{marginRight:"5px"}} type="text" value={this.state.value}
                            onKeyPress={(keyPress) => console.log()}
                            onChange={this.handleChange}/>

            <input style={{marginRight:"5px"}} type="submit" value="OK" />
            </div>
       </div>);
        }
        }

}
class BottomBar extends React.Component{
    render(){
        return(
            <div className="bottom-bar"></div>
        );
    }
}
function Toggle(who){
    if(!(collapsible[who]===null)){
        if(collapsible[who]==="collapse"){
            collapsible[who]="visible"
        }else{
            collapsible[who]="collapse"
        }
    }update()
}
function ElementClick(array,flag=false,flag1=true,first=false){

    let arr = Object.assign([],array)
    if(!flag){
        let line=null;
        for(let i = 0; i<projectTree.length;i++){

            if(projectTree[i].array.toString()===arr.toString()){
                line=i;
            }
        }

        if((!(projectTree.length===0))&&!(line===null)){
        projectTree[line].isclicked=true}
        if(first){
            if((line===null)){
                line=0;
            }
        }else
        if(!flag1||(line===null)) {update();return;}
        ClickedElement = line
        PropertyTree=ChangePropertyTree(arr)
        let obj = returnobj(meep,arr);
        let key = Object.keys(obj);

        for(let i = 0;i<key.length;i++){
            if(typeof(obj[key[i]])==="object"){
                arr.push(i);
                projectTree.splice(line+1,0,{
                    text:key[i]+" : "+(obj[key[i]].type!=null ? obj[key[i]].type:""),
                    array:Object.assign([],arr)
                    ,clickable:true,
                    isclicked:false});
                arr.pop();
                line+=1;
            }else{
                arr.push(i);
                projectTree.splice(line+1,0,{
                    text:key[i]+" : "+obj[key[i]].toString(),
                    array:Object.assign([],arr)
                    ,clickable:false,
                    isclicked:false});
                arr.pop();
                line+=1;
            }
        }
    }else{

        let line = 0;
        for(let i = 0; i<projectTree.length;i++){
            if(projectTree[i].array.toString()===arr.toString()){
                line=i;
            }
        }
        ClickedElement = line
        if(!flag1) {update();return;}
        for(let i = line+1;i<projectTree.length;i++){
            let temp = Object.assign([],projectTree[i].array)
            while(!(temp.length<=projectTree[line].array.length)){
                temp.pop()
            }
            if(temp.toString()===projectTree[line].array.toString()){
                projectTree.splice(line+1,1)
                i--
            }
        }
        projectTree[line].isclicked=false
    }


    update();

}
function ChangePropertyTree(arr){

    let obj = returnobj(meep,arr);
    let key = Object.keys(obj);
    let array = Object.assign([],arr)
    let proptree=[];


    for(let i = 0;i<key.length;i++){
        array.push(i)
        if(typeof(obj[key[i]])==="object"){
            proptree.push({
                name : key[i],
                type:"object",
                value:Object.assign({},obj[key[i]]),
                array:array
            });
        }else{
            proptree.push({
                name:key[i],
                type:"notObject",
                value:obj[key[i]],
                array:array
            });

        }
        array.pop();
    }
    return proptree;
}
function ChangeProperty(array,name,value){
    array.pop()

    let arr = new Array(array.length+1);
    arr[0] = meep;
    for(let i = 0; i<array.length;i++){
        let key = Object.keys(arr[i]);
        arr[i+1] = arr[i][key[array[i]]];
    }
    if(typeof(name)==="string"){
        name = name.trim()
    }
    propertiesLastSelected=name
    arr[array.length][name] = value
    projectTree=[]
    ElementClick([],false,true,true)
    PropertyClick(array)
}
function PropertyClick(array){
    let arr = Object.assign([],array);
    for(let i = 0; i<arr.length;i++){
        let temparr = [];
        for(let j = 0; j<i+1;j++){
            temparr.push(arr[j])
        }
        let line=null;
        for(let j = 0; j<projectTree.length;j++){

            if(projectTree[j].array.toString()===temparr.toString()){
                line=j;
            }
        }
        let tempisclicked = projectTree[line].isclicked
        ElementClick(temparr,false,!tempisclicked)
    }
}
function update(){
    if(propertiesLastKey>1000){
        propertiesLastKey=0
    }

    ReactDOM.render(<App />,document.getElementById("root"))
}
function create(){
    fileDialog({ multiple: true, accept: '*.json' }, files => {
        if(files[0].name.includes(".json"))
        fs.readFile(files[0].path,(err,data)=>{
            meep = JSON.parse(data.toString())
            projectTree=[]
            ElementClick([],false,true,true)
            //writetotable(meep,[])
        });
    });
};
function returnobj(objj,array){
    var obj = Object.assign({},objj)
    for(var i = 0; i<array.length;i++){
        var key = Object.keys(obj);
        obj = obj[key[array[i]]]
    }
    return obj;
}
function test(){

}


update()
*/
class BottomBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(<div>
            <div className="btn element btn-danger" onClick={()=>{
                // ipcRenderer.send("test","a")
                console.log()
                }}>click</div>
        <Test />        </div>
        );
    }
}
class Test extends React.Component{
constructor(props){
    super(props)
    this.state={ahmet:"asd"}
}    componentDidMount(){
    // ipcMain.on('test', (event, arg) => {
    //    this.setState({ahmet:this.state.ahmet+arg})
    //   })
}
render(){

return <div>{this.state.ahmet}</div>
}
}
ReactDOM.render(<BottomBar />,document.getElementById("root"))
