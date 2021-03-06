let runtime = {
    host:'',
    currentPage:'dialog',
    RuntimeData:{
        userInfo:[
            {
                name:'eim-影',
                eid:9999,
                detail:'一个简单的网页即时通讯（很不安全）',
                birthDate:'未设置'
            }
        ]
    },
    messageList:{},
    userEID:-1,
    EidToMark:{},
    currentMessageObject:'-1',
    eidToName:{},
    eidToDetail:{},
    currentDetailShowEid:'',
    eidToBirth:{}
}

runtime.host=`http://${document.domain}:80`

class Control{
    description='unset';
}


function refContent(){
    let userEID = document.cookie;
    let getUserMain = new XMLHttpRequest();
    // 设置属性
    getUserMain.open('get', runtime.host+'/getMainInfo/'+userEID);

    // 如果想要使用post提交数据,必须添加此行
    // getUserMain.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // 将数据通过send方法传递
    getUserMain.send();

    // 发送并接受返回值
    getUserMain.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (getUserMain.readyState === 4 && getUserMain.status === 200) {
            let AllData = JSON.parse(getUserMain.responseText);
            // let AllData = getUserMain.responseText;
            console.log(AllData);
            runtime.RuntimeData = AllData;
            for (let i = 0; i < AllData.friends.length; i++) {
                runtime.EidToMark[AllData.friends[i].receiver.toString()] = AllData.friends[i].message;
            }
        }
    };

}

function getUserInfo(eid){
    let req1 = new XMLHttpRequest()
    req1.open('GET',runtime.host+`/getAllInfo/${eid}`);
    req1.send();
    req1.onreadystatechange = ()=>{
        if(req1.readyState === 4 && req1.status === 200){
            let s = req1.responseText;
            let data = JSON.parse(s);
            if(data[0].hasOwnProperty('name')){
                runtime.eidToName[eid] = data[0].name;
            }
            if(data[0].hasOwnProperty('detail')){
                runtime.eidToDetail[eid] = data[0].detail;
            }
            if(data[0].hasOwnProperty('birthDate')){
                runtime.eidToBirth[eid] = data[0].birthDate;
            }
        }
    }
}

export {refContent,runtime,Control,getUserInfo}