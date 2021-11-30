import './Login.css'
import {Dialog} from "../main/pages/dialog/Dialog";
import {Contacts} from "../main/pages/contacts/Contacts";
import {My} from "../main/pages/my/My";
import {Nav} from "../main/nav/Nav";
import ReactDOM from "react-dom";
import {refContent, runtime} from "../../controller/core";
import MessageView from "../main/messageView/MessageView";

function Login(props){
    return <div id={"eim_login"}>
        <div id={"title"}>eim</div>
        <div id={"loginInputContainer"}>
            <div id={"eid"}>
                <input id={"eidInput"} className={"loginInput"}/>
            </div>
            <div id={"pwd"}>
                <input id={"pwdInput"} className={"loginInput"} type={"password"} />
            </div>
            <div className={"loginButton"} onClick={hideLoginPage}>
                登录
            </div>
            <div className={"regButton"} onClick={showRegister}>注册</div>
        </div>
    </div>
}

function showRegister(){
    document.getElementById("register").style.display = 'block';
}

function hideLoginPage(){
    let loginReq = new XMLHttpRequest();
    loginReq.open('POST',runtime.host+'/login/')
    loginReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    let eid = document.getElementById('eidInput').value
    let pwd = document.getElementById("pwdInput").value
    let sendLoginData=`userID=${eid}&pwd=${pwd}`
    loginReq.send(sendLoginData);
    loginReq.onreadystatechange = ()=>{
        if(loginReq.readyState === 4 &&loginReq.status === 200){
            if(loginReq.responseText === 'OK'){
                document.getElementById("eim_login").style.display='none';
                document.getElementById("Main").style.display = 'block';
                document.cookie=eid
                runtime.userEID=parseInt(eid);
                setInterval(ref,1500);
            }else {
                alert("登陆失败（暂时还没做界面）")
            }
        }
    }
    function ref(){
        refContent();
        let page = [
            <MessageView uid={runtime.currentMessageObject}/>,
            <Dialog/>,
            <Contacts/>,
            <My/>,
            <Nav/>
        ]
        console.log('rendering')
        ReactDOM.render(<div>{page}</div>,document.getElementById('Main'))
    }
}

export {Login}