var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

//资讯
router.get('/',async function(req,res){
    let data = await client.get('/news');
    res.send(data);
})

router.get('/:id',async function(req,res){
    let id = req.params.id;
    let data = await client.get('/news/'+id);
    res.send(data);
})

module.exports = router;