const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

// Show input error message

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

// Check email is valid
function checkEmail(input) {
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regexEmail.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check emptyError
function checkEmptyError(listInput) {
  let isEmptyError = false;
  listInput.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, ` Vui lòng nhập lại ${getFieldName(input)}`);
      isEmptyError = true;
    } else {
      showSuccess(input);
    }
  });

  return isEmptyError;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} phải ít nhất ${min} giá trị`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} không được quá ${max} ký tự`);
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkMatchPassword(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "Mat khau khong dung");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn load trang
  if (!checkEmptyError([username, email, password, confirmPassword])) {
    checkLength(username, 3, 10);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkMatchPassword(password, confirmPassword);
  }
});
