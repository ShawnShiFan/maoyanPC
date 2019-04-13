var express = require("express");
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8082");

//查询所有
router.get("/", async function(req, res) {
  let { page, rows, type, value } = req.query;
  let option = {};
  if (type && value) {
    option = { [type]: value };
  }
  let data = await client.get("/articles", {
    page,
    rows,
    ...option
  });
  console.log(data);
  res.send(data);
});

//增加文章
router.post("/", async function(req, res) {
  let blog = req.body;
  let data = await client.post("/articles", blog);
  res.send(data);
});

//根据Id查询文章
router.get("/:id", async function(req, res) {
  let id = req.params.id;
  let data = await client.get("/articles/" + id);
  // req.session.article = data;
  res.send(data);
});

//修改文章
router.put("/:id", async function(req, res) {
  let id = req.params.id;
  let { title, updateTime, image, type, content } = req.body;
  let data = await client.put("/articles/" + id, {
    title,
    updateTime,
    image,
    type,
    content
  });
  req.session.article = data;
  res.send(data);
});

//文章收藏和喜欢的用户
router.post("/:id", async function(req, res) {
  let id = req.params.id;
  let collectUsers = req.body.collectUsers;
  let likeUsers = req.body.likeUsers;
  let data = await client.put("/articles/" + id, { collectUsers, likeUsers });
  res.send(data);
});

//删除文章
router.delete("/:id", async function(req, res) {
  let id = req.params.id;
  let data = await client.delete("/articles/" + id);
  res.send(data);
});

//返回用户已经选择的文章
router.get("/getArticle", function(req, res) {
  console.log("ok");
  // console.logreq.session.article();
  res.send(req.session.article || {});
});

module.exports = router;
