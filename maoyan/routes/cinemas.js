var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

//影院
router.get('/',async function(req,res){
    let moviesId = req.query.moviesId;
    let data;
    if(moviesId){
        data = await client.get('/match',{submitType:'findJoin',ref:'cinemas','movies.$id':moviesId});
        data = data? data.map(item=>item.cinemas):{};
    }else{
        data = await client.get('/cinemas');
    }
    res.send(data);
})

router.get('/:id',async function(req,res){
    let id = req.params.id;
    let data = await client.get('/cinemas/'+id);
    res.send(data);
})

module.exports = router;