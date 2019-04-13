import './header.js';
import {
    querystring
} from './tool.js';

let movieId = querystring().movieId;
let cinemaId = querystring().cinemaId;
let screenIndex = querystring().screenIndex;
$.ajax({
    type: 'get',
    url: '/films/' + movieId,
    success: function (data) {
        $('.movie-info .poster').html(`<img src="http://localhost:3000/upload/${data.image}">`);
        $('.movie-info .name').html(`${data.name}`);
        $('#type').html(`${data.type}`)
        $('#time').html(`${data.area}`)
    }
})

$.ajax({
    type: 'get',
    url: '/cinemas/' + cinemaId,
    success: function (data) {
        $('#cinemaName').html(`${data.name}`);
    }
})
let id;
let screens;
$.ajax({
    type: 'get',
    url: '/screen',
    data: {
        movieId,
        cinemaId
    },
    success: function (data) {
        id = data._id;
        screens = data.screens;
        $('#screenName').html(`${data.screens[screenIndex].name}`);
        $('#session').html(`${data.screens[screenIndex].time}`);
        let singlePrice = data.screens[screenIndex].price;
        $('#price').html(singlePrice);
        let seats = data.cinemas.screen[screenIndex].seat;
        let tickets = data.screens[screenIndex].tickets;
        fillSeats(seats, tickets);
        fillRows(seats, tickets);
    }
})

function fillRows(seats, tickets) {
    let count = 0;
    let rowNum = '';
    let rowSeats = '';
    for (let i = 0; i < seats.length; i++) {
        let isNull = false;
        for (let j = 0; j < seats[i].length; j++) {
            if (seats[i][j] !== 0) {
                isNull = true;
                count++;
                break;
            }
        }
        if (isNull) {
            rowNum += `<span class="row-id">${count}</span>`;
            rowSeats += `<div class="row"></div>`;
        } else {
            rowNum += `<span class="row-id"></span>`;
            rowSeats += `<div class="row empty-row"></div>`
        }
    }
    $('.row-id-container').html(rowNum);
    $('.seats-wrapper').html(rowSeats);
    fillSeats(seats, tickets);
}

function fillSeats(seats, tickets) {
    let row_count = 0;
    for (let i = 0; i < seats.length; i++) {
        let str = '';
        let col_count = 0;
        for (let j = 0; j < seats[i].length; j++) {
            if (seats[i][j] !== 0) {
                row_count++;
                break;
            }
        }
        for (let j = 0; j < seats[i].length; j++) {
            if (seats[i][j] === 1) {
                col_count++;
                str += `<span class="seat selectable" data-row-id="${i}" data-col-id="${j}" view-col="${col_count}" view-row="${row_count}"></span>`
            } else {
                str += `<span class="seat empty"></span>`
            }
        }
        $($('.seats-wrapper .row')[i]).html(str);
    }

    for (let i = 0; i < tickets.length; i++) {
        let row = getSold(tickets[i])[0][1]
        let col = getSold(tickets[i])[0][2]
        for (let i = 0; i < $('.seats-wrapper .seat').length; i++) {
            if ($($('.seats-wrapper .seat')[i]).attr('data-row-id') === row && $($('.seats-wrapper .seat')[i]).attr('data-col-id') === col) {
                $($('.seats-wrapper .seat')[i]).addClass('sold');
                $($('.seats-wrapper .seat')[i]).removeClass('selectable');
            }
        }
    }

    $('.seats-wrapper .selectable').on('click', function () {
        if ($('.seats-wrapper .selected').length < 5 || /selected/.test($(this).attr('class'))) {
            $(this).toggleClass('selected');
            fillTicketContainer($('.seats-wrapper .selected'));
            $('#comfirmSeat').removeClass('disable');
        } else {
            $('.modal-container').css({
                display: 'block'
            });
            $('.tip').html('一次最多选择五个座位');
        }
        if($('.seats-wrapper .selected').length === 0){
            $('#comfirmSeat').addClass('disable');
        }
    });
}

function fillTicketContainer(data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {

        str += `<span class="ticket" data-row-id="5" data-column-id="8" data-index="5-8">${$($('.seats-wrapper .selected')[i]).attr('view-row')}排${$($('.seats-wrapper .selected')[i]).attr('view-col')}座</span>`
    }
    $('.ticket-container').html(str);
    let total = $('#price').html() * data.length
    $('#total-price').html(`${total}`)
}

$('.ok-btn').on('click', function () {
    $('.modal-container').css({
        display: 'none'
    })
})

$('#comfirmSeat').on('click', function () {
    let hasEmpty = false
    for (let i = 0; i < $('.seats-wrapper .selected').length; i++) {
        if (i < $('.seats-wrapper .selected').length - 1) {
            if ($($('.seats-wrapper .selected')[i]).attr('data-row-id') === $($('.seats-wrapper .selected')[i + 1]).attr('data-row-id')) {
                if ($($('.seats-wrapper .selected')[i + 1]).attr('data-col-id') - $($('.seats-wrapper .selected')[i]).attr('data-col-id') === 2) {
                    let x = +$($('.seats-wrapper .selected')[i]).attr('data-row-id');
                    let y = +$($('.seats-wrapper .selected')[i]).attr('data-col-id') + 1;
                    for (let i = 0; i < $('.seats-wrapper .seat').length; i++) {
                        if ($($('.seats-wrapper .seat')[i]).attr('data-row-id') == x && $($('.seats-wrapper .seat')[i]).attr('data-col-id') == y) {
                            if (!/sold/.test($($('.seats-wrapper .seat')[i]).attr('class'))) {
                                hasEmpty = true;
                                break;
                            }
                        }
                    }

                }
            }
        }
    }
    if (!hasEmpty) {
        $.ajax({
            type: 'get',
            url: '/getSession',
            success: function (data) {
                if (data) {
                    if (+$('#total-price').html() > 0) {
                        for (let i = 0; i < $('.seats-wrapper .selected').length; i++) {
                            screens[screenIndex].tickets.push(`seat_${$($('.seats-wrapper .selected')[i]).attr('data-row-id')}_${$($('.seats-wrapper .selected')[i]).attr('data-col-id')}`)
                        }
                        $.ajax({
                            type: 'post',
                            url: '/screen',
                            data: {
                                id: id,
                                screens: JSON.stringify(screens)
                            },
                            success: function () {
                                location.href = '/'
                            }
                        })
                    }
                } else {
                    location.href = '/login.html'
                }
            }
        })
    } else {
        $('.modal-container').css({
            display: 'block'
        });
        $('.tip').html('座位之间不能有间隔！');
    }
})

function getSold(str) {
    let arr = [];
    arr.push(str.split('_'))
    return arr;
}