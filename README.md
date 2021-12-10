# eim
简单的网页端即时聊天工具

**注意：没有加密，没有验证，全部信息明文传输，没有防注入，仅供作为人机交互课程设计作业的参考方案。**

前端：React

后端：Node.js

数据库：MongoDB

要求：安装mongoDB和node.js

## 安装：

```
(ubuntu)
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install mongodb
```

#### Windows 需要手动安装最新版本的 Node.js 和 MongoDB（无需配置）

如果 `npm install`速度较慢，可尝试换源（国内淘宝源）

```
npm config set registry https://registry.npmmirror.com/
```



## 运行：

```
(任何系统)
sh start.sh
```

#### Windows系统可以尝试

（依次运行）

```
npm install yarn -g
cd eim_frontend
yarn install
yarn run build
cp ./build/* ../eim_backend/public
cd ../
cd eim_backend
yarn install
yarn run server
```

