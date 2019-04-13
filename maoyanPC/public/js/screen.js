import './header.js';
import {
    querystring
} from './tool.js';

let movieId = querystring().movieId;
let cinemaId = querystring().cinemaId;

$.ajax({
    type: 'get',
    url: '/screen',
    data: {
        movieId: 0,
        cinemaId: cinemaId
    },
    success: function (data) {
        let arr = [];
        for(let i = 0;i < data.length;i++){
            arr.push(data[i].movies);
        }
        fillPosters($('#posters'), arr);
        fillScreens();

    }
})

function fillScreens() {
    $.ajax({
        type: 'get',
        url: '/screen',
        data: {
            movieId: movieId,
            cinemaId: cinemaId
        },
        success: function (data) {
            if (data.screens) {
                let str = '';
                for (let i = 0; i < data.screens.length; i++) {
                    str += `<tr class="">
                <td>
                    <span class="begin-time">${data.screens[i].time}</span>
                    <br>
                </td>
                <td>
                    <span class="lang">英语3D</span>
                </td>
                <td>
                    <span class="hall">${data.screens[i].name}</span>
                </td>
                <td>
                    <span class="sell-price"><span class="stonefont">${data.screens[i].price}</span></span>
                </td>
                <td>
                    <a href="/chooseSeats.html?movieId=${movieId}&cinemaId=${cinemaId}&screenIndex=${i}" class="buy-btn normal"
                        data-tip="" data-act="show-click" data-bid="b_gvh3l8gg" data-val="{movie_id: 341139, cinema_id:16399}">选座购票</a>
                </td>
            </tr>`
                }
                $('table tbody').html(str);
            } else {
                $('table tbody').html('');
            }
        }
    })
}

function fillPosters($element, data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        if (!movieId) {
            movieId = data[0]._id;
        }
        if (data[i]._id === movieId) {
            str += `<div class="movie active" data-index="1" data-id="${data[i]._id}">
        <img src="http://localhost:3000/upload/${data[i].image}"
            alt="">
    </div>`;
            fillInfor($('#movie-info'), data[i])
        } else {
            str += `<div class="movie " data-index="1" data-id="${data[i]._id}">
        <img src="http://localhost:3000/upload/${data[i].image}"
            alt="">
    </div>`;
        }
    }
    $element.html(str);
    $('.movie').on('click', function () {
        movieId = $(this).attr('data-id');
        fillPosters($('#posters'), data);
        fillScreens();
    })
}

function fillCinemas() {
    $.ajax({
        type: 'get',
        url: '/cinemas/' + cinemaId,
        success: function (data) {
            $('.cinema-brief-container .name').html(`${data.name}`);
            $('.cinema-brief-container .address').html(`${data.address}`);
            $('.cinema-brief-container .telphone').html(`${data.tel}`);
        }
    })
}
fillCinemas()

function fillInfor($element, data) {
    $element.html(`<div>
    <h3 class="movie-name">${data.name}</h3>

    <span class="score sc">${data.score}</span>

</div>

<div class="movie-desc">
    <div>
        <span class="key">时长 :</span>
        <span class="value">${data.area}</span>
    </div>
    <div>
        <span class="key">类型 :</span>
        <span class="value"> ${data.type} </span>
    </div>
    <div>
        <span class="key">主演 :</span>
        <span class="value"> ${data.actor[0].name}</span>
    </div>
</div>`)
}