import './addnew.css'
import {Button, Input} from 'antd';
import 'antd/dist/antd.css';
import {runtime} from "../../../../../controller/core";

const AddNew = () => {
    return <div id={"addNew"}>
        <Input placeholder="对方EID" id={"oUID"}/>
        <Input placeholder="验证消息" id={"oMessage"}/>
        <Button type="primary" onClick={sendAddReq}>发送请求</Button>
    </div>
}

function sendAddReq(){
    let addFriendReq = new XMLHttpRequest();
    addFriendReq.open('POST',runtime.host+'/addFriendReq/')
    addFriendReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    let uid = document.getElementById('oUID').value
    let fromUID = runtime.userEID.toString()
    let message=document.getElementById("oMessage").value
    let sendLoginData=`sender=${fromUID}&message=${message}&receiver=${uid}`
    addFriendReq.send(sendLoginData);
    addFriendReq.onreadystatechange = ()=>{
        if(addFriendReq.readyState === 4 &&addFriendReq.status === 200){
            alert(`好友请求已发送`)
            document.getElementById("addNew").style.display = 'none'
        }
    }

}

export default AddNew;