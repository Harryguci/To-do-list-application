import notificationHandler from "./notification.js";

$(".copyButton").click(function () {
  var copyText = $(this);
  console.log(copyText.val());
  copyText.select();
  navigator.clipboard.writeText(copyText.val());
  notificationHandler("Message", `Copied the text "${copyText.val()}"`);
});
