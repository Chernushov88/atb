$(function ($) {
  /* mask */
  $(".input-phone").mask("+7(999) 999-99-99");
  /* navigator */
  var ua = navigator.userAgent;
  // с помощью регулярок проверяем наличие текста,
  // соответствующие тому или иному браузеру
  if (ua.search(/Chrome/) > 0) console.log('Google Chrome');
  if (ua.search(/Firefox/) > 0) $('body').addClass('body_firefox');
  if (ua.search(/Opera/) > 0) console.log('Opera');
  if (ua.search(/Safari/) > 0) console.log('Safari');
  if (ua.search(/MSIE/) > 0) console.log('Internet Explorer');

  /* -- owl-carusel ---*/
  $('.owl-init-slider, #association-slider, #responsibility-slider, #about-baner-slider, #completed-projects, #completed-projects2, #completed-projects3, #completed-projects4, #completed-projects5').owlCarousel({
    margin: 0,
    items: 1,
    autoplayTimeout: 30000,
    autoplay: true,
    dots: true,
    nav: true,
    loop: true,
    autoHeightClass: 'owl-height',
    autoHeight:true,
    navText: ["<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>", "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
    responsive: {
      768: {
        nav: false,
      },
      1199: {
        nav: false,
      },
      1200: {
        nav: true,
      }
    }
    // loop: true
  });


  var winWidth = $(document).width();
  if (winWidth < 767) {
    $('#activation').attr('colspan', 6);
  }

  /* quantity-selector */
  $('.quantity-selector').on('click', 'button', function () {
    var op = $(this).attr('data-op');
    var input = $(this).parent().parent().find('.quantity-selector__field');
    var inputVal = $(this).parent().parent().find('.quantity-selector__field').val();

    if (op == '+') {
      var newVal = (parseInt($(input).val(), 10) + 1);
      $(input).val(newVal);
    } else if (op == '-') {
      console.log(inputVal);
      if (inputVal > 1) {
        var newVal = (parseInt($(input).val(), 10) - 1);
        $(input).val(newVal);
      }
    }
  });


  $("[data-fancybox]").fancybox({
    toolbar: "auto",
    buttons: [
      'slideShow',
      'close'
    ],
    loop: true,
    keyboard: true,
    arrows: true,
    infobar: true,
    modal: true,
    idleTime: 3,
  });

  var headerHeight = $(".header").height()
  headerHeight = headerHeight  + 'px';
  console.log(headerHeight);
  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > 150) {
      $(".header").addClass('fixed');
      $("body").css('marginTop', headerHeight);
      console.log( $("body").css('margitTop') );
    } else {
      $(".header").removeClass('fixed');
      $("body").css('marginTop', 0);
      console.log( $("body").css('margitTop') );
    }

    if ($(window).scrollTop() > 200) {
      $('#scroll').addClass('active');
    } else {
      $('#scroll').removeClass('active');
    }
  });
  // $(window).scroll(function(){
  //   let scrolDOM = $(this).scrollTop();
  //   console.log('scrolDOM', scrolDOM)
  //   if (scrolDOM > 300) {
  //     $('#handsImg').attr('src','img/screen2/hands/2.png');
  //     if (scrolDOM > 400) {
  //       $('#handsImg').attr('src','img/screen2/hands/3.png');
  //       if (scrolDOM > 600) {
  //         $('#handsImg').attr('src','img/screen2/hands/4.png');
  //         if (scrolDOM > 800) {
  //           $('#handsImg').attr('src','img/screen2/hands/5.png');
  //           if (scrolDOM > 1000) {
  //             $('#handsImg').attr('src','img/screen2/hands/6.png');
  //           }
  //         }
  //       }
  //     }
  //   }
  //   else{
  //     $('#handsImg').attr('src','img/screen2/hands/1.png');
  //   }
  //
  // });

  $('#scroll').click(function () {
    $("html, body").animate({scrollTop: 0}, 600);
    return false;
  });
  // $(".darken").click(function(){
  //   $(".darken").fadeOut(300);
  //    $('.popup').removeClass('open');
  // });

  $(document).on('click', '.slct', function (e) {
    var dropBlock = $(this).parent().find('.drop');
    if (dropBlock.is(':hidden')) {
      dropBlock.slideDown(150);
      $(this).addClass('active');
      $('.drop').find('li').click(function () {
        var selectResult = $(this).html();
        var selectValue = $(this).attr('value');
        console.log(selectValue);
        $(this).parent().parent().find('input').val(selectValue).trigger('change');
        console.log($(this).parent().parent().find('input').val());
        $(this).parent().parent('.select').find('.slct').removeClass('active').html(selectResult);
        dropBlock.slideUp(150);
      });
    } else {
      $(this).removeClass('active');
      dropBlock.slideUp();
    }
    console.log('I am work!!');
    return false;
  });

  if ( $(window).width() > 1200 ) {
    console.log('$(window).width() > 1200', $(window).width())
    $('.menu li').hover(
      function () {
        setTimeout((e)=>{
          $(this).addClass('hover')
          //$('.header').addClass('hover')
        })
      },
      function () {
        setTimeout((e)=>{
          $(this).removeClass('hover')
          //$('.header').addClass('hover')
        })
        //$(this).removeClass('hover')
        //$('.header').removeClass('hover')
      }
    )
    setTimeout(function(){
      if ($('.header').hasClass('hover')){
        let subHeight = $('.menu .act .sub').height();
        document.querySelector('.header').style.marginBottom = subHeight + 'px'
        //console.log($('.header'))
        //console.log(subHeight)
      }else{
        //console.log('none class hover')
      }
    }, 1000)
  }
  if ($(window).width() < 1200) {
    //console.log('$(window).width() < 1200', $(window).width())

    $('.menu > li .fa').click(function (e) {
      if( $(this).hasClass('btn-level3') ){
        $(this).parents('li').toggleClass('activeLevel3')
        //console.log('11')
      }else{
        $(this).parents('li').toggleClass('active')
        //console.log('000')
      }

    })
  }

});
$(document).mouseup(function (e) {
  var container = $(".drop");

  $('.video').parent().children(".video").each(function(){
    $(this).get(0).pause();
  })
  $('.video').parent().removeClass('video-is-playing');

  if ((container.has(e.target).length === 0)) {
    container.slideUp(150);
  }
});

function showPopup(target, elem, img, imgSm, arr) {
  event.preventDefault();
  $(".darken").addClass('active')
  $(target).addClass('open');
  if (elem){
    let title = elem.innerText;
    //console.log(title)
    document.querySelector(`${target} .h3`).innerText = title
    //console.log(document.querySelector(`${target} .h3`).innerText)
    document.querySelector('#baner-img .img1').src = img;
    document.querySelector('#baner-img .img2').src = imgSm;
    //console.log(document.querySelector('#baner-img').src)
    //console.log(img)
    let list = document.querySelector(`${target} .list`)
    list.innerHTML = arr
  }
}

function hidePopup(target) {
  document.body.classList.remove('no-scroll')
  $(".darken").removeClass('active')
  $(target).removeClass('open');
}

function touchMenu(elem, menu) {
  document.body.classList.add('no-scroll')
  //console.log('active')
  $(elem).toggleClass('active');
  $(menu).toggleClass('active');
  $('.darken').toggleClass('active');
  //addIconsMenu(menu);
}

function addIconsMenu(menu) {
  //console.log(menu);
  $(menu + ' li').each(function () {
    $(this).children('.add').click(function () {
      //console.log('click');
      $(this).toggleClass('active').parent('li').children('ul').toggleClass('show');
    });
  });
};

window.addEventListener('load', function () {
  let darken = document.querySelector('.darken'),
      menuJS = document.querySelector('.menu-js'),
      menuALL = document.querySelectorAll('.menu > li'),
      close = document.querySelector('.close'),
      touch = document.querySelector('.touch_menu'),
      popupAll = document.querySelectorAll('.popup'),
      buttonLevel3All = document.querySelectorAll('.button-level3')





  buttonLevel3All.forEach((e)=>{
    //console.log('e', e)
    e.addEventListener('click', (event)=>{
      //console.log('event', event)
    })

  })

  darken.addEventListener('click', function (e) {
    //console.log(e)
    darken.classList.remove('active');
    popupAll.forEach((e)=>{
      e.classList.remove('open');
    })

    menuJS.classList.remove('active');
    touch.classList.remove('active');
    menuALL.forEach((e) => {
      //console.log(e)
      e.classList.remove('active')
    })
  });

  close.addEventListener('click', function () {
    document.body.classList.remove('no-scroll')
    darken.classList.remove('active');
    menuJS.classList.remove('active');
    touch.classList.remove('active');
    menuALL.forEach((e) => {
      e.classList.remove('active')
    })
  });

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 10000 + "px";
      }
    });
  }

  // let btnAll = document.querySelectorAll('.btn-js');
  // btnAll.forEach((e) => {
  //   e.addEventListener('click', function (event) {
  //     event.preventDefault();
  //     console.log(e);
  //     let modal = document.querySelector(e.getAttribute('data-modal'));
  //     let close = document.querySelector('.close');
  //     let darken = document.querySelector('.darken');
  //     let menu = document.querySelector('.menu-js');
  //     let formAction = e.getAttribute('data-action');
  //
  //     let modalFormId = e.getAttribute('data-form-id');
  //     let modalForm = modal.querySelector('.form');
  //     modalForm.setAttribute('id', modalFormId);
  //
  //     let resultId = e.getAttribute(('data-result'))
  //     let result = modalForm.querySelector('.result');
  //     result.setAttribute('id', resultId);
  //
  //     let bthSubmit = modalForm.querySelector('button.btn');
  //     let bthSubmitSpan = modalForm.querySelector('button.btn span');
  //     console.log('bthSubmitSpan', bthSubmitSpan);
  //     let dataTextBtn = e.getAttribute('data-text-btn');
  //     console.log('dataTextBtn', dataTextBtn);
  //     bthSubmitSpan.innerText = dataTextBtn;
  //
  //     bthSubmit.addEventListener('click', function () {
  //       let newmodalFormId = '#' + modalFormId;
  //       let newresultId = '#' + resultId;
  //       send(formAction, newmodalFormId, newresultId);
  //     })
  //     close.addEventListener('click', function () {
  //       modal.classList.remove("open");
  //       darken.classList.remove('active');
  //     });
  //     darken.addEventListener('click', function (e) {
  //       console.log(e)
  //       modal.classList.remove("open");
  //       darken.classList.remove('active');
  //       darken.classList.remove('active');
  //       menu.classList.remove('active');
  //     });
  //     if (e.hasAttribute('data-modal')) {
  //       modal.classList.add("open");
  //       darken.classList.add('active');
  //     }
  //
  //   })
  // });
})


function send(url, form_id, result_div) {
  //console.log('url', url);
  //console.log('form_id', form_id);
  //console.log('result_div', result_div);
  jQuery.ajax({
    type: "POST",
    url: url,
    data: jQuery(form_id).serialize(),
    // Выводим то что вернул PHP
    success: function (html) {
      //console.log('success', html);
      jQuery(result_div).fadeIn(1800);
      jQuery(result_div).empty();
      jQuery(result_div).append(html);

      setTimeout(function () {
        jQuery(document).ready(function () {
          jQuery(result_div).fadeOut(1800);
        });
      }, 60000)
    },
    error: function (html) {
      //console.log('error', html);
      // jQuery(result_div).empty();
      // jQuery(result_div).append("Ошибка!");
    }
  });
}


// (function (window, document) {
//   "use strict";
//   let videoControlAll = document.querySelectorAll('.video-control');
//   videoControlAll.forEach( (e)=>{
//     e.addEventListener('click', function(event){
//       console.log(event)
//       let $videoContainer = $(event.target.parentNode)[0],
//         $video = event.target.nextElementSibling
//
//       console.log('$video', $video)
//       if ($video.paused) {
//         $video.play();
//         $videoContainer.classList.add('video-is-playing');
//       } else {
//         $video.pause();
//         $videoContainer.classList.remove('video-is-playing');
//         //	возвращаем постер
//         $video.load();
//       }
//     })
//   })
// })(window, document);

$(function () {
  $('.video').parent().click(function () {

    if($(this).children(".video").get(0).paused){
      $(this).children(".video").get(0).play();
      $(this).children(".playpause").fadeOut();
      $(this).addClass('video-is-playing');
    }else{
      $(this).children(".video").get(0).pause();
      $(this).removeClass('video-is-playing');



    }

  });
});

