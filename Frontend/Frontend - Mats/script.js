$('.neumorphic-checkbox').on('click', function() {
    $(this).toggleClass('neumorphic-checkbox_active');
    var checks = document.getElementsByClassName("neumorphic-checkbox_active")

    checkedArray = []
    for (var i = 0; i < checks.length; ++i) {


        checkedArray.push(checks[i].id);

    }
    console.log(checkedArray);

});



for (var i = 0; i < neumorphic - checkbox.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

$('.neumorphic-tab-container__control').on('click', function() {
    if ($(this).hasClass('neumorphic-tab-container__control_active')) {
        return false;
    }
    $('.neumorphic-tab-container__tab_shown').removeClass('neumorphic-tab-container__tab_shown');
    $('.neumorphic-tab-container__control_active').removeClass('neumorphic-tab-container__control_active');
    $(this).addClass('neumorphic-tab-container__control_active');
    $('#' + $(this).data('target')).addClass('neumorphic-tab-container__tab_shown');
});



$('.neumorphic-slider__thumb_left').on('mousedown', function() {
    $(document).on('mousemove.mm', function(e) {
        var new_value = 0;
        var length = Math.abs($('.neumorphic-slider__thumb_left').offset().left - $('.neumorphic-slider__thumb_right').offset().left + 10);
        console.log(length)
        if (e.clientX < $('.neumorphic-slider').offset().left) {
            new_value = '0%';
        } else if (e.clientX > $('.neumorphic-slider').offset().left + $('.neumorphic-slider').width() - 10) {
            new_value = '100%';
        } else {
            new_value = ((e.clientX - $('.neumorphic-slider').offset().left) / ($('.neumorphic-slider').width() - 10) * 100).toFixed(0) + '%';

        }



        document.documentElement.style.setProperty('--length', length);
        document.documentElement.style.setProperty('--value_left', new_value);

    });
    $(document).on('mouseup.mu', function() {
        $(document).off('mousemove.mm');
        $('.neumorphic-slider__thumb').off('mouseup.mu');
    });
});

$('.neumorphic-slider__thumb_right').on('mousedown', function() {
    $(document).on('mousemove.mm', function(e) {
        var new_value = 0;
        var length = Math.abs($('.neumorphic-slider__thumb_left').offset().left - $('.neumorphic-slider__thumb_right').offset().left + 10);
        console.log(length)
        if (e.clientX < $('.neumorphic-slider').offset().left) {
            new_value = '0%';
        } else if (e.clientX > $('.neumorphic-slider').offset().left + $('.neumorphic-slider').width() - 10) {
            new_value = '100%';
        } else {
            new_value = ((e.clientX - $('.neumorphic-slider').offset().left) / ($('.neumorphic-slider').width() - 10) * 100).toFixed(0) + '%';

        }

        document.documentElement.style.setProperty('--value_right', new_value);

    });
    $(document).on('mouseup.mu', function() {
        $(document).off('mousemove.mm');
        $('.neumorphic-slider__thumb_right').off('mouseup.mu');
    });
});


$('.neumorphic-slider__thumb2_left').on('mousedown', function() {
    $(document).on('mousemove.mm', function(e) {
        var new_value = 0;
        var length = Math.abs($('.neumorphic-slider__thumb_left').offset().left - $('.neumorphic-slider__thumb_right').offset().left + 10);
        console.log(length)
        if (e.clientX < $('.neumorphic-slider2').offset().left) {
            new_value = '0%';
        } else if (e.clientX > $('.neumorphic-slider2').offset().left + $('.neumorphic-slider2').width() - 10) {
            new_value = '100%';
        } else {
            new_value = ((e.clientX - $('.neumorphic-slider2').offset().left) / ($('.neumorphic-slider2').width() - 10) * 100).toFixed(0) + '%';
        }
        document.documentElement.style.setProperty('--value2_left', new_value);

    });
    $(document).on('mouseup.mu', function() {
        $(document).off('mousemove.mm');
        $('.neumorphic-slider__thumb2').off('mouseup.mu');
    });
});

$('.neumorphic-slider__thumb2_right').on('mousedown', function() {
    $(document).on('mousemove.mm', function(e) {
        var new_value = 0;
        var length = Math.abs($('.neumorphic-slider__thumb_left').offset().left - $('.neumorphic-slider__thumb_right').offset().left + 10);
        console.log(length)
        if (e.clientX < $('.neumorphic-slider2').offset().left) {
            new_value = '0%';
        } else if (e.clientX > $('.neumorphic-slider2').offset().left + $('.neumorphic-slider2').width() - 10) {
            new_value = '100%';
        } else {
            new_value = ((e.clientX - $('.neumorphic-slider2').offset().left) / ($('.neumorphic-slider2').width() - 10) * 100).toFixed(0) + '%';
        }
        document.documentElement.style.setProperty('--value2_right', new_value);

    });
    $(document).on('mouseup.mu', function() {
        $(document).off('mousemove.mm');
        $('.neumorphic-slider__thumb2_right').off('mouseup.mu');
    });
});