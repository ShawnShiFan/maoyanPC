var express = require("express");
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8082");

//验证手机号是否存在
router.get("/", async function(req, res) {
  let phone = req.query.phone;
  let data = await client.get("/users", { phone });
  //存在返回0，不存在返回1
  if (data.length > 0) {
    res.send({
      status: 0
    });
  } else {
    res.send({
      status: 1
    });
  }
});

//登录
router.post("/login", async function(req, res) {
  let { phone, pwd } = req.body;
  let data = await client.get("/users");
  let resData = [];
  data.filter(item => {
    if (item.phone == phone && item.pwd == pwd) {
      resData.push(item);
    }
  });
  //存在返回1，不存在说明密码错误，返回0
  if (resData[0].phone === phone) {
    req.session.user = resData[0];
    res.send({
      status: 1
    });
  } else {
    res.send({
      status: 0
    });
  }
});

//注册
router.post("/", function(req, res) {
  let { phone, pwd } = req.body;
  let data = client.post("/users", { phone, pwd });
  res.send(data);
});

//获取当前用户
router.get("/getSession", function(req, res) {
  res.send(req.session.user || {});
});

//清楚状态
router.get('/removeSession',function(req,res){
  req.session.user = null;
  res.send({status:1});
});

//根据Id查询用户
router.get("/:id", async function(req, res) {
  let id = req.params.id;
  console.log(id)
  let data = await client.get("/users/" + id);
  res.send(data);
});

module.exports = router;
