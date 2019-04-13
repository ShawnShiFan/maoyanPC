var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

//模糊查询电影
router.get('/movies:infor', async function (req, res) {
    let infor = req.params.infor;
    let option = {};
    option = {
        ['name']: infor
    }
    let data = await client.get("/movies", {
        ...option
    });
    res.send(data);
})

//模糊查询影院
router.get('/cinemas:infor', async function (req, res) {
    let infor = req.params.infor;
    let option = {};
    option = {
        ['name']: infor
    }
    let data = await client.get("/cinemas", {
        ...option
    });
    res.send(data);
})


module.exports = router;