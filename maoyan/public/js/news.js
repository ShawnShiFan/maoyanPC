import './header.js';

$.ajax({
    type:'get',
    url:'/news',
    success:function(data){
        fillNews($('#news'),data);
    }
})

function fillNews($element,data){
    let str = data.map((item) => {
        let news = item.news || item;
        return `<div class="latest-news-box">
        <a href="/newsDetail.html?id=${news._id}" target="_blank" data-act="news-click" data-val="{newsid:58777}">
            <img src="http://localhost:3000/upload/${news.imageText[0].image}"
                alt="">
        </a>
        <p class="latest-news-title">
            <a href="/films/news/58777" class="two-line" title=""
                target="_blank" data-act="news-click" data-val="{newsid:58777}">
                ${news.title}
            </a>
        </p>
        <div class="info-container">
            <span>猫眼电影</span>
            <span class="images-view-count view-count">19</span>
        </div>
    </div>`
    }).join('');
    $element.html(str);
}
