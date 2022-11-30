var username = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#Confirm-password");
var form = document.querySelector("form");

// show input error message
function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

function checkEmptyError(listInput) {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim(); // chuẩn hóa đầu vào
    if (!input.value) {
      isEmptyError = true;
      showError(input, "Vui long nhap lai");
    } else {
      showError(input);
    }
  });
  return isEmptyError;
}

// Check length
function checkLength(input, min, max) {
  input.value = input.value.trim();
  if (input.value.length < min) {
    showError(input, `Phai co it nhat ${min} ky tu`);
    return true;
  }
  if (input.value.length > max) {
    showError(input, `khong duoc qua ${max} ky tu`);
    return true;
  }

  showSuccess(input);
  return false; // khong loi gi return false
}
// Check email
function checkEmail(input) {
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  input.value = input.value.trim();
  let isEmailError = !regexEmail.test(input.value);
  if (regexEmail.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
  return isEmailError;
}

// check password
function checkMatchPassword(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "Mat khau khong dung");
    return true;
  }
  return false;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isUsenameLengthError = checkLength(username, 3, 10);
  let isPasswordLengthError = checkLength(password, 3, 10);
  let isEmptyError = checkEmptyError([
    username,
    email,
    password,
    confirmPassword,
  ]);

  let isEmailError = checkEmail(email);
  let isMatchError = checkMatchPassword(password, confirmPassword);
});
