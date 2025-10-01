// forget password validation
const forgetPasswordForm = document.getElementById("forgetpassword_form");
const forgetPasswordEmailInput = document.getElementById("forget_password_email_input");
const errorCloseBtn = document.getElementById("error_close");
const errorWarning = document.getElementById("error_warning");

errorCloseBtn.addEventListener("click", () => {
    errorWarning.classList.remove("active")
})

forgetPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const hasError = forgetPasswordErrors(forgetPasswordEmailInput);

    if (!hasError) {
        window.location.href = "send_link.html";
    } else {
        errorWarning.classList.add("active");
    }
});

function forgetPasswordErrors(email) {
    let hasError = false;

    const forgetPasswordEmailLabel = document.getElementById("forget_password_email_label");
    const errorMessage = document.getElementById("forget_password_error_message");

    if (email.value.trim() === "") {
        showEmailErrors(
            email,
            forgetPasswordEmailLabel,
            errorMessage,
            "*გთხოვთ შეიყვანოთ ელ.ფოსტა"
        );
        hasError = true;
    } else if (!isValidEmail(email.value)) {
        showEmailErrors(
            email,
            forgetPasswordEmailLabel,
            errorMessage,
            "*გთხოვთ შეიყვანოთ ვალიდური ელ.ფოსტა"
        );
        hasError = true;
    } else {
        clearEmailErrors(email, forgetPasswordEmailLabel, errorMessage, "");
        localStorage.setItem("resetEmail", email.value);
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

function clearEmailErrors(email, label, error, textContent) {
    email.classList.remove("error");
    label.classList.remove("error_text");
    error.classList.remove("block");
    error.innerHTML = textContent;
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
