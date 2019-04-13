import './header.js';
import {queryString} from './tool.js';

let id = queryString();

$.ajax({
    type:'get',
    url:'/news/'+id,
    success:function(data){
        $('#title').html(`<h1>${data.title}</h1>
        <div class="news-subtitle">
            猫眼电影&nbsp;&nbsp;
            03-11 08:26&nbsp;&nbsp;
            <span class="news-icon-views"></span>
            42
        </div>`);
        fillContent($('#content'),data.imageText);
    }
})

function fillContent($element, data) {
    let str = data.map((item) => {
        let content = item.content || item;
        return `<p class="image-wrapper" data-img-width="690" data-img-height="518"><img alt="4dbc6c9agy1g0y4a6ndg7j22tc240kjm.jpg"
        src="http://localhost:3000/upload/${content.image}"><br></p>
<p><br></p>
<p class="MsoNormal">${content.text}</p>
<p class="MsoNormal">&nbsp;</p>`
    }).join('');
    $element.html(str);
}