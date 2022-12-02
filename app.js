const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

// show input error message
function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

// show success
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
      showSuccess(input);
    }
  });
}

// Check email
function checkEmail(input) {
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexEmail.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
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

// check password
function checkMatchPassword(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "Mat khau khong dung");
    return true;
  }
  return false;
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn load trang
  if (!checkEmptyError([username, email, password, confirmPassword])) {
    checkLength(username, 3, 10);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkMatchPassword(password, confirmPassword);
  }
});
