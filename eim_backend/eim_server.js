//initialize
const Port = 3001;//设置端口号，一般是3000
const express = require('express');
const { fstat } = require('fs');
const app = express();
const bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
process.env.PORT = Port;

app.use(express.static('public'))//allow browser access resources
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//err catch
process.on('uncaughtException',function(err){}) //监听未捕获的异常
process.on('unhandledRejection',function(err,promise){}) //监听Promise没有被捕获的失败函数

const MongoUrl = "mongodb://localhost:27017/";

//获取主信息的方法
app.get('/getAllInfo/*', (req, res) => {

});

app.post(
    '/register/*',(req,res) =>{
        console.log(req.body);
        MongoClient.connect(MongoUrl, function(err, db) {
            if (err) throw err;
            let dbo =db.db('userInfo');
            let obj = req.body;
            let UserCount;
            dbo.collection('users').find().count( function (err, count){
                if(err) throw err;
                UserCount = count;
                obj['eid'] = 10000+count;
                dbo.collection("users").insertOne(obj,function (err,result){
                    if (err) throw err;
                    console.log("用户注册成功");
                    db.close();
                    res.send('注册成功，你的EID是 '+obj['eid']);
                });
            });
        });

    }
)

app.listen(Port, () => console.log('服务器已就绪，运行在端口'+Port))//输出服务器启动信息