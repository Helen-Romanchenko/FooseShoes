var viewTile = document.querySelector(".products__view-tile");
var viewList= document.querySelector(".products__view-list");
var productsList = document.querySelector(".products__list");

viewTile.addEventListener("click", function() {
  event.preventDefault();
  if (productsList.classList.contains("products__list--list")) {
    productsList.classList.remove("products__list--list");
    productsList.classList.add("products__list--tile");
  }
  if (viewList.classList.contains("view-active")) {
    viewList.classList.remove("view-active");
    viewTile.classList.add("view-active");
  }
});

viewList.addEventListener("click", function() {
  event.preventDefault();
  if (productsList.classList.contains("products__list--tile")) {
    productsList.classList.remove("products__list--tile");
    productsList.classList.add("products__list--list");
  }
  if (viewTile.classList.contains("view-active")) {
    viewTile.classList.remove("view-active");
    viewList.classList.add("view-active");
  }
});
