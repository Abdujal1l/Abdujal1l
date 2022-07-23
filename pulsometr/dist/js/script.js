$(document).ready(function(){
  $('.carusel__inner').slick({
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  }) ;

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  
  
  // $('.catalog-item__link').each(function(i){
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })

 

  function toggleSlide(item) {
    $(item).each(function(i){
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal

    $('[data-modal=consultation]').on('click ', function(){
        $('.overlay , #consultation' ).fadeIn();
    });

    $('.modal__close').on('click' , function(){
      $('.overlay , #consultation , #thanks , #order').fadeOut('slow');
    });

    // $('.button_mini').on('click' , function(){
    //   $('.overlay , #order').fadeIn('slow');
    // });

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order  .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay , #order').fadeIn('slow');
      });
    });

    //valid
    // $('.feed-form').validate({
    //   debug: true
    // });
    // $('#consultation form').validate({
    //   debug: true
    // });
    // $('#order form').validate({
    //   debug: true,
    //   rules: {
    //     name: "required",
    //     phone: "required",
    //     email: {
    //       required: true,
    //       email: true
    //     }
    //   },
    //   messages: {
    //     errorClass: "error",
    //     name: "пожалуйста введите свое имя",
    //     phone: "пожалуйста введите свой телефон" , 
    //     email: {
    //       required: "подалуйста введите свой почтовый адрес",
    //       email: "неправильно введен адрес почты name@domain.com"
    //     }
    //   }

    // });
    // $('#consultation-form').validate({
    //   debug: true
    // });
    
    function validateForms (form){
      $(form).validate({
        debug: true,
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          errorClass: "error",
          name: "пожалуйста введите свое имя",
          phone: "пожалуйста введите свой телефон" , 
          email: {
            required: "подалуйста введите свой почтовый адрес",
            email: "неправильно введен адрес почты name@domain.com"
          }
        } 
  
      });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7(999)999999");

    $('form').submit(function(e) {
      e.preventDefault();

      if (!$(this).valid()){
          return;
      }
      
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          $(form).trigger('reset');
      });
    });

    //smooth scroll and pageup
    $(window).scroll(function(){
      if($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    // $("a[href^='#']").click(function(){
    //   var _href = $(this).attr("href");
    //   $("html, body").animate({scrollTop: $(_href).offset().top+"px" });
    //   return false;
    // });
    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });
      new WOW().init();
  });
