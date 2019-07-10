//back-to-top scroll://

var $toTopBlock = $("#to-top-block");
if ($(this).scrollTop() < 150) {
  $toTopBlock.hide();
}

$(window).on('scroll', function() {
  if ($(this).scrollTop() > 150) {
    $toTopBlock.fadeIn(500);
  } else {
    $toTopBlock.fadeOut(500);
  }
});

var $backToTop = $("#to-top");
$backToTop.on('click', function(e) {
  $("html, body").animate({scrollTop: 0}, 700);
});

//smooth scroll://

$('a[href*="#"]')
  .not('[href="#"], #module-trigger')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 700, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });

//parallax://

window.addEventListener('scroll', function(){
  var scrollPosition = window.pageYOffset;
  var bgParallax = document.getElementsByClassName('parallax')[0];
  var limit = bgParallax.offsetTop + bgParallax.offsetHeight;
  if (scrollPosition > bgParallax.offsetTop && scrollPosition <= limit){
    bgParallax.style.backgroundPositionY = (50 - 10*scrollPosition/limit) + '%';
  }else{
    bgParallax.style.backgroundPositionY = '50%';
  }
});

//ajax-обработка формы//

$(function() {
  $('#page-form').submit(function(e) {
    var $form = $(this);
    var captcha = grecaptcha.getResponse();
    if (!captcha.length) {
      alert('Вы не ввели капчу!');
    } else {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize()
      }).done(function() {
        alert('Сообщение отправлено! Мы скоро свяжемся с вами.');
      }).fail(function() {
        alert('Ошибка отправки, обновите страницу и попробуйте еще раз.');
      });
    };
    e.preventDefault();
  });
});

$(function() {
  $('#modal-form').submit(function(e) {
    var $form = $(this);
    var captcha = grecaptcha.getResponse();
    if (!captcha.length) {
      alert('Вы не ввели капчу!');
    } else {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize()
      }).done(function() {
        $(function () {
          $('#order-modal').modal('toggle');
        });
        alert('Сообщение отправлено! Мы скоро свяжемся с вами.');
      }).fail(function() {
        alert('Ошибка отправки, обновите страницу и попробуйте еще раз.');
      });
    };
    e.preventDefault();
  });
});
