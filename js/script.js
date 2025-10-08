// Safe execution with error handling
document.addEventListener("DOMContentLoaded", function () {
  // Text area functionality (only if elements exist)
  const textArea = document.querySelector("#text_input");
  const wordCount = document.querySelector("#word_count");
  if (textArea && wordCount) {
    textArea.addEventListener("input", (e) => {
      const str = textArea.value;
      const matches = str.match(/[^ \t\n\r,.!?;:()"'`[\]{}<>\\/|@#$%^&*-+=~]/g);
      if (matches) {
        wordCount.textContent = matches.length + "/250";
      } else {
        wordCount.textContent = "0/250";
      }
      if (matches && matches.length > 250) {
        wordCount.style.color = "red";
        textArea.setCustomValidity("Must be less than 250 words");
      } else {
        wordCount.style.color = "";
        textArea.setCustomValidity("");
      }
    });
  }

  // Burger Menu Functionality
  console.log("DOM loaded - initializing burger menu");

  const burgerMenu = document.getElementById("burgerMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const body = document.body;
  const html = document.documentElement;
  const footer = document.querySelector("footer");

  console.log("Burger menu element:", burgerMenu);
  console.log("Mobile menu element:", mobileMenu);

  if (!burgerMenu || !mobileMenu) {
    console.log("Burger menu elements not found on this page");
    return;
  }

  // Handle footer visibility
  function handleFooterVisibility() {
    if (window.innerWidth <= 834) {
      if (footer) footer.style.display = "none";
    } else {
      if (footer && !body.classList.contains("menu-open")) {
        footer.style.display = "";
      }
    }
  }

  // Initial check
  handleFooterVisibility();

  // Toggle burger menu
  burgerMenu.addEventListener("click", function (e) {
    e.stopPropagation();

    this.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    body.classList.toggle("menu-open");

    const menuIsActive = mobileMenu.classList.contains("active");

    if (menuIsActive) {
      body.classList.add("body-locked");
      html.classList.add("html-locked");
    } else {
      body.classList.remove("body-locked");
      html.classList.remove("html-locked");
    }

    console.log("Burger active:", this.classList.contains("active"));
    console.log("Mobile menu active:", menuIsActive);
  });

  // Handle auth buttons
  const authBtn = document.querySelector(".btn-authorization");
  const regBtn = document.querySelector(".btn-registration");

  if (authBtn) {
    authBtn.addEventListener("click", () => {
      window.location.href = "pages/authorization.html";
    });
  }

  if (regBtn) {
    regBtn.addEventListener("click", () => {
      window.location.href = "pages/registration.html";
    });
  }

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll(".mobile-menu a");
  console.log("Found nav links:", navLinks.length);

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      burgerMenu.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open", "body-locked");
      html.classList.remove("html-locked");
    });
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    handleFooterVisibility();

    if (window.innerWidth > 834) {
      burgerMenu.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open", "body-locked");
      html.classList.remove("html-locked");
    }
  });

  // Handle Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      burgerMenu.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open", "body-locked");
      html.classList.remove("html-locked");
    }
  });

  // Prevent touchmove when menu is open
  if (mobileMenu) {
    mobileMenu.addEventListener(
      "touchmove",
      function (e) {
        if (mobileMenu.classList.contains("active")) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }
});
