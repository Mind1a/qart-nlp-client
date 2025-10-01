const sendLinkEmail = document.getElementById("email");
const savedEmail = localStorage.getItem("resetEmail");

if (savedEmail) {
    sendLinkEmail.textContent = savedEmail;
    // localStorage.removeItem("resetEmail");
}