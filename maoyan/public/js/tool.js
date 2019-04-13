function queryString() {
    let str = window.location.search;
    let arr = [];
    arr.push(str.split('='));
    return arr[0][1];
}

function querystring() {
    let str = window.location.search;
    let params = {};
    if (str.indexOf('?') >= 0) {
        let search = str.substring(str.indexOf('?') + 1);
        let searchObj = search.split('&');
        for (let item of searchObj) {
            let itemObj = item.split('=');
            params[itemObj[0]] = itemObj[1];
        }
    }
    return params;
}

function sortByScore(data) {
    let scores = [];
    let boardFilms = [];
    for (let i = 0; i < data.length; i++) {
        scores.push(data[i].score)
    }
    scores.sort(function (a, b) {
        return b - a;
    })
    for (let i = 0; i < scores.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (scores[i] === data[j].score) {
                boardFilms.push(data[j]);
                break;
            }
        }
    }
    return boardFilms;
}

export {
    sortByScore,
    queryString,
    querystring
}