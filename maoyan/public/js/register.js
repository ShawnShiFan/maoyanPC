let isAvailable = false;
$('#phone').on('blur', function () {
    if (/^1[34578]\d{9}$/.test($('#phone').val())) {
        $.ajax({
            type: 'post',
            url: '/users/testPhone',
            data: {
                phone: $('#phone').val()
            },
            success: function (data) {
                if (data.status) {
                    $('#prompt').html('该手机号已被注册');
                } else {
                    $('#prompt').html('');
                    isAvailable = true;
                }
            }
        })
    }else{
        $('#prompt').html('格式不正确');
    }
})

$('#btn').on('click', function () {
    if($('#pwd').val() === $('#comfirmPwd').val()){
        if (isAvailable && /^[\d\D]{6,16}$/.test($('#pwd').val())) {
        $.ajax({
            type: 'post',
            url: '/users/register',
            data: {
                phone: $('#phone').val(),
                pwd: $('#pwd').val()
            },
            success: function () {
                location.href = '/login.html'
            }
        })
    }
    }else{
        $('#prompt2').html('密码不一致')
    }
    
})