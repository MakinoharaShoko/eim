import './Login.css'
import {Dialog} from "../main/pages/dialog/Dialog";
import {Contacts} from "../main/pages/contacts/Contacts";
import {My} from "../main/pages/my/My";
import {Nav} from "../main/nav/Nav";
import ReactDOM from "react-dom";
import {refContent, runtime} from "../../controller/core";

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
            <div className={"regButton"}>注册</div>
        </div>
    </div>
}

function hideLoginPage(){
    document.getElementById("eim_login").style.display='none';
    document.getElementById("Main").style.display = 'block';
    document.cookie='10001';
    runtime.userEID=10001;
    setInterval(ref,1500);
    function ref(){
        refContent();
        let page = [
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