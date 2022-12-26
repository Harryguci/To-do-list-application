$(document).ready(function () {
  $(`.dropdown-menu`).hide();

  $(".dropdown-toggle").on("click", function () {
    $(`.dropdown-menu[aria-labelledby="${$(this).attr("id")}"]`).toggle("fast");
  });
});

                        /*
                            *** Check value of The input. ***

                            IF : the value is null (or empty) then the button will be disabled
                            ELSE : the button will be enabled
                        */

var searchInput = document.querySelector('form[name="top-search-form"] input');
var buttonSearch = document.querySelector(
  'form[name="top-search-form"] button'
);
searchInput.addEventListener("keyup", function () {
  if (searchInput.value) {
    buttonSearch.classList.remove("disabled");
  } else {
    buttonSearch.classList.add("disabled");
  }
});
