import "./Dialog.css"
import {runtime} from "../../../../controller/core";

function Dialog(){
    //归类来自各个人的会话
    let AllDialog = runtime.RuntimeData.messages;
    console.log("all message:")
    console.log(AllDialog)
    console.log(runtime.userEID)
    if(AllDialog){
        runtime.messageList = {};
        for (let i = 0; i < AllDialog.length; i++) {
            if(AllDialog[i].sender === runtime.userEID){
                //发送者是用户
                let DialogIndex = AllDialog[i].receiver.toString();
                if(!runtime.messageList[DialogIndex]){
                    runtime.messageList[DialogIndex]=[];
                }
                runtime.messageList[DialogIndex].push(AllDialog[i])
            }else
            {
                // 接受者是用户
                let DialogIndex = AllDialog[i].sender.toString();
                if(!runtime.messageList[DialogIndex]){
                    runtime.messageList[DialogIndex]=[];
                }
                runtime.messageList[DialogIndex].push(AllDialog[i])
            }
        }
    }
    console.log("runtimeMessageAll:")
    console.log(runtime.messageList);
    //开始处理会话渲染
    let toDialogView=[];
    for(let p in runtime.messageList){
        let showNameString = p;
        if(runtime.EidToMark[p]){
            showNameString = runtime.EidToMark[p];
        }
        let temp = <div className={"singleDialog"}>
            <div className={"dialogObject"}>
                {showNameString}
            </div>
            <div className={"dialogContent"}>
                {runtime.messageList[p][runtime.messageList[p].length-1].message}
            </div>
        </div>
        toDialogView.push(temp)
    }
    return <div id={"dialog"}>
        {toDialogView}
    </div>
}

export {Dialog};