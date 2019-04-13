var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

router.get('/getSession',function(req,res){
    res.send(req.session.user);
});

//热播电影
router.get('/hitMovies',async function(req,res){
    let option = {};
    let data = await client.get('/hitMovies', {
        submitType: "findJoin",
        ref: "movies",
        ...option
    });
    res.send(data);
})

//即将上映
router.get('/upcomingMovies',async function(req,res){
    let option = {};
    let data = await client.get('/upcomingMovies', {
        submitType: "findJoin",
        ref: "movies",
        ...option
    });
    res.send(data);
})
module.exports = router;
