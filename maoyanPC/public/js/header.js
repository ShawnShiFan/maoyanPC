$('body').prepend('<div id="header"></div>');
$('#header').load('./header.html',function(){
    $('.nav a').each(function(){
        if(location.pathname == $(this).attr('href')){
            $(this).addClass('active');
        }
    })
});
$.ajax({
    type:'get',
    url:'/getSession',
    success:function(data){
        if(data){
            $('.user-menu a').html(`${data}`)
        }
    }
})