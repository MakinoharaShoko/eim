import "./Contact.css";
import {getUserInfo, runtime} from "../../../../controller/core";
import AddNew from "./addNew/AddNew";
import FriendReq from "./FriendReq/FriendReq";
import {AddOne, Remind} from "@icon-park/react";

function Contacts() {
    let ContactList=[];
    for (let eidToMarkKey in runtime.EidToMark) {
        getUserInfo(eidToMarkKey);
        let showName = '';
        if(runtime.EidToMark[eidToMarkKey] !=='')
        {
            showName = runtime.EidToMark[eidToMarkKey];
        }else {
            showName = runtime.eidToName[eidToMarkKey]
        }
        let temp = <div className={"singleContact"} onClick={()=>{openDetailView(eidToMarkKey)}}>
            <div className={"singleName"}>{showName}</div>
            <div className={"singleDetail"}>{runtime.eidToDetail[eidToMarkKey]}</div>
        </div>
        ContactList.push(temp)
    }
    return <div id={"contacts"}>
        <FriendReq uid={runtime.currentMessageObject}/>
        <AddNew/>
        <div className={"contactsTopBar"} >
            <div className={"buttonContainer"}>
                <div className={"addFriendButton"} onClick={openAdd}><AddOne theme="outline" size="4.5vh" fill="#333" /></div>
                <div className={"friendReqButton"} onClick={openReq}><Remind theme="outline" size="4.5vh" fill="#333" /></div>
            </div>
            <div className={"contactsTitle"}>好友</div>
        </div>
        {ContactList}
    </div>
}

function openAdd(){
    document.getElementById("addNew").style.display = 'block';
}

function openReq(){
    document.getElementById("friendReq").style.display = 'block';
}



function openDetailView(eid){
    runtime.currentDetailShowEid = eid;
    document.getElementById("showDetail").style.display = 'block'
}

export {Contacts};