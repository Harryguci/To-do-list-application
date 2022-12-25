import notificationHandler from "./notification.js";

$(".copyButton").click(function () {
  var copyText = $(this);
  console.log(copyText.val());
  copyText.select();
  //   copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.val());

  // alert("Copied the text: " + copyText.val());
  notificationHandler("Message", `Copied the text ${copyText.val()}`);
});
