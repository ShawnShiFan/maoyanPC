var express = require("express");
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8082");

//查询喜欢
router.get("/", async function(req, res) {
  let { page, rows, type, value } = req.query;
  let option = {};
  if (type && value) {
    option = { [type]: value };
  }
  let data = await client.get("/like", {
    page,
    rows,
    submitType: "findJoin",
    ref: "articles",
    ...option
  });
  res.send(data);
});

//增加喜欢
router.post("/", async function(req, res) {
  let { userId, articleId } = req.body;
  let data = await client.post("/students", {
    userId,
    articles: { $ref: "articles", $id: articleId }
  });
  res.send(data);
});

//删除喜欢
router.delete("/:id", async function(req, res) {
  let id = req.params.id;
  let data = await client.delete("/like/" + id);
  res.send(data);
});

module.exports = router;