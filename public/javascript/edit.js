var thumbnail = $(".item .thumbnail");
import randNumber from "./random.js";
/*
  Handle select type [delete] or [finish]
*/
$("#submit-all-btn").prop("disabled", true);
$("#type_edit").change(function (e) {
  console.log($(this).val());

  $("#submit-all-btn").prop("disabled", false);
  if ($(this).val()) {
    $(".form-check").css("display", "block");
    var inputs = $('input[type="checkbox"]:checked');
    if (!inputs.length) {
      $("#submit-all-btn").prop("disabled", true);
    } else {
      $("#submit-all-btn").prop("disabled", false);
    }
    $(".item .rectangle").addClass("d-none");
  } else {
    $(".form-check").css("display", "none");
    $("#submit-all-btn").prop("disabled", true);
    $(".item .rectangle").removeClass("d-none");
  }
});

$(".item .thumbnail .circle").css({
  width: Math.min(thumbnail.width(), thumbnail.height()) + "px",
  height: Math.min(thumbnail.width(), thumbnail.height()) + "px",
});

var arrCircle = document.getElementsByClassName("circle");
arrCircle = Array.from(arrCircle);

// Get first character of the document title
var item = $(".item");
for (var i = 0; i < item.length; i++) {
  var element = item.eq(i);

  var name = element.find(".name").text();
  name = name.substring(0, 1);

  element.find(".first-char").text(name);
}

/*
Handle random colors of the circle  
*/
var previousRandNum = 0;
arrCircle.map(function (current) {
  var num;
  do {
    num = randNumber(1, 3);
  } while (num === previousRandNum);

  current.classList.add(`circle-${num}`);
  previousRandNum = num;
});

// For mobile:
$(document).ready(function () {
  if ($(".item .rectangle").css("display") === "block") {
    var colors = ["red", "green", "yellow", "orange", "blue"];
    $(".item .rectangle").each(function (index, element) {
      var i = parseInt(Math.random() * colors.length);
      element.style.background = colors[i];
    });
  }
});

// Check input
var inputs = document.querySelectorAll('input[type="checkbox"]');

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("change", function (event) {
    console.log("change input");
    var inputs = $('input[type="checkbox"]:checked');
    if (inputs.length) {
      $("#submit-all-btn").prop("disabled", false);
    } else {
      $("#submit-all-btn").prop("disabled", true);
    }
  });
}
