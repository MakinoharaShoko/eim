import './detail.css'
import {runtime} from "../../../controller/core";
import {Return} from "@icon-park/react";
import ReactDOM from "react-dom";

const Detail = ()=>{
    let showEid = runtime.currentDetailShowEid;
    let mark = runtime.EidToMark[showEid];
    let oriName = runtime.eidToName[showEid];
    if(mark === ''){
        mark = oriName;
    }
    let showDetail = runtime.eidToDetail[showEid];
    let toView = <div id={"showDetail"}>
        <div id={"ModelContainer"}/>
        <div className={"topBar"}>
            <div className={"detailBackButton"} onClick={()=>{
                document.getElementById("showDetail").style.display = 'none'
            }
            }><Return theme="outline" size="4.5vh" fill="#333"/>
            </div>
            <div className={"detailTitle"}>好友详情</div>
        </div>
        <div className={"mainDetail"}>
            <span className={"mainMark"}>{mark}</span>
            <span className={"mainEid"}>{"EID: "+showEid}</span>
        </div>
        <div>
            <div className={"detailSingleTitle"}>
                昵称
            </div>
            <div className={"detailSingleContent"}>{oriName}</div>
            <div className={"detailSingleTitle"}>
                签名
            </div>
            <div className={"detailSingleContent"}>{showDetail}</div>
        </div>
        <div className={"detailFoot"}>
            <div className={"f"} onClick={()=>{openMessageView(showEid)}}>
                发消息
            </div>
            <div className={"f"} id={"delRed"} onClick={()=>{deleteFriend(showEid)}}>
                删除好友
            </div>
        </div>
    </div>

    return toView;
}

function openMessageView(eid){
    runtime.currentMessageObject = eid;
    console.log("now showing message from"+eid)
    document.getElementById("MV").style.display = 'block'
    document.getElementById('showDetail').style.display = 'none'
}

function deleteFriend(eid){
    let temp = <div className={"Model"}>
        <div className={"modelMain"}>
            <div className={"delTitle"}>
                确认删除好友？
            </div>
            <div className={"ButtonContainerDel"}>
                <div onClick={()=>{
                    document.getElementById("ModelContainer").style.display = 'none';
                }
                } className={"singleButton ret"}>
                    返回
                </div>
                <div className={"singleButton conf"}>
                    确认
                </div>
            </div>
        </div>
    </div>
    document.getElementById("ModelContainer").style.display = 'block';
    ReactDOM.render(temp,document.getElementById("ModelContainer"))
}

export default Detail;