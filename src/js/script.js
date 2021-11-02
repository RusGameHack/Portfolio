$(document).ready(function(){   
    $('form').submit(function(e) {
        e.preventDefault();
        let $form = $(this);
        if(!$form.valid()) return false;
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $($form).trigger('reset');
        });
        return false;
    });
});

const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    animTurn = document.querySelector('.animTurn'),
    animLeave = document.querySelector('.animLeave');

hamburger.addEventListener('click', () => {
    menu.classList.add('active'),
    closeElem.classList.add('animTurn'),
    hamburger.classList.add('animLeave');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active'),
    closeElem.classList.remove('animTurn'),
    hamburger.classList.remove('animLeave');
});

const percent = document.querySelectorAll('.percent__block-head_perc'),
        lines = document.querySelectorAll('.percent__block_scale span');

percent.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});