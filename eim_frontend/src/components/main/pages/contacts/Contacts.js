import "./Contact.css";
import {runtime} from "../../../../controller/core";

function Contacts() {
    let ContactList=[];

    for (let eidToMarkKey in runtime.EidToMark) {
        let temp = <div className={"singleContact"}>
            {runtime.EidToMark[eidToMarkKey]}
        </div>
        ContactList.push(temp)
    }
    return <div id={"contacts"}>
        <div className={"addFriendButton"}>添加新好友</div>
        {ContactList}
    </div>
}

export {Contacts};