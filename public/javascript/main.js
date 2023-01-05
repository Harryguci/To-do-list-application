import notificationHandler from "./notification.js";
var workToday = document.querySelector(".work-today-container");

notificationHandler(
  "Work Today",
  `Có <b>${workToday.getAttribute(
    "data-work-length"
  )}</b> công việc phải hoàn thành hôm nay`
);

const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

window.NotificationHandler = notificationHandler;
