const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const whiteX = document.getElementById("white_X");
const blueX = document.getElementById("blue_X");
const responsiveRegisterBtn = document.getElementById("responsive_register_btn");
const responsiveAuthorizationBtn = document.getElementById("responsive_authorization_btn");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
  toggleX();
});

responsiveRegisterBtn.addEventListener("click", () => {
  container.classList.add("active");
  toggleX();
});

responsiveAuthorizationBtn.addEventListener("click", () => {
  container.classList.remove("active");
  toggleX();
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
  toggleX();
});

function toggleX() {
  whiteX.classList.toggle("none", container.classList.contains("active"));
  whiteX.classList.toggle("block", !container.classList.contains("active"));

  blueX.classList.toggle("none", !container.classList.contains("active"));
  blueX.classList.toggle("block", container.classList.contains("active"));
}

// loginBtn.addEventListener("click", showAuthorization);

// function showAuthorization() {
//   document.getElementById("sign_in").style.display = "flex";

//   document.querySelectorAll(".form_container").forEach((form) => {
//     form.querySelectorAll("input").forEach((input) => (input.value = ""));

//     let box = document.getElementById("box");
//     let successBox = document.getElementById("success_box");

//     box.style.display = "block";
//     successBox.style.display = "none";
//   });
// }

// registration passwords toggle-eyes
const registrationToggleEye = document.getElementById("registration_toggleEye");
const registrationPassword = document.getElementById("registration_password_input");
const repeatRegistrationToggleEye = document.getElementById("repeat_registration_toggleEye");
const repeatPasswordInput = document.getElementById("repeat_password_input");

registrationToggleEye.addEventListener("click", () => {
  const isHidden = registrationPassword.type === "password";
  registrationPassword.type = isHidden ? "text" : "password";

  registrationToggleEye.classList.toggle("hidden", isHidden);
});

repeatRegistrationToggleEye.addEventListener("click", () => {
  const isHidden = repeatPasswordInput.type === "password";
  repeatPasswordInput.type = isHidden ? "text" : "password";

  repeatRegistrationToggleEye.classList.toggle("hidden", isHidden);
});

// registration validation
const registrationForm = document.getElementById("register_form");
const registrationEmailInput = document.getElementById("registration_email_input");
const registrationPasswordInput = document.getElementById("registration_password_input");
const nameInput = document.getElementById("name_input");
const surnameInput = document.getElementById("surname_input");
const agreementCheckbox = document.getElementById("agreement_checkbox");
const agreementLabel = document.getElementById("agreement_label");

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationErrors(registrationEmailInput, registrationPassword, repeatPasswordInput);

  const hasErrors = registrationErrors(registrationEmailInput, registrationPassword, repeatPasswordInput);

  if (!hasErrors) {
    console.log("Form submitted:", {
      name: nameInput.value,
      surname: surnameInput.value,
      email: registrationEmailInput.value,
      password: registrationPasswordInput.value,
      agreement: true
    });

    nameInput.value = "";
    surnameInput.value = "";
    registrationEmailInput.value = "";
    registrationPasswordInput.value = "";
    repeatPasswordInput.value = "";
    agreementCheckbox.checked = false;

    window.location.href = "successful_registration.html";
  } else {
    errorWarning.classList.add("active")
  }
});

function registrationErrors(registrationEmailInput, registrationPassword, repeatPasswordInput) {
  let hasError = false;

  const nameLabel = document.getElementById("name_label");
  const nameError = document.getElementById("register_name_error_message");
  const surnameLabel = document.getElementById("surname_label");
  const surnameError = document.getElementById("register_surname_error_message");

  const registerEmailLabel = document.getElementById("registration_email_label");
  const registerPasswordLabel = document.getElementById("registration_password_label");
  const repeatPasswordLabel = document.getElementById("repeat_password_label");
  const registerEmailErrorMessage = document.getElementById("register_email_error_message");
  const passowrdErrorMessage = document.getElementById("register_password_error_message");
  const repeatPassowrdErrorMessage = document.getElementById("repeat_password_error_message");

  if (nameInput.value.trim() === "") {
    showEmailErrors(nameInput, nameLabel, nameError, "შეიყვანეთ სახელი");
    hasError = true;
  } else {
    clearEmailErrors(nameInput, nameLabel, nameError, "");
  }

  if (surnameInput.value.trim() === "") {
    showEmailErrors(surnameInput, surnameLabel, surnameError, "შეიყვანეთ გვარი");
    hasError = true;
  } else {
    clearEmailErrors(surnameInput, surnameLabel, surnameError, "");
  }

  if (registrationEmailInput.value.trim() === "") {
    showEmailErrors(
      registrationEmailInput,
      registerEmailLabel,
      registerEmailErrorMessage,
      "*გთხოვთ შეიყვანოთ ელ.ფოსტა"
    );
    hasError = true;
  } else if (!isValidEmail(registrationEmailInput.value)) {
    showEmailErrors(
      registrationEmailInput,
      registerEmailLabel,
      registerEmailErrorMessage,
      "*ელ.ფოსტის ფორმატი არასწორია"
    );
    hasError = true;
  } else {
    clearEmailErrors(registrationEmailInput, registerEmailLabel, registerEmailErrorMessage, "");
  }

  if (registrationPassword.value.trim() === "") {
    showPasswordErrors(
      registerPasswordLabel,
      passowrdErrorMessage,
      "*გთხოვთ შეიყვანოთ პაროლი"
    );
    hasError = true;
    registrationPasswordInput.classList.add("error");
    registrationToggleEye.classList.add("error_icon");
  } else if (registrationPassword.value.trim().length < 8) {
    showPasswordErrors(
      registerPasswordLabel,
      passowrdErrorMessage,
      "*პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს"
    );
    hasError = true;
    registrationPasswordInput.classList.add("error");
    registrationToggleEye.classList.add("error_icon");
  } else {
    clearPasswordErrors(registerPasswordLabel, passowrdErrorMessage, "");
    registrationPasswordInput.classList.remove("error");
    registrationToggleEye.classList.remove("error_icon");
  }

  if (repeatPasswordInput.value.trim() === "") {
    showPasswordErrors(
      repeatPasswordLabel,
      repeatPassowrdErrorMessage,
      "*გაიმეორეთ პაროლი"
    );
    hasError = true;
    repeatPasswordInput.classList.add("error");
    repeatRegistrationToggleEye.classList.add("error_icon");
  } else if (repeatPasswordInput.value.trim() !== registrationPassword.value) {
    showPasswordErrors(
      repeatPasswordLabel,
      repeatPassowrdErrorMessage,
      "*პაროლი არ ემთხვევა"
    );
    hasError = true;
    repeatPasswordInput.classList.add("error");
    repeatRegistrationToggleEye.classList.add("error_icon");
  } else {
    clearPasswordErrors(repeatPasswordLabel, repeatPassowrdErrorMessage, "");
    repeatPasswordInput.classList.remove("error");
    repeatRegistrationToggleEye.classList.remove("error_icon");
  }

  if (!agreementCheckbox.checked) {
    agreementLabel.classList.add("error_text");
    hasError = true;
  } else {
    agreementLabel.classList.remove("error_text");
  }
  return hasError;
}

// authorization validation
const authorizationForm = document.getElementById("authorization_form");
const emailInput = document.getElementById("authorization_email_input");
const passwordInput = document.getElementById("authorization_password");
const authorizationToggleEye = document.getElementById("authorization_toggleEye");
const errorCloseBtn = document.getElementById("error_close");
const errorWarning = document.getElementById("error_warning");

errorCloseBtn.addEventListener("click", () => {
  errorWarning.classList.remove("active")
})

authorizationToggleEye.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";

  authorizationToggleEye.classList.toggle("hidden", isHidden);
});

authorizationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  authorizationErrors(emailInput, passwordInput);

  const hasErrors = authorizationErrors(emailInput, passwordInput);

  if (!hasErrors) {
    console.log("Form submitted:", {
      email: emailInput.value,
      password: passwordInput.value,
    });

    emailInput.value = "";
    passwordInput.value = "";
    errorWarning.classList.remove("active")
  } else {
    errorWarning.classList.add("active")
  }
});

function authorizationErrors(email, password) {
  let hasError = false;

  const emailLabel = document.getElementById("email_label");
  const passwordLabel = document.getElementById("password_label");
  const emailErrorMessage = document.getElementById("email_error_message");
  const passowrdErrorMessage = document.getElementById("password_error_message");

  if (email.value.trim() === "") {
    showEmailErrors(
      email,
      emailLabel,
      emailErrorMessage,
      "*გთხოვთ შეიყვანოთ ელ.ფოსტა"
    );
    hasError = true;
  } else if (!isValidEmail(email.value)) {
    showEmailErrors(
      email,
      emailLabel,
      emailErrorMessage,
      "*ელ.ფოსტის ფორმატი არასწორია"
    );
    hasError = true;
  } else {
    clearEmailErrors(email, emailLabel, emailErrorMessage, "");
  }

  if (password.value.trim() === "") {
    showPasswordErrors(
      passwordLabel,
      passowrdErrorMessage,
      "*გთხოვთ შეიყვანოთ პაროლი"
    );
    hasError = true;
    passwordInput.classList.add("error");
    authorizationToggleEye.classList.add("error_icon");
  } else {
    clearPasswordErrors(
      passwordLabel,
      passowrdErrorMessage,
      ""
    );
    passwordInput.classList.remove("error");
    authorizationToggleEye.classList.remove("error_icon");
  }
  return hasError;
}

function showEmailErrors(email, label, error, textContent) {
  email.classList.add("error");
  label.classList.add("error_text");
  error.classList.add("block");
  error.classList.add("error_text");
  error.innerHTML = textContent;
}

function showPasswordErrors(
  label,
  error,
  textContent
) {
  label.classList.add("error_text");
  error.classList.add("block");
  error.classList.add("error_text");
  error.innerHTML = textContent;
}

function clearEmailErrors(email, label, error, textContent) {
  email.classList.remove("error");
  label.classList.remove("error_text");
  error.classList.remove("block");
  error.innerHTML = textContent;
}

function clearPasswordErrors(
  label,
  error,
  textContent
) {
  label.classList.remove("error_text");
  error.innerHTML = textContent;
  error.classList.remove("block");
}

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}