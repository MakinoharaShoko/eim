import './friendReq.css'
import {runtime} from "../../../../../controller/core";
import {Return} from "@icon-park/react";

const FriendReq = () =>{
    let friendReqList=[];
    if(runtime.RuntimeData.hasOwnProperty('AddFriendReq')){
        for (let i = 0; i < runtime.RuntimeData.AddFriendReq.length; i++) {
            getUserNameByEid(runtime.RuntimeData.AddFriendReq[i].sender.toString());
            let tempName = runtime.RuntimeData.AddFriendReq[i].sender;
            if(runtime.eidToName.hasOwnProperty(tempName)){
                tempName = runtime.eidToName[runtime.RuntimeData.AddFriendReq[i].sender];
            }
            let temp =<div className={"singleAddReqElement"}>
                <div className={"senderName"}>
                    {tempName}
                </div>
                <div className={"senderText"}>
                    {runtime.RuntimeData.AddFriendReq[i].message}
                </div>
                <div>
                    填写备注：<input id={"addDetail"+runtime.RuntimeData.AddFriendReq[i].sender} className={"beizhu"}/>
                </div>
                <div onClick={()=>{okAddFriend(runtime.RuntimeData.AddFriendReq[i].sender)}} className={"okButton"}>同意</div>
            </div>
            friendReqList.push(temp)
        }
    }
    return <div id={"friendReq"}>
        <div className={"topBar"}>
            <div className={"detailBackButton"} onClick={()=>{
                document.getElementById("friendReq").style.display = 'none'
            }
            }><Return theme="outline" size="4.5vh" fill="#333"/>
            </div>
            <div className={"detailTitle"}>好友请求</div>
        </div>
        {friendReqList}
    </div>
}

function okAddFriend(eid){
    let updReq1 = new XMLHttpRequest();
    updReq1.open('POST',runtime.host+'/updateFriendRel/')
    updReq1.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    let sender = runtime.userEID
    let message = document.getElementById("addDetail"+eid).value
    let sendLoginData=`sender=${sender}&message=${message}&receiver=${eid}`
    updReq1.send(sendLoginData);
    updReq1.onreadystatechange = ()=>{
    }

    let updReq2 = new XMLHttpRequest();
    updReq2.open('POST',runtime.host+'/updateFriendRel/')
    updReq2.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    let sender2 = runtime.userEID
    let message2 = runtime.RuntimeData.userInfo[0].name;
    let sendLoginData2=`sender=${eid}&message=${message2}&receiver=${sender2}`
    updReq2.send(sendLoginData2);
    updReq2.onreadystatechange = ()=>{
    }
    document.getElementById("friendReq").style.display = 'none'
}

function getUserNameByEid(eid){
    let req1 = new XMLHttpRequest()
    req1.open('GET',runtime.host+`/getAllInfo/${eid}`);
    req1.send();
    req1.onreadystatechange = ()=>{
        if(req1.readyState === 4 && req1.status === 200){
            let s = req1.responseText;
            console.log(req1.responseText)
            let data = JSON.parse(s);
            if(data[0].hasOwnProperty('name')){
                runtime.eidToName[eid] = data[0].name;
            }
        }
    }
}

export default FriendReq