$(document).ready(function() {

  $.getJSON('../data/twitter.json', function (data) {
    $.each(data, function (key, value) {
      $('#twitter-widget').append('<div class="widgets__tweet"><p class="widgets__text"><em>'+value.nameLink1+'</em>'+value.text+'<em>'+value.nameLink2+'</em><span class="widgets__tweet-date">'+value.date+'</span></p></div>');
    });
  });

  setInterval (function () {
    var length = $('.widgets__tweet').length;
    var groupFirst = Math.ceil(length / 2 );
    var randomIndexFirst = Math.floor(Math.random() * groupFirst);
    var randomIndexSecond = Math.floor(groupFirst + Math.random() * (length - groupFirst));

    $('.widgets__tweet').eq(randomIndexFirst).fadeIn(500).delay(4000).fadeOut(500);
    $('.widgets__tweet').eq(randomIndexSecond).fadeIn(500).delay(4000).fadeOut(500);
  }, 5000);
});
