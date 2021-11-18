let runtime = {
    host:'localhost:3001'
}




function refContent(){
    let userEID = document.cookie;
    let getUserMain = new XMLHttpRequest();
    // 设置属性
    getUserMain.open('get', 'http://'+runtime.host+'/getMainInfo/'+userEID);

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
        }
    };

}

export {refContent,runtime};