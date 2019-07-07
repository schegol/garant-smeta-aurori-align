//отключение действия по нажатию на триггер модалки://
var $toTopBlock = $(".module-trigger");
closeWriteUs.addEventListener("click", function (evt) {
  evt.preventDefault();
});

//smooth scroll://

$('a[href*="#"]')
  .not('[href="#"]')
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
