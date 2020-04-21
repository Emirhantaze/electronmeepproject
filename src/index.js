/* 
//////////////////////////////             /////////////////////////////
//////////////////////////////   imports   /////////////////////////////           
//////////////////////////////             /////////////////////////////
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react"
import ReactDOM from "react-dom"
import "./app/main-page.css"
import propertiesopenbtn from "./app/icons/propertiesopenbtn.png"
import logo from "./app/icons/logo192.png"
const fileDialog = require("file-dialog")
const {remote} = window.require('electron');
const {Menu,MenuItem} = remote;
const fs = remote.require('fs');
const customTitlebar  = window.require('custom-electron-titlebar');



let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#3A506B'),
    icon:logo
});
const menu = new Menu();
menu.append(new MenuItem({
    label: 'Open Your Project',
    click:()=> {create();}
}));
 

MyTitleBar.updateMenu(menu);
// 3. Update Titlebar text

MyTitleBar.updateTitle('ElectronMeepProj V-0.0.3');

/**/
let propertiesLastKey = 0
let projectData = []
let meep = {name: ""}
let ClickedElement = 0;
let projectTree = [
    {text: "To start click on OPEN button", array: [0], clickable: false, isclicked: false}
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
                <PropertiesPanel/>
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
    return(<div>{temp}</div>);
    }
}

class Element extends React.Component{
    render(){
        let temp =this.props.array.length
        temp = String(20*(temp-1)+10)+"px"
    return(<div style={{marginLeft:temp,overflow: "hidden"}} className="element" onClick={()=>{
                    ElementClick(this.props.array,this.props.isclicked,this.props.clickable)
            }}>{this.props.text}</div>
        );
    }
}
class PropertiesPanel extends React.Component{
    constructor(props){
        super(props)
        let output={}
        this.state=output}
    render(){
        let obj = returnobj(meep,projectTree[ClickedElement].array)
        let output = [];
        let arr = Object.assign([],projectTree[ClickedElement].array)
        if(typeof(obj)==="object"){
            let key = Object.keys(obj)
            for(let i = propertiesLastKey; i<(key.length+propertiesLastKey);i++){
                if(typeof(obj[key[i-propertiesLastKey]])==="object"){
                    arr.push(i-propertiesLastKey)
                    let line = 0;
                    for(let i = 0; i<projectTree.length;i++){
                        
                        if(projectTree[i].array.toString()===arr.toString()){
                            line=i;
                        }
                    }
                    output.push(<PropertiesElement key= {i} value={""} name={key[i-propertiesLastKey]} type="object"
                                                   array={Object.assign([],arr)} isclicked={projectTree[line].isclicked}/>)
                    arr.pop()
                }
                else
                output.push(<PropertiesElement key= {i} value={obj[key[i-propertiesLastKey]]} name={key[i-propertiesLastKey]}/>)
                console.log(i)
            }
            propertiesLastKey+=key.length;
        }else{
            output.push(<PropertiesElement key= {propertiesLastKey} name={projectTree[ClickedElement].text.split(":")[0]} value={obj}/>)
            propertiesLastKey++;
        }
        //if()
        console.log("success")
        return(<div style={{visibility:collapsible.PropertiesPanel}} id="PropertiesPanel">
       {output}
        </div>);
    }
}
class PropertiesElement extends React.Component{
    constructor(props){
        super(props)
        let output={value:this.props.value}
        this.state=output
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
                            onKeyPress={(keyPress) => console.log(keyPress.key)} 
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
                console.log("repeat")
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
function ChangeProperty(arr,value){
    for(let i = 0; i<arr.length;i++){
        let key 
    }
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
