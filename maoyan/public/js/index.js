import './header.js';

$.ajax({
    type: 'get',
    url: '/hitMovies',
    success: function (data) {
        $('#totalHit').html(`正在热映（${data.length}部）`)
        hitMovies($('#hitMovies'), data);
    }
})

$.ajax({
    type: 'get',
    url: '/upcomingMovies',
    success: function (data) {
        $('#totalUpcoming').html(`即将上映（${data.length}部）`)
        upcomingMovies($('#upcomingMovies'), data);
    }
})

function upcomingMovies($element, data) {
    let str = data.map((item) => {
        let film = item.film || item;
        return `<dd>
        <div class="movie-item">
            <a href="/detail.html?id=${film.movies._id}" target="_blank" data-act="upcomingMovie-click"
                data-val="{movieid:1257071}">
                <div class="movie-poster">
                    <img class="poster-default" src="//s0.meituan.net/bs/?f=myfe/mywww:/image/loading_2.e3d934bf.png">
                    <img src="http://localhost:3000/upload/${film.movies.image}">
                    <div class="movie-overlay movie-overlay-bg">
                        <div class="movie-info">
                            <div class="movie-title" title="">${film.movies.name}</div>
                        </div>
                    </div>
                </div>
            </a>
            <div class="movie-detail movie-wish"><span class="stonefont"></span>人想看</div>
            <div class="movie-detail movie-detail-strong movie-presale">
                <a class="movie-presale-sep">预告片
                </a><a data-act="presaleUpcomingMovie-click">预
                    售</a>
            </div>
            <div class="movie-ver"></div>
        </div>
        <div class="movie-detail movie-rt">${film.movies.upDate}</div>

    </dd>`
    }).join('');
    $element.html(str);
}

function hitMovies($element, data) {
    let str = data.map((item) => {
        let film = item.film || item;
        return `<dd>
        <div class="movie-item">
            <a href="/detail.html?id=${film.movies._id}" target="_blank" data-act="playingMovie-click" data-val="{movieid:341139}">
                <div class="movie-poster">
                    <img class="poster-default" src="//s0.meituan.net/bs/?f=myfe/mywww:/image/loading_2.e3d934bf.png">
                    <img src="http://localhost:3000/upload/${film.movies.image}">
                    <div class="movie-overlay movie-overlay-bg">
                        <div class="movie-info">
                            <div class="movie-score"><i class="integer">${film.movies.score[0]}.</i><i class="fraction">${film.movies.score[2]}</i></div>
                            <div class="movie-title movie-title-padding" title="">${film.movies.name}</div>
                        </div>
                    </div>
                </div>
            </a>
            <div class="movie-detail movie-detail-strong movie-sale">
                <a href="/cinemas.html?movieId=${film.movies._id}" class="active" target="_blank" data-act="salePlayingMovie-click"
                    data-val="{movieid:341139}">购 票</a>
            </div>
        </div>

    </dd>`
    }).join('');
    $element.html(str);
}