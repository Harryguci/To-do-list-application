// Array contain buttons to change information
const btnChanges = document.querySelectorAll(".btn-change");

// Button change, which after the information
// when button is clicked will be enabled to change the value of the information
const handleBtnChange = (index) => {
  console.log(index);
  var currBtn = btnChanges[index];
  var inputField = document.querySelector(
    `input[name="${currBtn.getAttribute("data-btn-change")}"]`
  );
  inputField.disabled = false;
};

// Add event handlers for inputs (each to each element)
for (let i = 0; i < btnChanges.length; i++) {
  btnChanges[i].addEventListener("click", function () {
    handleBtnChange(i);
  });
}

// Show a confirmation when the user clicks 'Save changes' button.
function showDialogConfirm() {
  // Set up content for the dialog
  $(".modal-title").text("Confirm Change");
  $(".modal-body").html("<p>Sure you want to change the information ?</p>");
  $(".btn-delete").text("Yes").attr("href", "/account");

  // Show the dialog on browser
  $(".modal").modal("show");
}

// On submit : check validation and Submit form
async function handleUpdateAccountSubmit(event) {
  event.preventDefault();

  var oldPassword = document.querySelector('input[name="oldPassword"]');
  var newPassword = document.querySelector('input[name="password"]');
  var emailInput = document.querySelector('input[name="email"]');

  var regexPassword = /^[A-Za-z0-9]{5,}$/;
  var regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const promiseHandle = new Promise((resolve, reject) => {
    if (!oldPassword.disabled && !regexPassword.test(oldPassword.value)) {
      reject("Old password is invalid!");
    }

    if (!newPassword.disabled && !regexPassword.test(newPassword.value)) {
      reject("New password is invalid!");
    }

    if (!emailInput.disabled && !regexEmail.test(emailInput.value)) {
      reject("Email is invalid!");
    }
    resolve();
  })
    .then(() => showDialogConfirm())
    .catch((err) => alert(err));
}

// Dismiss button : click dismiss submitting form
document
  .querySelector('.modal button[data-dismiss="modal"]')
  .addEventListener("click", function (event) {
    event.preventDefault();
    $(".modal").modal("hide");
    console.log("DISMISS");
  });

// Confirm button : after clicking is submitting form
document
  .querySelector(".modal .btn-delete")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log("SUBMIT");

    document.querySelector(`form[name="account"`).submit();
  });

window.handleUpdateAccountSubmit = handleUpdateAccountSubmit;
