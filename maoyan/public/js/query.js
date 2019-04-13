import './header.js';
import {
    queryString
} from './tool.js';

let infor = decodeURI(queryString());

$('#search-form').html(`<input class="kw" type="text" name="kw" maxlength="32" value="${infor}" placeholder="找影视剧、影人、影院" autocomplete="off" >
    <button class="submit" type="submit"></button>`);

if (!infor) {
    $('#result').html(`<div class="empty-list">

    <h3>很抱歉，没找到相关的影视剧</h3>
    <dl>
      <dt>小喵建议您：</dt>
      <dd>1. 请检查输入的关键词是否有误</dd>
      <dd>2. 请缩短关键词</dd>
    </dl>
  </div>`);
} else {
    $.ajax({
        type: 'get',
        url: '/query/movies' + infor,
        success: function (data) {
            $('#movies').html(`影视剧（${data.length}）`)
            fillMovies($(moviesResult), data);
        }
    })
    $.ajax({
        type: 'get',
        url: '/query/cinemas' + infor,
        success: function (data) {
            $('#cinemas').html(`影院（${data.length}）`)
            fillCinemas($(cinemasResult), data);
        }
    })
}

$('.navbar a').on('click', function () {
    let element = $(this);
    for (let i = 0; i < $('#navbar a').length; i++) {
        $($('#navbar a')[i]).removeClass('active');
        $('#result .search-result-box').addClass('hidden')
        if (element.attr('id') === $($('#navbar a')[i]).attr('id')) {
            $($('#result .search-result-box')[i]).removeClass('hidden');
        }
    }
    $(this).addClass('active');
})

function fillMovies($element, data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        str += ` <dd>
        <div class="movie-item">
            <a href="/detail.html?id=${data[i]._id}" target="_blank" data-act="movie-click" data-val="{movieid:1250341}">
                <div class="movie-poster">
                    <img class="poster-default" src="//s0.meituan.net/bs/?f=myfe/mywww:/image/loading_2.e3d934bf.png">
                    <img src="http://localhost:3000/upload/${data[i].image}">
                </div>
            </a>
            <div class="channel-action channel-action-sale">
                <a>购票</a>
            </div>


            <div class="movie-ver"></div>
        </div>
        <div class="channel-detail movie-item-title" title="">
            <a href="/detail.html?id=${data[i]._id}" target="_blank" data-act="movies-click" data-val="{movieId:1250341}">${data[i].name}</a>
        </div>
        <div class="movie-item-subtitle">${data[i].name}</div>
        <div class="absolute-info">
            <div class="channel-detail channel-detail-orange"><i class="integer">${data[i].score[0]}.</i><i class="fraction">${data[i].score[2]}</i></div>

            <div class="movie-item-cat">剧情,动画,奇幻</div>
            <div class="movie-item-pub">${data[i].upDate}</div>
        </div>

    </dd>`
    }
    $element.html(str);
}

function fillCinemas($element, data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<li>
        <div class="item-price">
            <b><span class="stonefont">22.7</span></b>元起
        </div>
        <div class="item-title">
            <a href="/cinemas.html" target="_blank">${data[i].name}</a>
        </div>
        <div class="item-detail item-detail-gray">${data[i].address}</div>
        <div class="item-detail item-detail-icons">
            <i class="icon-zuo">座</i>
            <i class="icon-chi">小吃</i>
        </div>
    </li>`
    }
    $element.html(str);
}