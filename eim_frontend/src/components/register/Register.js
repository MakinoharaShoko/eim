import './register.css'
import {runtime} from "../../controller/core";
import {DatePicker} from "antd";
import {Return} from "@icon-park/react";

let birthDate ='未设置';

const Register = () => {
    const onChange=(value,string)=>{
        birthDate = string;
        console.log(string)
    }


    return <div id={"register"}>
        <div className={"topBar"}>
            <div className={"detailBackButton"} onClick={()=>{
                document.getElementById('register').style.display = 'none'
            }
            }><Return theme="outline" size="4.5vh" fill="#333"/>
            </div>
            <div className={"detailTitle"}>用户注册</div>
        </div>
        <div>
            <div className={"infoTitle"}>设置昵称</div>
            <input id={"setName"} className={"infoInput"}/>
            <div className={"infoTitle"}>设置密码</div>
            <input id={"setPwd"} className={"infoInput"}/>
            <div className={"infoTitle"}>设置签名</div>
            <input id={"setDetail"} className={"infoInput"}/>
            <div className={"infoTitle"}>设置生日</div>
            <DatePicker onChange={onChange} style={{width:'60%'}}/>
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
    let sendLoginData=`name=${name}&pwd=${pwd}&detail=${detail}&birthDate=${birthDate}`
    registerReq.send(sendLoginData);
    registerReq.onreadystatechange = ()=>{
        if(registerReq.readyState === 4 &&registerReq.status === 200){
            alert(registerReq.responseText)
            document.getElementById("register").style.display = 'none'
        }
    }
}

export {Register}