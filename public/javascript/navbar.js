$(document).ready(function () {
  $(`.dropdown-menu`).hide();

  $(".dropdown-toggle").on("click", function () {
    $(`.dropdown-menu[aria-labelledby="${$(this).attr("id")}"]`).toggle("fast");
  });
});
