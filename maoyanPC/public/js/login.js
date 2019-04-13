let isRight = false;
$('#login-phone').on('blur', function () {
    $.ajax({
        type: 'post',
        url: '/users/testPhone',
        data: {
            phone: $('#login-phone').val()
        },
        success: function (data) {
            if (!data.status) {
                $('#prompt').css({
                    display: 'block'
                })
                isRight = false;
            } else {
                $('#prompt').css({
                    display: 'none'
                })
                isRight = true;
            }
        }
    })
})

$('#login-btn').on('click', function () {
    if (isRight && $('#login-phone').val() && $('#login-pwd').val()) {
        $.ajax({
            type: 'post',
            url: '/users/testAccount',
            data: {
                phone: $('#login-phone').val(),
                pwd: $('#login-pwd').val(),
            },
            success: function (data) {
                if (data.status) {
                    location.href = '/';
                } else {
                    $('#prompt2').css({
                        display: 'block'
                    })
                }
            }
        })
    }
})