import notificationHandler from "./notification.js";
var workToday = document.querySelector(".work-today-container");

notificationHandler(
  "Work Today",
  `There are <b>${workToday.getAttribute(
    "data-work-length"
  )}</b> work(s) to complete today.`
);

const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
const dropdownList = [...dropdownElementList].map(
  (dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl)
);

window.NotificationHandler = notificationHandler;
