$(document).ready(function() {
  var searchTopForm = $('.page-header__search--top');
  var searchTopIcon = $('.page-header__search--top .page-header__search-icon ');
  var searchTopInput = $('#search-top');
  var searchTopList = $('.page-header__search--top .page-header__search-list');
  var searchTopItem = $('.page-header__search--top .page-header__search-item');
  var searchTopAutocomplete = $('.page-header__search--top .page-header__search-autocomplete');

  var searchBottomForm = $('.page-header__search--bottom');
  var searchBottomIcon = $('.page-header__search--bottom .page-header__search-icon svg');
  var searchBottomInput = $('#search-bottom');
  var searchBottomList = $('.page-header__search--bottom .page-header__search-list');
  var searchBottomItem = $('.page-header__search--bottom .page-header__search-item');
  var searchBottomAutocomplete = $('.page-header__search--bottom .page-header__search-autocomplete');


  // Top Search  (for tablet and desktop versions)

  searchTopIcon.click(function(){
    searchTopInput.slideToggle();
    searchTopList.slideToggle();
  });

  searchTopItem.click(function() {
    var searchTopText = $(this).text();
    searchTopInput.val(searchTopText).focus();
    searchTopList.slideToggle();

    searchTopInput.blur(function() {
      searchTopList.hide();
      searchTopInput.hide();
      searchTopAutocomplete.hide();
    });

    return false;
  });

  searchTopInput.keyup(function(){
    searchTopList.hide();
  });

  $.ajaxSetup({ cache: false });
  searchTopInput.keyup(function(){
    searchTopAutocomplete.html('');
    var searchField = searchTopInput.val();
    var expression = new RegExp(searchField, "i");
    $.getJSON('data/search-autocomplete.json', function(data) {
      $.each(data, function(key, value){
        if (value.request.search(expression) != -1 && searchField !== "") {
          searchTopAutocomplete.show();
          searchTopAutocomplete.append('<li class="page-header__search-request"> '+value.request+' </li>');
        }
      });
    });
  });

  $(document).on('click', 'li.page-header__search-request', function() {
    var clickTopText = $(this).text();
    searchTopInput.val(clickTopText).focus();
    searchTopAutocomplete.hide();
    searchTopList.hide();

    searchTopInput.blur(function() {
      searchTopList.hide();
      searchTopInput.hide();
      searchTopAutocomplete.hide();
    });
    return false;
  });


  // Bottom Search (for mobile version)

  searchBottomIcon.click(function(){
    searchBottomIcon.hide();
    searchBottomInput.slideToggle().focus();
    searchBottomList.slideToggle();
  });

  searchBottomForm.submit(function(){
    searchBottomList.hide();
    searchBottomInput.hide();
    searchBottomIcon.show();
  });

  searchBottomInput.keyup(function(){
    searchBottomList.hide();
  });

  searchBottomItem.click(function() {
    var searchBottomText = $(this).text();
    searchBottomInput.val(searchBottomText).focus();
    searchBottomList.slideToggle();

    searchBottomInput.blur(function() {
      searchBottomList.hide();
      searchBottomInput.hide();
      searchBottomIcon.show();
    });
    return false;
  });

  $.ajaxSetup({ cache: false });
  searchBottomInput.keyup(function(){
    searchBottomAutocomplete.html('');
    var searchField = searchBottomInput.val();
    var expression = new RegExp(searchField, "i");
    $.getJSON('../data/search-autocomplete.json', function(data) {
     $.each(data, function(key, value){
      if (value.request.search(expression) != -1 && searchField !== "") {
        searchBottomAutocomplete.show();
        searchBottomAutocomplete.append('<li class="page-header__search-request"> '+value.request+' </li>');
        }
     });
    });
  });

  $(document).on('click', 'li.page-header__search-request', function() {
    var clickBottomText = $(this).text();
    searchBottomInput.show();
    searchBottomInput.val(clickBottomText).focus();
    searchBottomAutocomplete.hide();
    searchBottomList.hide();

    searchBottomInput.blur(function() {
      searchBottomList.hide();
      searchBottomAutocomplete.hide();
      searchBottomInput.hide();
      searchBottomIcon.show();
    });
    return false;
  });

});



