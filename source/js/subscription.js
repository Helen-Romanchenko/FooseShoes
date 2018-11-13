var subscription = document.querySelector('.feedback__email-form');
var email = document.querySelector('.feedback__email-input');
var storage = localStorage.getItem("email");

subscription.addEventListener("submit", function (event) {
  if (!email.validity.valid) {
    event.preventDefault();
  } else {
    if (!storage) {
      localStorage.setItem("email", email.value);
    } else if (storage !== email.value){
      localStorage.removeItem("email");
      localStorage.setItem("email", email.value);
    }
  }
});

/* For sending data from the form url-data is required

subscription.submit(function (event) {
   event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        type: "POST",
        url: "#.php",
        data: formData,
        success: function () {
            alert("Thank you for subscription!");
        }
    });
});
*/
