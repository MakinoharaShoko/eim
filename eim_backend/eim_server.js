//initialize
const Port = 3001;//设置端口号，一般是3000
const express = require('express');
const { fstat } = require('fs');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
process.env.PORT = Port;

app.use(express.static('public'));//allow browser access resources
app.use(cors());//允许跨域访问
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
    let eid = req.url.split('/');
    eid = eid[eid.length-1];
    eid = parseInt(eid);
    MongoClient.connect(MongoUrl,function (err,db) {
        if(err) throw err;
        let dbo = db.db('EIM');
        dbo.collection('users').find({eid:eid}).toArray(function (err,result) {
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
});

app.post(
    '/register/*',(req,res) =>{
        console.log(req.body);
        MongoClient.connect(MongoUrl, function(err, db) {
            if (err) throw err;
            let dbo =db.db('EIM');
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

app.post(
    '/components/*',(req,res)=>{
        let userEID = parseInt(req.body['userID']);
        let pwd = req.body['pwd'];
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo = db.db('EIM');
            dbo.collection('users').find({eid:userEID,pwd:pwd}).toArray((err,result)=>{
                if(result.length!==0){
                    res.send('OK');
                }else{
                    res.send('error');
                }
                db.close();
            })
        })
    }
)

//处理用户发送信息的请求
app.post(
    '/sendMes/*',(req,res) =>{
        console.log(req.body);
        MongoClient.connect(MongoUrl, function(err, db) {
            if (err) throw err;
            let dbo =db.db('EIM');
            let obj = req.body;
            obj['sender'] = parseInt(obj['sender']);
            obj['receiver'] = parseInt(obj['receiver']);
            dbo.collection("messages").insertOne(obj,function (err,result){
                if (err) throw err;
                db.close();
                res.send('OK:\n'+obj.sender+': '+obj.message+'\n to '+obj.receiver);
            });
        });
    }
)

// 处理用户请求添加好友的请求
app.post(
    '/addFriendReq/*',(req,res) =>{
        console.log(req.body);
        MongoClient.connect(MongoUrl, function(err, db) {
            if (err) throw err;
            let dbo =db.db('EIM');
            let obj = req.body;
            obj['sender'] = parseInt(obj['sender']);
            obj['receiver'] = parseInt(obj['receiver']);
            dbo.collection("addReq").insertOne(obj,function (err,result){
                if (err) throw err;
                db.close();
                res.send('OK:\n'+obj.sender+'验证消息: '+obj.message+'\n to '+obj.receiver);
            });
        });
    }
)

//更新好友关系的请求
app.post(
    '/updateFriendRel/*',(req,res) =>{
        console.log(req.body);
        MongoClient.connect(MongoUrl, function(err, db) {
            if (err) throw err;
            let dbo =db.db('EIM');
            let obj = req.body;
            obj['sender'] = parseInt(obj['sender']);
            obj['receiver'] = parseInt(obj['receiver']);
            dbo.collection("friendRel").insertOne(obj,function (err,result){
                if (err) throw err;
                db.close();
                res.send('OK:\n'+obj.sender+'备注: '+obj.message+'\n to '+obj.receiver);
            });
        });
    }
)

//主状态获取函数
app.get(
    '/getMainInfo/*',(req,res) =>{
        let userEID = req.url.split('/')[2];
        userEID = parseInt(userEID);
        MongoClient.connect(MongoUrl,function (err,db){
            if(err) throw err;
            let returnMessage ={};
            let dbo = db.db('EIM');
            //获取个人信息
            dbo.collection('users').find({eid:userEID}).toArray(function (err,result){
                if(err)throw err;
                returnMessage['userInfo'] = result;
                //获取消息列表
                dbo.collection('messages').find({$or:[{sender:userEID},{receiver:userEID}]}).toArray(function (err,result){
                    if(err) throw err;
                    returnMessage['messages'] = result;
                    //获取好友申请列表
                    dbo.collection('addReq').find({receiver:userEID}).toArray((error, result)=>{
                        if(error) throw error;
                        returnMessage['AddFriendReq']=result;
                        //获取好友列表
                        dbo.collection('friendRel').find({sender:userEID}).toArray((err,result)=>{
                            if(err) throw err;
                            returnMessage['friends'] = result;
                            db.close();
                            res.send(returnMessage);
                        })
                    })
                })
            })
        })
    }
)

app.listen(Port, () => console.log('服务器已就绪，运行在端口'+Port))//输出服务器启动信息