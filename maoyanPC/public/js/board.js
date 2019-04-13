import './header.js';
import {sortByScore} from './tool.js';

$.ajax({
    type: 'get',
    url: '/films/films',
    success: function (data) {
        let boardFilms =  sortByScore(data);
        boardFilms = boardFilms.splice(0, 10);
        fillBoard($('#board'), boardFilms)
    }
})

function fillBoard($element, data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        let actors = actorsName(data[i].actor);
        str += `<dd>
        <i class="board-index board-index-${i+1}">${i+1}</i>
        <a href="/detail.html?id=${data[i]._id}"  class="image-link" data-act="boarditem-click" data-val="">
            <img src="//s0.meituan.net/bs/?f=myfe/mywww:/image/loading_2.e3d934bf.png" alt="" class="poster-default">
            <img alt="" class="board-img" src="http://localhost:3000/upload/${data[i].image}" style="width:160px">
        </a>
        <div class="board-item-main">
            <div class="board-item-content">
                <div class="movie-item-info">
                    <p class="name"><a href="/detail.html?id=${data[i]._id}"  data-act="boarditem-click"
                            data-val="">${data[i].name}</a></p>
                    <p class="star">
                        主演：${actors}
                    </p>
                    <p class="releasetime">上映时间：${data[i].upDate}</p>
                </div>
                <div class="movie-item-number score-num">
                    <p class="score"><i class="integer">${data[i].score[0]}.</i><i class="fraction">${data[i].score[2]}</i></p>
                </div>
            </div>
        </div>
    </dd>`;
    }
    $element.html(str);
}

function actorsName(data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        str += data[i].name;
        if (i < data.length - 1) {
            str += ',';
        }
    }
    return str;
}