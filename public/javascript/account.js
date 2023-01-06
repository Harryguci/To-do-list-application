const btnChanges = document.querySelectorAll(".btn-change");

const handleBtnChange = (index) => {
  console.log(index);
  var currBtn = btnChanges[index];
  var inputField = document.querySelector(
    `input[name="${currBtn.getAttribute("data-btn-change")}"]`
  );
  console.log(inputField);
  inputField.disabled = false;
};

for (let i = 0; i < btnChanges.length; i++) {
  btnChanges[i].addEventListener("click", function () {
    handleBtnChange(i);
  });
}
