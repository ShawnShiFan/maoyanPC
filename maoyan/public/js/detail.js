import './header.js';
import {
    queryString
} from './tool.js';

let id = queryString();
let movie;
$.ajax({
    type: 'get',
    url: '/films/' + id,
    success: function (data) {
        movie = data;
        let src = data.image
        $('#avatar-shadow').html(`<img class="avatar" src="http://localhost:3000/upload/${src}" alt=""><div class="movie-ver"><i class="imax3d"></i></div>`)
        $('#filmName').html(data.name);
        $('#filmEname').html(data.ename);
        $('#type').html(data.type);
        $('#area').html(data.area);
        $('#upDate').html(data.upDate);
        $('#score').html(data.score);
        $('#count').html(data.count);
        $('#intro').html(data.intro);
        $('.buy').attr('href', `/cinemas.html?movieId=${id}`)
        fillDirector($('#directors'), data.director);
        fillActors($('#actors'), data.actor);
        fillImages($('#images'), data.images);
        fillComments($('#comments'), data.comments);
    }
})

function fillDirector($element, data) {
    let str = data.map((item) => {
        let director = item.director || item;
        return `<li class="celebrity " data-act="celebrity-click" data-val="{celebrityid:399616}">
        <a href="javascript:;" target="_blank" class="portrait">
            <img class="default-img" alt="" src="http://localhost:3000/upload/${director.image}">
        </a>
        <div class="info">
            <a href="javascript:;">
                ${director.name}
            </a>
        </div>
    </li>`
    }).join('');
    $element.html(str);
}

function fillActors($element, data) {
    let str = data.map((item) => {
        let actor = item.actor || item;
        return `<li class="celebrity actor" data-act="celebrity-click" data-val="{celebrityid:7463}">
        <a href="" target="_blank" class="portrait">
            <img class="default-img" alt="" src="http://localhost:3000/upload/${actor.image}">
        </a>
        <div class="info">
            <a href="" target="_blank" class="name">
                ${actor.name}
            </a>
            <br><span class="role">${actor.filmName}</span>
        </div>
    </li>`
    }).join('');
    $element.html(str);
}

function fillImages($element, data) {
    let str = `<div class="img1"><img class="default-img" src="http://localhost:3000/upload/${data[0].src}"
    alt=""></div>
<div class="img2"><img class="default-img" src="http://localhost:3000/upload/${data[1].src}"
    alt=""></div>
<div class="img3"><img class="default-img" src="http://localhost:3000/upload/${data[2].src}"
    alt=""></div>
<div class="img4"><img class="default-img" src="http://localhost:3000/upload/${data[3].src}"
    alt=""></div>
<div class="img5"><img class="default-img" src="http://localhost:3000/upload/${data[4].src}"
    alt=""></div>`;
    $element.html(str);
}

function fillComments($element, data) {
    let str = data.map((item) => {
        let comment = item.comment || item;
        return `<li class="comment-container " data-val="{commentid:1060197694}">
        <div class="portrait-container">
            <div class="portrait">
                <img src="https://vfile.meituan.net/maoyanuser/6aa7ea580feb23de0052505e25a218924264.jpg@100w_100h_1e_1c"
                    alt="">
            </div>
            <i class="level-5-icon"></i>
        </div>
        <div class="main">
            <div class="main-header clearfix">
                <div class="user">
                    <span class="name">${comment.name}</span>
    
                    <span class="tag">购</span>
                </div>
                <div class="time" title="">
                    <span title="">${comment.time}</span>
                    <ul class="score-star clearfix" data-score="10">
                        <li>
                            <i class="half-star left active"></i><i class="half-star right active"></i>
                        </li>
                        <li>
                            <i class="half-star left active"></i><i class="half-star right active"></i>
                        </li>
                        <li>
                            <i class="half-star left active"></i><i class="half-star right active"></i>
                        </li>
                        <li>
                            <i class="half-star left active"></i><i class="half-star right active"></i>
                        </li>
                        <li>
                            <i class="half-star left active"></i><i class="half-star right active"></i>
                        </li>
                    </ul>
    
                </div>
                <div class="approve " data-id="1060197694">
                    <i data-act="comment-approve-click" class="approve-icon"></i><span
                        class="num">5319</span>
                </div>
            </div>
            <div class="comment-content">${comment.content}</div>
        </div>
    </li>`
    }).join('');
    $element.html(str);
}

$('#writeComment').on('click', function () {
    $('#comment-box').css({
        display: 'block'
    })
})

$('#close').on('click', function () {
    $('#comment-box').css({
        display: 'none'
    })
})

$('#submit').on('click', function () {
    if ($('#comment-input').val()) {
        let time = Date();
        $.ajax({
            type: 'get',
            url: '/getSession',
            success: function (data) {
                if (data) {
                    movie.comments.push({
                        name: data,
                        time: time,
                        content: $('#comment-input').val()
                    });
                    $.ajax({
                        type: 'put',
                        url: '/films',
                        data: {
                            id: id,
                            data: movie,
                            movie:JSON.stringify(movie.comments)
                        },
                        success: function () {
                            location.href = `/detail.html?id=${id}`
                        }
                    })
                } else {
                    location.href = '/login.html'
                }
            }
        })
    } else {
        alert('输入不能为空')
    }
})