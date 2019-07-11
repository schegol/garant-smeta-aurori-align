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

//phone mask://

$(function() {
  $('#form-phone').mask('+7 (999) 999-99-99');
  $('#modal-form-phone').mask('+7 (999) 999-99-99');
});

//ajax-обработка формы//

$(function() {
  $('#page-form').submit(function(e) {
    var $form = $(this);
    var captcha = grecaptcha.getResponse(pageWidgetId);
    if (!captcha.length) {
      $('#page-form-submit').prop('disabled', true);
      $('#invalid-captcha').fadeIn().delay(1000);
      $('#invalid-captcha').fadeOut('slow', function() {
         $('#page-form-submit').prop('disabled', false);
      });
    } else {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize()
      }).done(function() {
        $('#page-form-submit').prop('disabled', true);
        $('#message-sent').fadeIn().delay(1500);
        $('#message-sent').fadeOut('slow', function() {
           $('#page-form-submit').prop('disabled', false);
        });
        $('input[type="text"],input[type="email"],textarea').val('');
        grecaptcha.reset(pageWidgetId);
      }).fail(function() {
        $('#page-form-submit').prop('disabled', true);
        $('#message-error').fadeIn().delay(1500);
        $('#message-error').fadeOut('slow', function() {
           $('#page-form-submit').prop('disabled', false);
        });
      });
    };
    e.preventDefault();
  });
});

$(function() {
  $('#modal-form').submit(function(e) {
    var $form = $(this);
    var modalCaptcha = grecaptcha.getResponse(modalWidgetId);
    if (!modalCaptcha.length) {
      $('#modal-form-submit').prop('disabled', true);
      $('#invalid-captcha').fadeIn().delay(1000);
      $('#invalid-captcha').fadeOut('slow', function() {
         $('#modal-form-submit').prop('disabled', false);
      });
    } else {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize()
      }).done(function() {
        $(function () {
          $('#order-modal').modal('toggle');
        });
        $('#message-sent').fadeIn().delay(1500).fadeOut();
        $('input[type="text"],input[type="email"],textarea').val('');
        grecaptcha.reset(modalWidgetId);
      }).fail(function() {
        $('#modal-form-submit').prop('disabled', true);
        $('#message-error').fadeIn().delay(1500);
        $('#message-error').fadeOut('slow', function() {
           $('#modal-form-submit').prop('disabled', false);
        });
      });
    };
    e.preventDefault();
  });
});
