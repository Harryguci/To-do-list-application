var hour = document.getElementById("hour");

function checkValidate() {
  var regEx = /^[0-24]{1,2}:[0-60]{1,2}$/;
  var check = true;
  var h, m;

  check = regEx.test(hour.value);
  if (hour.value[1] === ":") {
    h = parseInt(hour.value.slice(0, 1));
    m = parseInt(hour.value.substring(2, hour.value.length));
  } else if (hour.value[2] === ":") {
    h = parseInt(hour.value.slice(0, 2));
    m = parseInt(hour.value.substring(3, hour.value.length));
  }

  if (h == 24 || h < 0 || h >= 24) {
    h = 0;
  }
  if (m < 0 || m >= 60) m = 0;
  console.log(h, m);
  h = String(h);
  m = String(m);
  if (h.length == 1) h = "0" + h;
  if (m.length == 1) m = "0" + m;

  if (h != undefined && m != undefined) hour.value = `${h}:${m}`;
}

hour.addEventListener("focusout", checkValidate);
