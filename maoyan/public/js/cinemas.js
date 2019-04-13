import './header.js';
import {queryString} from './tool.js';

let moviesId = queryString();

$.ajax({
    type:'get',
    url:'cinemas',
    data:{
        moviesId:moviesId
    },
    success:function(data){
        fillCinemas($('#cinemas'),data)
    }
})


function fillCinemas($element, data){
    let str = data.map((item) => {
        let cinema = item.cinema || item;
        return ` <div class="cinema-cell">
        <div class="cinema-info">
            <a href="/cinema/16399?poi=116635566" class="cinema-name" data-act="cinema-name-click" data-bid="b_4tkpau4m"
                data-val="{city_id: 59, cinema_id: 16399}">${cinema.name}</a>
            <p class="cinema-address">${cinema.address}</p>
        </div>

        <div class="buy-btn">
            <a href="/screen.html?movieId=${moviesId||''}&cinemaId=${cinema._id}" data-act="buy-btn-click" data-val="{city_id: 59, cinema_id: 16399}"
                data-bid="b_4tkpau4m">选座购票</a>
        </div>

        <div class="price">
            <span class="rmb red">￥</span>
            <span class="price-num red"><span class="stonefont">22元</span></span>
            <span>起</span>
        </div>
    </div>`
    }).join('');
    $element.html(str);
}