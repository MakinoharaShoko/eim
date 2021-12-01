let runtime = {
    host:'http://localhost:3001',
    currentPage:'dialog',
    RuntimeData:{
        userInfo:[
            {
                name:'eim-影',
                eid:9999,
                detail:'一个简单的网页即时通讯（很不安全）'
            }
        ]
    },
    messageList:{},
    userEID:-1,
    EidToMark:{},
    currentMessageObject:'-1',
    eidToName:{},
}

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

export {refContent,runtime,Control}