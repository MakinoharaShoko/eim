import "./My.css"
import {runtime} from "../../../../controller/core";

function My() {
    return <div id={"my"}>
        <div className={"topBar"}>
            <div className={"detailTitle"}>我的</div>
        </div>
        <div className={"My_name"}>
            {runtime.RuntimeData.userInfo[0].name}
            <span className={"My_Eid"}>
            {runtime.RuntimeData.userInfo[0].eid}
        </span>
        </div>
        <div className={"My_detail_title"}>
            个性签名
        </div>
        <div className={"My_detail"}>
            {runtime.RuntimeData.userInfo[0].detail}
        </div>
        <div className={"My_detail_title"}>
            生日
        </div>
        <div className={"My_detail"}>
            {runtime.RuntimeData.userInfo[0].birthDate}
        </div>
    </div>
}

export {My}