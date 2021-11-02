$(document).ready(function(){   
    //каталог
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {   /*Активность на кнопках*/
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass
          ('catalog__content_active').eq($(this).index()).addClass
          ('catalog__content_active');
      });

    //Выбор каталога сверху
    const PromoCatalogFirst = document.querySelector('.promo__catalog_first'),
        CatalogTabFirst = document.querySelector('.catalog__tab_first'),
        CatalogTabSecond = document.querySelector('.catalog__tab_second'),
        CatalogContentFirst = document.querySelector('.catalog__content_first'),
        CatalogContentSecond = document.querySelector('.catalog__content_second'),
        PromoCatalogSecond = document.querySelector('.promo__catalog_second');
        $(PromoCatalogFirst).on('click', function() {
            CatalogTabFirst.classList.add('catalog__tab_active');
            CatalogTabSecond.classList.remove('catalog__tab_active');
            CatalogContentFirst.classList.add('catalog__content_active');
            CatalogContentSecond.classList.remove('catalog__content_active');
        });
        $(PromoCatalogSecond).on('click', function() {
            CatalogTabSecond.classList.add('catalog__tab_active');
            CatalogTabFirst.classList.remove('catalog__tab_active');
            CatalogContentSecond.classList.add('catalog__content_active');
            CatalogContentFirst.classList.remove('catalog__content_active');
        });
    
    function toggleSlide(item){
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };
    

    //Кнопки стиля размера
    const sizen = document.querySelectorAll('.catalog-item__size');
     $('.catalog-item__size').each(function(i) {
        $(this).on('click', function() {
            sizen.forEach(sizen =>
                sizen.classList.remove("active")
            )
            sizen[i].classList.add("active");
        })
    });
    //Гамбургер для мобильных устройств
    
    
    // Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__photo').html($('.catalog-item__photo').eq(i).html());
            $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона"
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

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