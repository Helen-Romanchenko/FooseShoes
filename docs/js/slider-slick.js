$(function() {
  $('.slider__slidershow').slick({
    asNavFor: '.slider__paginators',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 300,
    fade: true,
    pauseOnHover: true,
    pauseOnDotsHover: true
  });
    $('.slider__paginators').slick({
    asNavFor: '.slider__slidershow',
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    speed: 300,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '3px'
  });
});
