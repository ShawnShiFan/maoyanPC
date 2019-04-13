var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

router.get('/', async function (req, res) {
    let {
        movieId,
        cinemaId
    } = req.query;
    console.log(movieId)
    if (movieId !=0) {
        let data = await client.get('/match', {
            "movies.$id": movieId,
            "cinemas.$id": cinemaId,
            submitType: "findJoin",
            ref: ["movies", "cinemas"]
        });
        res.send(data.length > 0 ? data[0] : data)
    } else {
        let data = await client.get('/match', {
            "cinemas.$id": cinemaId,
            submitType: "findJoin",
            ref: ["movies","cinemas"]
        });
        res.send(data);
    }

})

router.get('/:id', async function (req, res) {
    let cinemaId = req.params.id;
    let data = await client.get('/match', {
        "cinemas.$id": cinemaId,
        submitType: "findJoin",
        ref: ["movies"]
    });
})

router.post('/', async function (req, res) {
    let id = req.body.id;
    let screens = req.body.screens;
    let data = await client.put("/match/" + id, {
        screens
    });
    res.send({
        status: 1
    })
})

module.exports = router;