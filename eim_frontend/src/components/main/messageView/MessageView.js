import './messageView.css'
import {runtime} from "../../../controller/core";

const MessageView = (props)=>{
    if(props.uid ==='-1'){
        return <div id={"MV"}> </div>
    }
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
            messageViewShow.push(temp)
        }
    }

    return <div id={"MV"}>
        {messageViewShow}
    </div>
}

export default MessageView