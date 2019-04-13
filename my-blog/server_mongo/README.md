# nodejs服务器模块

## 介绍

> 自动创建nodejs服务器，该服务器封装调用数据库的接口。

## 安装

* 下载插件

```
npm install -g ykt-server-cli
```

* 在命令行中运行server命令

```
server
```
*执行该命令后，选择连接的数据库，目前提供mongodb和mysql数据库。选择后会在当前目录下生成一个nodejs服务器的目录，名字为server_mongo或server_mysql。注意，如果该目录下已有该名称的目录或文件，则无法生成，需要先将该名称的目录或文件删除，也可以换一个其他目录再执行server命令。*

* 进入目录，下载依赖的插件

```
cd server_mongo 或 cd server_mysql
npm install
```

## 使用

* 启动服务器

```
npm start
```
*如果是window系统，可以执行项目根目录下的start.bat文件。*

*服务器默认在3000端口下启动。*

* 修改启动端口

打开package.json文件，修改port属性。（切勿和其他应用的端口冲突）

* 修改数据库连接配置

根据选择连接的数据库，请自行安装。

打开package.json文件，修改db属性。

## api

服务器的请求说明请参看项目中附带的api.xlsx
