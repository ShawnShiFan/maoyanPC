var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

//电影
router.get('/films', async function (req, res) {
    let data = await client.get("/movies");
    res.send(data);
})

//根据id查询电影
router.get('/:id',async function(req,res){
    const id = req.params.id;
    let data = await client.get("/movies/" + id);
    res.send(data);
})

router.put('/',async function(req,res){
    const id = req.body.id;
    const comments = req.body.movie;
    let data = await client.put("/movies/" + id,{comments});
    res.send({status:1})
})

module.exports = router;