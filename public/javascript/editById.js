import checkFormSub from "./create.js";

var finishedInput = document.querySelector(`input[name="finished"]`);

const checkFormEditSub = async (event) => {
  event.preventDefault();
  var form = event.target;

  if (checkFormSub(event)) {
    if (finishedInput.value.toLowerCase() === "yes") {
      finishedInput.value = "true";
      form.submit();
    } else if (finishedInput.value.toLowerCase() === "no") {
      finishedInput.value = "false";
      form.submit();
    }
    console.log(finishedInput.value);
  }
};

window.checkFormEditSub = checkFormEditSub;
