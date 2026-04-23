const addForm = document.getElementById("add-form");
const formPopUp = document.getElementById("form-popup");

addForm.addEventListener("click", () => {
  formPopUp.classList.toggle("search__popup_hidden");
});

// Counter
const counter = document.getElementById("counter-value");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");

incrementBtn.addEventListener("click", () => {
  let currentValue = parseInt(counter.textContent);
  counter.textContent = currentValue + 1;
});

decrementBtn.addEventListener("click", () => {
  let currentValue = parseInt(counter.textContent);
  if (currentValue > 0) {
    counter.textContent = currentValue - 1;
  }
});

// Additional Filter
const filterBtn = document.getElementById("filter-btn");
const additionalFilter = document.getElementById("additional-filter");

filterBtn.addEventListener("click", () => {
  additionalFilter.classList.toggle("additional-filter");
});

var selected = [];
var saved = [];

var items = document.querySelectorAll(".filter-list__item");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    var index = selected.indexOf(this);

    if (index === -1) {
      selected.push(this);
      this.classList.add("active");
    } else {
      selected.splice(index, 1);
      this.classList.remove("active");
    }
  });
}

function handleRemember() {
  saved = selected.slice();

  var container = document.querySelector(".search__active-filters");
  container.innerHTML = "";

  for (var i = 0; i < saved.length; i++) {
    var div = document.createElement("div");
    div.className = "search__active-filter";
    div.textContent = saved[i].textContent;
    container.appendChild(div);
  }

  formPopUp.classList.add("search__popup_hidden");
}

const rememberBtn = document.getElementById("remember-btn");
rememberBtn.addEventListener("click", handleRemember);
