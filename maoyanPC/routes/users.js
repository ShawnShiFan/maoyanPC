var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

//验证手机号
router.post('/testPhone', async function (req, res) {
  const phone = req.body.phone;
  let data = await client.get("/users");
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].phone === phone) {
      count++;
    }
  }
  if (count) {
    res.send({
      status: 1
    });
  } else {
    res.send({
      status: 0
    });
  }
})

//验证账号
router.post('/testAccount', async function (req, res) {
  const {
    phone,
    pwd
  } = req.body;
  let data = await client.get('/users');
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].phone === phone && data[i].pwd === pwd) {
      count++;
    }
  }
  if (count) {
    req.session.user = phone;
    res.send({
      status: 1
    });
  } else {
    res.send({
      status: 0
    });
  }
})

router.post('/register', async function (req, res) {
  const {
    phone,
    pwd
  } = req.body;
  console.log(phone)
  let data = await client.post('/users', {
    phone,
    pwd
  });
  res.send({status:1})
})
module.exports = router;