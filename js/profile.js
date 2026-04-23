// eye toggle

document.querySelectorAll(".input_toggle_eye").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    console.log("clicked");

    const container = toggle.parentElement;
    const input = container.querySelector(".profile_input");
    const slash = toggle.querySelector(".slash");

    // Toggle  visibility
    if (input.type === "password") {
      input.type = "text";
      slash.classList.remove("active");
    } else {
      input.type = "password";
      slash.classList.add("active");
    }
  });
});

// Toast Close

const toastErrorClose = document.getElementById("toast_error_close");
const toastSuccessClose = document.getElementById("toast_success_close");

toastErrorClose.addEventListener("click", (e) => {
  const toastError = document.getElementById("toast_error");
  toastError.classList.remove("profile_toast_error");

  console.log("closed");
});
toastSuccessClose.addEventListener("click", (e) => {
  const toastSuccess = document.getElementById("toast_success");
  toastSuccess.classList.remove("profile_toast_success");
  e.target.classList.remove("profile_toast_success");
});

const profileForm = document.getElementById("profile_form");

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // popup elements
  const closeBtn = document.getElementById("popup_close");
  const popUpContainer = document.getElementById("popUp_container");
  const cancelBtn = document.getElementById("popUp_cancel");
  const saveBtn = document.getElementById("popUp_save");

  // form elements
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const email = document.getElementById("email");
  const oldPassword = document.getElementById("old_password");
  const newPassword = document.getElementById("new_password");
  const rewritePassword = document.getElementById("rewrite_password");

  // toast elements
  const toastSuccess = document.getElementById("toast_success");
  const toastError = document.getElementById("toast_error");

  let hasErrors = false;

  // validating errors
  hasErrors = validateName(name) || hasErrors;
  hasErrors = validateSurname(surname) || hasErrors;
  hasErrors = validateEmail(email) || hasErrors;
  hasErrors = validateOldPassword(oldPassword) || hasErrors;
  hasErrors = validateNewPassword(newPassword) || hasErrors;
  hasErrors =
    validateRewritePassword(newPassword, rewritePassword) || hasErrors;

  //handling submission
  if (!hasErrors) {
    // displaying popup
    popUpContainer.style.display = "flex";
    toastError.classList.remove("profile_toast_error");
  } else {
    // showing error
    toastError.classList.add("profile_toast_error");
    toastSuccess.classList.remove("profile_toast_success");
  }
  //adding event listeners on close/cancel btn
  closeBtn.addEventListener("click", closePopUp);
  cancelBtn.addEventListener("click", closePopUp);

  // submission
  saveBtn.addEventListener("click", () => {
    console.log("Final submission confirmed ✅");

    const toastSuccess = document.getElementById("toast_success");
    toastSuccess.classList.add("profile_toast_success");

    // Reset form and close the popup
    profileForm.reset();
    closePopUp();
  });
});

function validateName(name) {
  const error = document.getElementById("name_error");

  if (name.value.trim().length < 2) {
    showErrors(name, error, "* სახელი უნდა შეიცავდეს მინიმუმ ორ სიმბოლოს");
    return true;
  }

  clearErrors(name, error);
  return false;
}

function validateSurname(surname) {
  const error = document.getElementById("surname_error");

  if (surname.value.trim().length < 2) {
    showErrors(surname, error, "* გვარი უნდა შეიცავდეს მინიმუმ ორ სიმბოლოს");
    return true;
  }

  clearErrors(surname, error);
  return false;
}

function validateEmail(email) {
  const error = document.getElementById("email_error");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email.value.trim())) {
    showErrors(email, error, "* შეიყვანეთ სწორი ელფოსტა");
    return true;
  }

  clearErrors(email, error);
  return false;
}

function validateOldPassword(oldPassword) {
  const error = document.getElementById("old_password_error");

  if (oldPassword.value.trim() === "") {
    showErrors(oldPassword, error, "* შეიყვანეთ ძველი პაროლი");
    return true;
  }

  clearErrors(oldPassword, error);
  return false;
}

function validateNewPassword(newPassword) {
  const error = document.getElementById("new_password_error");

  if (newPassword.value.length < 6) {
    showErrors(newPassword, error, "* პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო");
    return true;
  }

  clearErrors(newPassword, error);
  return false;
}

function validateRewritePassword(newPassword, rewritePassword) {
  const error = document.getElementById("rewrite_password_error");

  if (rewritePassword.value.trim() === "") {
    showErrors(rewritePassword, error, "* პაროლები არ ემთხვევა");
    return true;
  }

  if (rewritePassword.value !== newPassword.value) {
    showErrors(rewritePassword, error, "* პაროლები არ ემთხვევა");
    return true;
  }

  clearErrors(rewritePassword, error);
  return false;
}

function showErrors(input, error, message) {
  input.classList.add("profile_input--error");
  error.classList.add("profile_field_error");
  error.innerHTML = message;
}

function clearErrors(input, error) {
  input.classList.remove("profile_input--error");
  error.classList.remove("profile_field_error");
  error.innerHTML = "";
}

// PopuUp

const closePopUp = () => {
  const popUpContainer = document.getElementById("popUp_container");
  console.log("click");

  popUpContainer.style.display = "none";
};
