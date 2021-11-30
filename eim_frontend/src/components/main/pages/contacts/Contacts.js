import "./Contact.css";
import {runtime} from "../../../../controller/core";
import AddNew from "./addNew/AddNew";
import FriendReq from "./FriendReq/FriendReq";

function Contacts() {
    let ContactList=[];

    for (let eidToMarkKey in runtime.EidToMark) {
        let temp = <div className={"singleContact"} onClick={()=>{openMessageView(eidToMarkKey)}}>
            {runtime.EidToMark[eidToMarkKey]}
        </div>
        ContactList.push(temp)
    }
    return <div id={"contacts"}>
        <FriendReq uid={runtime.currentMessageObject}/>
        <AddNew/>
        <div className={"addFriendButton"} onClick={openAdd}>添加新好友</div>
        <div className={"addFriendButton"} onClick={openReq}>查看好友请求</div>
        {ContactList}
    </div>
}

function openAdd(){
    document.getElementById("addNew").style.display = 'block';
}

function openReq(){
    document.getElementById("friendReq").style.display = 'block';
}

function openMessageView(eid){
    runtime.currentMessageObject = eid;
    console.log("now showing message from"+eid)
    document.getElementById("MV").style.display = 'block'
}

export {Contacts};