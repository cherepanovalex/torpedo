$(function () {

 //fix header

    (function () {

        var $win = $(window);
        var $header = $("header");

        var scroll = function () {
            var y = $win.scrollTop();
            if (y >= 1) {
                $header.addClass("header--fixed");
            } else {
                $header.removeClass("header--fixed");
            }
        };

        scroll();

        $win.on("scroll", function () {
            scroll();
        });

    })();

});

//если залогинен то = true
var LOGINNED;


//обработка формы Авторизации
function formLogin() {
    var form = $('#formLogin');
    var inps = form.find('[required]');
    var btn  = form.find('[type="submit"]');

    //проверка на заполненность полей
    var check = function() {
        var enable = true;
        inps.each(function() {
            var inp = $(this);
            var val = inp.val();
            if (!val || val=='') {
                enable = false;
                inp.addClass('empty-field');
            } else {
                inp.removeClass('empty-field');
            }
        });
        btn.attr('disabled', !enable);
    };

    check();

    inps
        .on('keyup change focus blur', function() {
            check();
        })
        .on('keyup change', function() {
            $(this).parents('.form-group').removeClass('invalid');
        });

    form.on('submit', function() {
        var data = form.serialize();
        form.find('.form-group').removeClass('invalid');
        //отправка данных 
        // console.log(data);
        // $.post('https://olimp.bet', data, function(response) {
            var response = {
                status: 'ok',
                error: 'name'//name или password
            };
            if (response.status=='ok') {
                //успех
                $(document).trigger('loginEvent');
            } else {
                if (response.error=='name') {
                    form.find('.group-name').addClass('invalid');
                }
                if (response.error=='password') {
                    form.find('.group-password').addClass('invalid');
                }
            }
        // });
        return false;
    });
};


//обработка формы Регистрации
function formReg() {
    var form = $('#formReg');
    var inps = form.find('[required]');
    var btn  = form.find('[type="submit"]');
    var checkbox = $('#rules_box');

    //mask
    form.find('.tel-mask').inputmask('9(999) 999-99-99');

    //проверка на заполненность полей
    var check = function() {
        var enable = checkbox.is(':checked');
        inps.each(function() {
            var inp = $(this);
            var val = inp.val();
            if (!val || val=='' || val.indexOf('_')>0) {
                enable = false;
                inp.addClass('empty-field');
            } else {
                inp.removeClass('empty-field');
            }
        });
        btn.attr('disabled', !enable);
    };

    check();

    inps
        .on('keyup change focus blur', function() {
            check();
        })
        .on('keyup change', function() {
            $(this).parents('.form-group').removeClass('invalid');
        });

    checkbox.on('change', function() {
        check();
    });

    form.on('submit', function() {
        var data = form.serialize();
        form.find('.form-group').removeClass('invalid');
        //отправка данных 
        // console.log(data);
        // $.post('https://olimp.bet', data, function(response) {
            var response = {
                status: '___ok',
                error: 'email'//phone или email
            };
            if (response.status=='ok') {
                //успех
                location.href = 'https://www.olimp.bet/identification';
            } else {
                if (response.error=='phone') {
                    form.find('.group-phone').addClass('invalid');
                }
                if (response.error=='email') {
                    form.find('.group-email').addClass('invalid');
                }
                if (response.error=='code') {
                    form.find('.group-promocode').addClass('invalid');
                }
            }
        // });
        return false;
    });
};


$().ready(function() {
    formLogin();
    formReg();

    var screens = $('.screen');
    var modal = $('#myModal');

    //сброс
    var reset = function() {
        screens.hide();
    };

    //показать Выбор
    var showChoice = function() {
        screens.hide();
        $('#screen1').show();
    };

    //показать авторизацию
    var showLogin = function() {
        screens.hide();
        $('#screen2').show();
    };

    //показать регистрацию
    var showReg = function() {
        screens.hide();
        $('#screen4').show();
    };

    var showSuccess = function() {
        screens.hide();
        $('#screen3').show();
    };

    modal
        .on('show.bs.modal', function() {
            if (LOGINNED) {
                showSuccess();
            } else {
                showChoice();
            }
        })
        .on('hidden.bs.modal', function() {
            reset();
        });

    $('#buttonYes').on('click', function() {
        showLogin();
    });

    $('#buttonNo').on('click', function() {
        showReg();
    });

    $(document)
        .bind('loginEvent', function() {
            showSuccess();
        });

});
