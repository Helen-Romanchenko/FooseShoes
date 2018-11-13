$(document).ready(function() {

  $.getJSON('../data/news.json', function (data) {
    $.each(data, function (key, value) {
      $('#news-list').append('<div class="additional__news"><div class="additional__news-content"><div class="additional__news-date"><span>'+value.month+'</span><br>'+value.day+'</div><a class="additional__news-link" href="#"><p class="additional__news-title">'+value.title+'</p><p class="additional__news-subtitle">'+value.text+'</p></a></div></div></div>');
    });
  });

  $('.additional__news').eq(0).addClass('active').show();
  $('.additional__news').eq(1).addClass('active').show();
  setInterval (function(){
    var length = $('.additional__news').length - 1;
    $('.additional__news').each(function(index) {
      if($(this).hasClass('active')  && index != length) {
        $(this).removeClass('active').delay(4000).fadeOut(1000);
        $(this).next('.additional__news').removeClass('active').delay(4000).fadeOut(1000);
        $('.additional__news').eq(index+1).addClass('active').fadeIn(5000);
        return false;
      } else if (index == length) {
        $('.additional__news').eq(0).removeClass('active').delay(4000).fadeOut(1000).before($(this).removeClass('active').delay(4000).fadeOut(1000));
        $('.additional__news').eq(1).addClass('active').fadeIn(5000);
            return false;
      }
    });
  }, 5000);
});
