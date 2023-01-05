var inputUsername = document.querySelector('input[name="username"]');
var inputPassword = document.querySelector('input[name="password"]');
var btnSubmit = document.getElementById("btn-submit");

btnSubmit.disabled = true;

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
      "Username không đúng định dạng";
    return;
  }
  document.querySelector("#username-help").innerHTML =
    "Username được chấp nhận";

  if (!validatePassword(inputPassword.value)) {
    btnSubmit.disabled = true;
    document.querySelector("#password-help").innerHTML =
      "Password không đúng định dạng";
    return;
  }
  document.querySelector("#password-help").innerHTML =
    "Password được chấp nhận";

  btnSubmit.disabled = false;

  console.log("Change");
  console.log(btnSubmit);
}
document.querySelector(".card-help").style.display = "none";

document.querySelector(".help-card-btn").addEventListener("click", function () {
  console.log("Change");
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

