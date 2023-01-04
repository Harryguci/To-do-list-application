import notificationHandler from "./notification.js";
var workToday = document.querySelector(".work-today-container");

notificationHandler(
  "Work Today",
  `Có <b>${workToday.getAttribute(
    "data-work-length"
  )}</b> công việc phải<br/>hoàn thành hôm nay`
);

window.NotificationHandler = notificationHandler;
