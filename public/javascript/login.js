var inputUsername = document.querySelector('input[name="username"]');
var inputPassword = document.querySelector('input[name="password"]');
var inputEmail = document.querySelector('input[name="email"]');
var btnSubmit = document.getElementById("btn-submit");
var haveReadTermCheckbox = document.getElementById("haveReadTermCheckbox");

btnSubmit.disabled = true;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validateUsername(username) {
  var regexUsername = /^[a-zA-z0-9]{3,}$/;
  return regexUsername.test(username);
}

function validatePassword(password) {
  var regexPassword = /^[a-zA-z0-9]{5,}$/;
  return regexPassword.test(password);
}

function handleSubmitButton() {
  if (!validateUsername(inputUsername.value)) {
    btnSubmit.disabled = true;
    document.querySelector("#username-help").innerHTML =
      '<span class="text-danger">Username is wrong format</span>';
    return;
  }
  document.querySelector("#username-help").innerHTML =
    '<span class="text-primary">Username is validate</span>';

  if (!validatePassword(inputPassword.value)) {
    btnSubmit.disabled = true;
    document.querySelector("#password-help").innerHTML =
      '<span class="text-danger">Password is wrong format</span>';
    return;
  }
  document.querySelector("#password-help").innerHTML =
    '<span class="text-primary">Password is validate</span>';

  if (inputEmail) {
    if (!validateEmail(inputEmail.value)) {
      btnSubmit.disabled = true;
      document.querySelector("#email-help").innerHTML =
        '<span class="text-danger">Email is wrong format</span>';
      return;
    }
    document.querySelector("#email-help").innerHTML =
      '<span class="text-primary">Email is validate</span>';
  }

  if (haveReadTermCheckbox) {
    console.log("Checkbox value: ", haveReadTermCheckbox.value);
    if (!haveReadTermCheckbox.checked) {
      btnSubmit.disabled = true;
      document.querySelector("#term-help").innerHTML =
        '<span class="text-danger">You must read the term !!</span>';
      return;
    }
    document.querySelector("#term-help").innerHTML = "";
  }

  btnSubmit.disabled = false;
}

document.querySelector(".card-help").style.display = "none";

document.querySelector(".help-card-btn").addEventListener("click", function () {
  var card = document.querySelector(
    `#${document.querySelector(".help-card-btn").getAttribute("data-card")}`
  );
  if (card.classList.contains("active")) {
    setTimeout(() => (card.style.display = "none"), 500);
    card.classList.remove("active");
  } else {
    card.classList.add("active");
    card.style.display = "block";
  }
});

inputUsername.addEventListener("keyup", handleSubmitButton);
inputPassword.addEventListener("keyup", handleSubmitButton);
inputEmail.addEventListener("keyup", handleSubmitButton);
haveReadTermCheckbox.addEventListener("change", handleSubmitButton);
