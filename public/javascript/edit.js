var thumbnail = $(".item .thumbnail");
import randNumber from "./random.js";

/*
  Handle select type [delete] or [finish]
*/
$("#type-edit").change(function (e) {
  console.log($(this).val());
  if ($(this).val()) {
    $(".select-element-form").css("display", "block");
    $("#submit-all-btn").prop("disabled", false);
  } else {
    $(".select-element-form").css("display", "none");
    $("#submit-all-btn").prop("disabled", true);
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

// HANDLE submit multiple form (have checked)
$("#submit-all-btn").click(function () {
  var arr = $(".select-element-form .form-check-input:checked").parents(
    ".select-element-form"
  );
  console.log("submit");
  arr.each(function () {
    var fd = new FormData($(this)[0]);
    $.ajax({
      type: "GET",
      url: "",
      data: fd,
      processData: false,
      contentType: false,
      success: function (data, status) {
        console.log("success");
      },
      error: function (data, status) {
        console.log("error");
      },
    });
  });
});

// window.HandleSubmit = HandleSubmit;
