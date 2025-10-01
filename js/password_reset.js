// resolve password validation
const resetPasswordForm = document.getElementById("resetpassword_form");
const resolvePasswordInput = document.getElementById("resolve_password");
const resolvePasswordToggleEye = document.getElementById("resolve_password_toggleEye");

resolvePasswordToggleEye.addEventListener("click", () => {
    const hidden = resolvePasswordInput.type === "password";
    resolvePasswordInput.type = hidden ? "text" : "password";

    resolvePasswordToggleEye.classList.toggle("hidden", hidden);
});

const resetPasswordInput = document.getElementById("reset_password");
const resetPasswordToggleEye = document.getElementById("reset_password_toggleEye");

resetPasswordToggleEye.addEventListener("click", () => {
    const hidden = resetPasswordInput.type === "password";
    resetPasswordInput.type = hidden ? "text" : "password";

    resetPasswordToggleEye.classList.toggle("hidden", hidden);
});

resetPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    resetPasswordErrors(resolvePasswordInput, resetPasswordInput);

    const hasErrors = resetPasswordErrors(resolvePasswordInput, resetPasswordInput);

    if (!hasErrors) {
        console.log("Form submitted:", {
            email: resolvePasswordInput.value,
            password: resetPasswordInput.value,
        });

        resolvePasswordInput.value = "";
        resetPasswordInput.value = "";
        errorWarning.classList.remove("active")
    } else {
        errorWarning.classList.add("active")
    }
});

function resetPasswordErrors(password, resetPassword) {
    let hasError = false;

    const resetFormPasswordLabel = document.getElementById("resetform_password_label");
    const resetPasswordLabel = document.getElementById("reset_password_label");
    const passwordErrorMessage = document.getElementById("reset_resetPassword_error_message");
    const resetPasswordErrorMessage = document.getElementById("reset_password_error_message");

    let passwordErrors = [];
    let resetPasswordErrors = [];

    if (password.value.length < 8) {
        passwordErrors.push("პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს");
        showResetPasswordErrors(
            password,
            resetFormPasswordLabel,
            passwordErrorMessage,
            "*პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს",
        );
        hasError = true;
        resolvePasswordToggleEye.classList.add("error_icon");
    } else {
        clearResetPasswordErrors(
            password,
            resetFormPasswordLabel,
            passwordErrorMessage,
        );
        resolvePasswordToggleEye.classList.remove("error_icon");
    }

    if (resetPassword.value.trim() === "") {
        resetPasswordErrors.push("გაიმეორეთ პაროლი");
        showResetPasswordErrors(
            resetPassword,
            resetPasswordLabel,
            resetPasswordErrorMessage,
            "*გაიმეორეთ პაროლი",
        );
        hasError = true;
        resetPasswordToggleEye.classList.add("error_icon");
    } else if (password.value !== resetPassword.value) {
        resetPasswordErrors.push("*პაროლი არ ემთხვევა");
        showResetPasswordErrors(
            resetPassword,
            resetPasswordLabel,
            resetPasswordErrorMessage,
            "*პაროლი არ ემთხვევა",
        );
        hasError = true;
        resetPasswordToggleEye.classList.add("error_icon");
    } else {
        clearResetPasswordErrors(
            resetPassword,
            resetPasswordLabel,
            resetPasswordErrorMessage,
        );
        resetPasswordToggleEye.classList.remove("error_icon");
    }

    if (passwordErrors.length > 0) {
        passwordErrorMessage.innerHTML = passwordErrors.join("<br>");
        passwordErrorMessage.classList.add("block");
    } else {
        passwordErrorMessage.innerHTML = "";
        passwordErrorMessage.classList.remove("block");
    }

    if (resetPasswordErrors.length > 0) {
        resetPasswordErrorMessage.innerHTML = resetPasswordErrors.join("<br>");
        resetPasswordErrorMessage.classList.add("block");
    } else {
        resetPasswordErrorMessage.innerHTML = "";
        resetPasswordErrorMessage.classList.remove("block");
    }
    return hasError;
}

function showResetPasswordErrors(
    password,
    label,
    errorMessage,
    textContent,
) {
    password.classList.add("error");
    label.classList.add("error_text");

    if (!errorMessage.innerHTML.includes(textContent)) {
        errorMessage.innerHTML +=
            (errorMessage.innerHTML ? "<br>" : "") + textContent;
    }

    errorMessage.classList.add("block");
    errorMessage.classList.add("error_text");
}

function clearResetPasswordErrors(
    password,
    label,
    errorMessage,
) {
    password.classList.remove("error");
    label.classList.remove("error_text");

    errorMessage.innerHTML = errorMessage.innerHTML
        .replace(
            /პაროლი \*|პაროლი მინიმუმ უნდა შეიცავდეს 8 სიმბოლოს \*|გაიმეორეთ პაროლი \*|პაროლი უნდა ემთხვეოდეს ერთმანეთს \*/g,
            ""
        )
        .trim();

    if (errorMessage.innerHTML.startsWith("<br>"))
        errorMessage.innerHTML = errorMessage.innerHTML.substring(4);
    if (errorMessage.innerHTML.endsWith("<br>"))
        errorMessage.innerHTML = errorMessage.innerHTML.slice(0, -4);

    if (!errorMessage.innerHTML) errorMessage.classList.remove("block");
}

const errorCloseBtn = document.getElementById("error_close");
const errorWarning = document.getElementById("error_warning");

errorCloseBtn.addEventListener("click", () => {
    errorWarning.classList.remove("active")
})