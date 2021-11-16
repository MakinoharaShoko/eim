//initialize
const Port = 3001;//设置端口号，一般是3000
const express = require('express');
const { fstat } = require('fs');
const app = express();
process.env.PORT = Port;
app.use(express.static('public'))//allow browser access resources


//err catch
process.on('uncaughtException',function(err){}) //监听未捕获的异常
process.on('unhandledRejection',function(err,promise){}) //监听Promise没有被捕获的失败函数

//获取主信息的方法
app.get('/getAllInfo/*', (req, res) => {

})

app.listen(Port, () => console.log('服务器已就绪，运行在端口'+Port))//输出服务器启动信息