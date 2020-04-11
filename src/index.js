/* imports part
////////////////////
////////////////////*/
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react"
import ReactDOM from "react-dom"
import "./app/main-page.css"
import propertiesopenbtn from "./app/icons/propertiesopenbtn.png"
const fileDialog = require("file-dialog")
const electron = window.require('electron');
const fs = electron.remote.require('fs');



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
                <Topbar/>
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
            temp.push(<Element key={i} array={projectTree[i]["array"]} text={projectTree[i]["text"]} isclicked={projectTree[i]["isclicked"]} clickable={projectTree[i]["clickable"]}/>)
        }
    return(<div>{temp}</div>);
    }
}

class Element extends React.Component{
    render(){
        let temp =this.props.array.length
        temp = String(20*(temp-1)+10)+"px"
    return(<div style={{marginLeft:temp}} className="element" onClick={()=>{
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
        if(typeof(obj)==="object"){
            let key = Object.keys(obj)
            console.log(obj)
            for(let i = 0; i<key.length;i++){
                output.push(<PropertiesElement key= {Math.floor(Math.random() * 10000)} value={obj[key[i]]} name={key[i]}/>)
            }
        }else{
            console.log("string")
            output.push(<PropertiesElement key= {Math.floor(Math.random() * 10000)} name={projectTree[ClickedElement].text.split(":")[0]} value={obj}/>)
        }console.log(output)
        //if()
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
        return(<div style={{height:"55px", borderBottom : "0.1px solid black"}}>
        <label>
            {this.props.name}
            </label>
            <input style={{marginRight:"5px"}} type="text" value={this.state.value} onChange={this.handleChange}/>
        
            <input style={{marginRight:"5px"}} type="submit" value="OK" />
       </div>);
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
function ElementClick(array,flag=false,flag1=true){
    
    let arr = Object.assign([],array)
    if(!flag){
        let line = 0;
        for(let i = 0; i<projectTree.length;i++){
            
            if(projectTree[i].array.toString()===arr.toString()){
                line=i;
            }
        }
        ClickedElement = line
        if(!(projectTree.length===0)){
        projectTree[line].isclicked=true}
        if(!flag1) {update();return;}
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
        let obj = returnobj(meep,arr);
        let key =  Object.keys(obj);
        for(let i = 0; i<key.length;i++){
            arr.push(i)
            if(projectTree[line+1].array.toString()===arr.toString()){
                projectTree.splice(line+1,1);
            }
            arr.pop()
        }
        projectTree[line].isclicked=false
    }
    
    
    update();
    
}
function update(){
    ReactDOM.render(<App />,document.getElementById("root"))
}
function create(){
    fileDialog({ multiple: true, accept: '*.json' }, files => {
        if(files[0].name.includes(".json"))
        fs.readFile(files[0].path,(err,data)=>{
            meep = JSON.parse(data.toString())
            projectTree=[]
            ElementClick([])
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



update()