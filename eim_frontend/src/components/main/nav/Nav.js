import "./Nav.css"

function Nav(){
    return <div id={"nav"}>
        <div className={"singleNavElement"} onClick={()=>{
            switchTab('dialog')
        }}>会话</div>
        <div className={"singleNavElement"} onClick={()=>{
            switchTab('contacts')
        }}>好友</div>
        <div className={"singleNavElement"} onClick={()=>{
            switchTab('my')
        }}>我的</div>
    </div>
}

function switchTab(tab){
    document.getElementById('dialog').style.display = 'none';
    document.getElementById('contacts').style.display = 'none';
    document.getElementById('my').style.display = 'none';
    document.getElementById(tab).style.display = 'block';
}
export {Nav};