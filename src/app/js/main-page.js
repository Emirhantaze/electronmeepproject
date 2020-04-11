var fs = require('fs');
const fileDialog = require('file-dialog');
var $ = require("jquery")
var meep;
var propertiestoggle = true

function create(){
    fileDialog({ multiple: true, accept: '*.json' }, files => {
        fs.readFile(files[0].path,(err,data)=>{
            document.getElementById("contents").innerHTML=`<div id="elementfalse-"></div>`
            meep = JSON.parse(data.toString())
            writetotable(meep,[])
        });
    });
};
function toggleProperties(){
    if(propertiestoggle){
        propertiestoggle=false
    document.getElementById("properties").style.visibility=" collapse";
    }
    else{
        propertiestoggle=true
        document.getElementById("properties").style.visibility=" visible";
    }
}
function writetotable(obj,array){
    var arr = Object.assign([],array);
    var key = Object.keys(obj);
    for(var i = key.length-1;i>-1;i--){
        if(!(typeof(obj[key[i]])==="object")){
            //console.log(convertarray(arr)+" "+obj[key[i]].toString())
            
            var para = document.createElement("div");
            para.className = "element "+generateclasname(arr)
            arr.push(i)
            para.id = "element"+"false-"+convertarray(arr)
            
            //para.onclick=function() {writetotable(Object.assign({}, obj[key[i]]) ,Object.assign([],arr));}
            var node = document.createTextNode(key[i].toString()+" = "+obj[key[i]].toString());
            para.appendChild(node);
            arr.pop()
            $(para).insertAfter("#elementfalse-"+convertarray(arr));
            arr.push(i)
            document.getElementById("elementfalse-"+convertarray(arr)).style.marginLeft=String(20*(arr.length-1)+10)+"px"
            arr.pop()

        }
        else{

            
            var para = document.createElement("div");
            para.className = "element "+generateclasname(arr)
            arr.push(i) 
            para.id = "element"+"false-"+convertarray(arr);
            para.style.marginLeft = 10 * (arr.length+1)
            var node = document.createTextNode(key[i]);
            para.appendChild(node);
            arr.pop()
            $(para).insertAfter("#elementfalse-"+convertarray(arr));
            arr.push(i)
            document.getElementById("element"+"false-"+convertarray(arr)).addEventListener("click", function(){
                expandcollapse(this.id);  
                var arr= this.id.replace("element","").split("-")
                if(arr[0]==="false"){

                    document.getElementById(this.id).id = this.id.replace("false","true")
                }
                else{
                    document.getElementById(this.id).id = this.id.replace("true","false")
                }
            });
            
            document.getElementById("element"+"false-"+convertarray(arr)).style.marginLeft=String(20*(arr.length-1)+10)+"px"
            /*
            var key1 = Object.keys(obj[key[i]])
            if(key1.length==1){
                
                writetotable(obj[key[i]],arr)
                
            }*/arr.pop()

        }
}
function generateclasname(array){
    var arr = Object.assign([],array);
    var str=""
    for(var i = 0; i<arr.length;i++){
        if(i==0){
            str=String(arr[0])
        }else{
            str+=" "+str+"-"+String(arr[i])+""
        }
    }
    return str;
}
function convertarray(array){
    var arr = Object.assign([],array);
    var str = "";
    for(var i = 0; i<arr.length;i++){
        if(i==arr.length-1){
            str+=String(arr[i]);
        }
        else{
            str+=String(arr[i])+"-";
            
        }
    }
    return str;
}
function expandcollapse(str){
    var arr = str.replace("element","").split("-")
    console.log(arr)
    if(arr[0]==="false"){
        arr.shift()
        var obj = returnobj(meep,arr)
        writetotable(obj,arr)
    }
    else{
        arr.shift()
        $(`.${convertarray(arr)}`).remove()
        console.log(convertarray(arr))
    }
}
function returnobj(objj,array){
    var obj = Object.assign({},objj)
    for(var i = 0; i<array.length;i++){
        var key = Object.keys(obj);
        obj = obj[key[array[i]]]
    }
    return obj;
}
function writealltotable(obj,array){
    var arr = Object.assign([],array);
    var key = Object.keys(obj);
    for(var i = 0;i<key.length;i++){
        if(!(typeof(obj[key[i]])==="object")){
            //console.log(convertarray(arr)+" "+obj[key[i]].toString())
            arr.push(i)
            var para = document.createElement("div");
            para.className = "element"
            para.id = "element"+convertarray(arr)
            para.onclick=function() {console.log("12");}
            var node = document.createTextNode(key[i].toString()+" = "+obj[key[i]].toString());
            para.appendChild(node);
            arr.pop()
            var element = document.getElementById("element"+convertarray(arr));
            element.appendChild(para);
            
            
        }
        else{

            arr.push(i)
            var para = document.createElement("div");
            para.className = "element"
            para.id = "element"+convertarray(arr);
            //para.onclick= function() {console.log("12");}
            var node = document.createTextNode(key[i]);
            para.appendChild(node);
            arr.pop()
            var element = document.getElementById("element"+convertarray(arr));
            element.appendChild(para);
            arr.push(i)
            writealltotable(obj[key[i]],arr)
            arr.pop()
        }
    }
}}
