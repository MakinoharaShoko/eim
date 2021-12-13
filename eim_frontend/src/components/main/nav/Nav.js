import "./Nav.css"
import {runtime} from "../../../controller/core";
import {AddressBook, Me, MessageOne} from "@icon-park/react";

function Nav(){
    return <div id={"nav"}>
        <div className={"singleNavElement"} onClick={()=>{
            switchTab('dialog')
        }}><MessageOne theme="outline" size="24" fill="white"/></div>
        <div className={"singleNavElement"} onClick={()=>{
            switchTab('contacts')
        }}><AddressBook theme="outline" size="24" fill="white"/></div>
        <div className={"singleNavElement"} onClick={()=>{
            switchTab('my')
        }}><Me theme="outline" size="24" fill="white"/></div>
    </div>
}

function switchTab(tab){
    document.getElementById('dialog').style.display = 'none';
    document.getElementById('contacts').style.display = 'none';
    document.getElementById('my').style.display = 'none';
    document.getElementById(tab).style.display = 'block';
    runtime.currentPage=tab;
}
export {Nav};