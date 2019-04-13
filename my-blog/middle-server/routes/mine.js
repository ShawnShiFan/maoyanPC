var express = require("express");
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8082");

//查询我的文章
router.get("/", async function(req, res) {
  let { page, rows, userId } = req.query;
  let option = {};
  if (userId) {
    option = { ["author"]: userId };
  }
  let data = await client.get("/articles", {
    page,
    rows,
    ...option
  });
  res.send(data);
});

//增加我的文章
router.post("/", async function(req, res) {
  let { title, updateTime, author, type } = req.body;
  let id = req.params.id;
  let data = await client.put("/articles/" + id, {
    title,
    updateTime,
    author,
    type
  });
  res.send(data);
});

//修改我的文章
router.put("/:id", async function(req, res) {
  let { title, updateTime, author, type } = req.body;
  let id = req.params.id;
  let data = await client.put("/articles/" + id, {
    title,
    updateTime,
    author,
    type
  });
  res.send(data);
});

//删除我的文章
router.delete("/:id", async function(req, res) {
  let id = req.params.id;
  let data = await client.delete("/articles/" + id);
  res.send(data);
});

module.exports = router;
