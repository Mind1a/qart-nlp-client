const enterText = document.querySelector(".enterText");
const form = document.querySelector(".form-container");
const formContainer = document.querySelector(".form-container");
const AmountWords = document.querySelector(".wordsAmount");
const wordsAmountBox = document.querySelector(".words-Amount-Box");
const clearBtn = document.querySelector(".btn-clear");
const submitBtn = document.querySelector(".btn-analize");

const validWordsNumber = (inputs) => inputs.trim().split("").length;
const requiredInput = (input) => input.trim() !== "";

clearBtn.disabled = true;
submitBtn.disabled = true;

enterText.addEventListener("input", function (e) {
  clearBtn.disabled = !requiredInput(enterText.value);
  submitBtn.disabled = !requiredInput(enterText.value);

  const item = validWordsNumber(enterText.value);
  const html = `
     <span class="wordsAmount">${item}/250</span>
   `;
  wordsAmountBox.innerHTML = "";
  wordsAmountBox.insertAdjacentHTML("beforeend", html);

  if (enterText.value.length > 250) {
    enterText.classList.add("not-valid");
    wordsAmountBox.classList.add("num-not-valid");
    submitBtn.disabled = true;
  } else {
    enterText.classList.remove("not-valid");
    wordsAmountBox.classList.remove("num-not-valid");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  document.querySelector(".search-results").classList.remove("disable");
});

form.addEventListener("reset", function (e) {
  clearBtn.disabled = true;
  submitBtn.disabled = true;

  enterText.value = "";

  const item = validWordsNumber(enterText.value);
  const html = `
     <span class="wordsAmount">${item}/250</span>
   `;
  wordsAmountBox.innerHTML = "";
  wordsAmountBox.insertAdjacentHTML("beforeend", html);
});

// ----------------------------
const dialog = document.querySelector("#dialog");
const closeBtn = document.querySelector("#close-modal");

submitBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());

// close modal when clicking outside
dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  const isInDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!isInDialog) {
    dialog.close();
  }
});
// ----------------------------
