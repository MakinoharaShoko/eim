import './friendReq.css'
import {runtime} from "../../../../../controller/core";

const FriendReq = () =>{
    let friendReqList=[];
    if(runtime.RuntimeData.hasOwnProperty('AddFriendReq')){
        for (let i = 0; i < runtime.RuntimeData.AddFriendReq.length; i++) {
            let temp =<div>
                <div>
                    {runtime.RuntimeData.AddFriendReq[i].sender}
                </div>
                <div>
                    {runtime.RuntimeData.AddFriendReq[i].message}
                </div>
                <div>
                    设置备注名：<input id={"addDetail"+runtime.RuntimeData.AddFriendReq[i].sender}/>
                </div>
                <div onClick={()=>{okAddFriend(runtime.RuntimeData.AddFriendReq[i].sender)}}>同意</div>
            </div>
            friendReqList.push(temp)
        }
    }
    return <div id={"friendReq"}>
        <div onClick={()=>{
            document.getElementById("friendReq").style.display = 'none'
        }
        }>关闭</div>
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

export default FriendReq