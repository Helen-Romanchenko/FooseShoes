var register = document.querySelector(".user-block__register");
var login = document.querySelector(".user-block__login");
var regPopup = document.querySelector(".pop-up--register");
var loginPopup = document.querySelector(".pop-up--login");
var overlay = document.querySelector(".overlay");
var regClose = document.querySelector(".pop-up--register .close");
var loginClose = document.querySelector(".pop-up--login .close");
var regForm = regPopup.querySelector("form");
var loginForm = loginPopup.querySelector("form");
var regName = regPopup.querySelector("[name=login]");
var regEmail = regPopup.querySelector("[name=email]");
var regPassword = regPopup.querySelector("[name=password]");
var regPasswordRetype = regPopup.querySelector("[name=password-retype]");
var loginEmail = loginPopup.querySelector("[name=email]");
var loginPassword = loginPopup.querySelector("[name=password]");
var linkToLogin = regPopup.querySelector(".pop-up__btn-redirect");
var linkToRegister = loginPopup.querySelector(".pop-up__btn-redirect");
var storage = localStorage.getItem("email");

register.addEventListener("click", function(event){
  event.preventDefault();
  regPopup.classList.add("pop-up--display");
  overlay.classList.add("overlay--display");
  regName.focus();
  if (storage) {
    regEmail.value = storage;
  }
});

regForm.addEventListener("submit", function(event){
  if (regPassword.value !== regPasswordRetype.value) {
    event.preventDefault();
    alert("Passwords do not match");
    return false;
  }
  if(!regName.value || !regEmail.value || !regPassword.value || !regPasswordRetype.value) {
    event.preventDefault();
    console.log("Fill in data");
  }
  if (!storage) {
    localStorage.setItem("email", regEmail.value);
  }
});

regClose.addEventListener("click", function(event){
  event.preventDefault();
  regPopup.classList.remove("pop-up--display");
  overlay.classList.remove("overlay--display");
});

window.addEventListener("keydown", function(event){
  if (event.keyCode === 27) {
    if (regPopup.classList.contains("pop-up--display")) {
      regPopup.classList.remove("pop-up--display");
    }
    if (overlay.classList.contains("overlay--display")) {
      overlay.classList.remove("overlay--display");
    }
  }
});

login.addEventListener("click", function(event){
  event.preventDefault();
  loginPopup.classList.add("pop-up--display");
  overlay.classList.add("overlay--display");
  if (storage) {
    loginEmail.value = storage;
    loginPassword.focus();
  } else {
    loginEmail.focus();
  }
});

loginForm.addEventListener("submit", function(event) {
  if (!loginEmail.value || !loginPassword.value) {
    event.preventDefault();
    console.log("Fill in data");
  } else {
    localStorage.setItem("email", loginEmail.value);
  }
});

loginClose.addEventListener("click", function(event) {
  event.preventDefault();
  loginPopup.classList.remove("pop-up--display");
  overlay.classList.remove("overlay--display");
});

window.addEventListener("keydown", function(event){
  if (event.keyCode === 27) {
    if (loginPopup.classList.contains("pop-up--display")) {
      loginPopup.classList.remove("pop-up--display");
    }
    if (overlay.classList.contains("overlay--display")) {
      overlay.classList.remove("overlay--display");
    }
  }
});

overlay.addEventListener("click", function(event) {
  event.preventDefault();
  if (regPopup.classList.contains("pop-up--display")) {
    regPopup.classList.remove("pop-up--display");
    overlay.classList.remove("overlay--display");
  }
  if (loginPopup.classList.contains("pop-up--display")) {
    loginPopup.classList.remove("pop-up--display");
    overlay.classList.remove("overlay--display");
  }
});

linkToLogin.addEventListener("click", function(event) {
  event.preventDefault();
  regPopup.classList.remove("pop-up--display");
  loginPopup.classList.add("pop-up--display");
});

linkToRegister.addEventListener("click", function(event) {
  event.preventDefault();
  loginPopup.classList.remove("pop-up--display");
  regPopup.classList.add("pop-up--display");
});
