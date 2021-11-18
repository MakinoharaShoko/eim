import './Login.css'

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
}

export {Login}