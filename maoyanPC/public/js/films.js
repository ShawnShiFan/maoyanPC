import './header.js';
import {sortByScore} from './tool.js';

$.ajax({
    type: 'get',
    url: '/films/films',
    success: function (data) {
        let data2 = sortByScore(data);
        pagination($('#pages'), data2);
    }
})

function pagination($element, data) {
    let renderData;
    let num1 = 6;
    let page = 1;
    let num2;
    let x;

    function getRenderData() {
        //判断当前选择的页码对应的电影数量
        if (data.length - num1 * (page - 1) >= num1) {
            num2 = 6;
        } else {
            num2 = data.length - num1 * (page - 1);
        }
        renderData = data.slice(num1 * (page - 1), num2 + num1 * (page - 1));
        return renderData;
    }
    x = getRenderData();
    fillFilms($('#fillFilms'), x);

    //根据电影数量生成页码
    const creatPages = function () {
        $element.html('');
        let str = '';
        for (let i = 0; i < Math.ceil(data.length / num1); i++) {
            if(i === 0){
                str += ` <button data-page="${i+1}" class="page active">${i+1}</button>`
            }else{
                str += ` <button data-page="${i+1}"  class="page">${i+1}</button>`
            }
        }
        $element.html(str);
    }
    creatPages();

    //绑定向前翻页事件
    prev.onclick = function () {
        if (page > 1) {
            page--;
            x = getRenderData();
            fillFilms($('#fillFilms'), x);
        }
        showButton();
        changeActice(page)
    }

    //绑定向后翻页事件
    next.onclick = function () {
        if (page < Math.ceil(data.length / num1)) {
            page++;
            x = getRenderData();
            fillFilms($('#fillFilms'), x);
        }
        showButton();
        changeActice(page)
    }

    //绑定点击页码渲染相应的数据事件
    pages.addEventListener('click', function (e) {
        page = e.target.getAttribute('data-page');
        x = getRenderData();
        fillFilms($('#fillFilms'), x);
        showButton();
        changeActice(page)
    })

    function showButton() {
        if (page < Math.ceil(data.length / num1)) {
            next.style.display = 'inline-block';
        } else {
            next.style.display = 'none';
        }
        if (page > 1) {
            prev.style.display = 'inline-block';
        } else {
            prev.style.display = 'none';
        }

    }
    showButton();

    function changeActice(page){
        for(let i = 0;i < $('.page').length;i++){
            $($('.page')[i]).removeClass('active');
            $($('.page')[page-1]).addClass('active');
        }
    }
    
}

function fillFilms($element, data) {
    let str = data.map((item) => {
        let films = item.films || item;
        return `<dd>
        <div class="movie-item">
            <a href="/detail.html?id=${films._id}" target="_blank" data-act="movie-click" >
                <div class="movie-poster">
                    <img class="poster-default" src="//s0.meituan.net/bs/?f=myfe/mywww:/image/loading_2.e3d934bf.png">
                    <img src="http://localhost:3000/upload/${films.image}">
                </div>
            </a>
            <div class="channel-action channel-action-sale">
                <a>购票</a>
            </div>
            <div class="movie-ver"></div>
        </div>
        <div class="channel-detail movie-item-title" title="">
            <a href="javascript:;" target="_blank" data-act="movies-click" >${films.name}</a>
        </div>
        <div class="channel-detail channel-detail-orange"><i class="integer">${films.score[0]}.</i><i class="fraction">${films.score[2]}</i></div>
    </dd>`
    }).join('');
    $element.html(str);
}