var inputUsername = document.querySelector('input[name="username"]');
var inputPassword = document.querySelector('input[name="password"]');
var inputConfirmPassword = document.querySelector(
  'input[name="password-confirm"]'
);
var btnSubmit = document.getElementById("btn-submit");

var isPasswordMatch = () => {
  if (inputPassword.value !== inputConfirmPassword.value) {
    btnSubmit.disabled = true;
    alert("Passwords do not match");
    return false;
  }
  return true;
};

const handleSubmitForm = (event) => {
  if (isPasswordMatch()) {
  } else event.preventDefault();
};
window.handleSubmitForm = handleSubmitForm;
