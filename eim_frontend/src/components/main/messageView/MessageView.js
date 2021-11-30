import './messageView.css'
import {runtime} from "../../../controller/core";
import {Return} from "@icon-park/react";

const MessageView = (props)=>{
    console.log("MV showing" + props.uid)
    let dialogObject=props.uid;
    let messageViewShow=[];
    if(runtime.messageList.hasOwnProperty(dialogObject)){
        for (let i = 0; i < runtime.messageList[dialogObject].length; i++) {
            let tempMessage = runtime.messageList[dialogObject][i]
            let message = tempMessage.message;
            let temp;
            if(tempMessage.sender === runtime.userEID){
                temp = <div className={"rightMessage"}>{message}</div>
            }else{
                temp = <div className={"leftMessage"}>{message}</div>
            }
            let temp2 = <div className={"singleMessageWrapper"}>{temp}</div>
            messageViewShow.push(temp2)
        }
    }

    return <div id={"MV"}>
        <div className={"dialogTop"}>
            <div className={"closeMV"} onClick={closeMV}>
                <Return theme="outline" size="24" fill="#333"/>
            </div>
            <div className={"MessageObjectName"}>{runtime.EidToMark[props.uid]}</div>
        </div>
        <div className={"messageContainer"}>
            <div className={"sendMessageMain"}>
                <input id={"messageSendInput"}/>
                <span className={"sendButton"} onClick={messageSend}>发送</span>
            </div>
            {messageViewShow}
        </div>
    </div>
}

function closeMV(){
    document.getElementById("MV").style.display = 'none';
}

function messageSend(){
    let msReq = new XMLHttpRequest();
    msReq.open('POST',runtime.host+'/sendMes/')
    msReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    let sender = runtime.userEID
    let message = document.getElementById("messageSendInput").value
    document.getElementById("messageSendInput").value = '';
    let receiver= runtime.currentMessageObject;
    let sendLoginData=`sender=${sender}&message=${message}&receiver=${receiver}`
    msReq.send(sendLoginData);
    msReq.onreadystatechange = ()=>{
    }
}

export default MessageView