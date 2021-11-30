import './register.css'
import {runtime} from "../../controller/core";

const Register = () => {
    return <div id={"register"}>
        <div className={"registerTitle"}>
            用户注册
        </div>
        <div>
            <div className={"infoTitle"}>设置昵称</div>
            <input id={"setName"} className={"infoInput"}/>
            <div className={"infoTitle"}>设置密码</div>
            <input id={"setPwd"} className={"infoInput"}/>
            <div className={"infoTitle"}>设置签名</div>
            <input id={"setDetail"} className={"infoInput"}/>
        </div>
        <div className={"registerButton"} onClick={sendRegister}>
            注册
        </div>
    </div>
}

function sendRegister(){
    let registerReq = new XMLHttpRequest();
    registerReq.open('POST',runtime.host+'/register/')
    registerReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    let name = document.getElementById('setName').value
    let pwd = document.getElementById("setPwd").value
    let detail=document.getElementById("setDetail").value
    let sendLoginData=`name=${name}&pwd=${pwd}&detail=${detail}`
    registerReq.send(sendLoginData);
    registerReq.onreadystatechange = ()=>{
        if(registerReq.readyState === 4 &&registerReq.status === 200){
            alert(registerReq.responseText)
            document.getElementById("register").style.display = 'none'
        }
    }
}

export {Register}