const contactForm = document.getElementById("contact_form");

if (contactForm) {
  const fields = {
    name: {
      input: document.getElementById("contact_name"),
      error: document.getElementById("contact_name_error"),
      icon: document.getElementById("contact_name_icon"),
      validator: (value) => value.trim().length >= 2,
      message: "* სახელი უნდა შეიცავდეს მინიმუმ ორ სიმბოლოს",
    },
    surname: {
      input: document.getElementById("contact_surname"),
      error: document.getElementById("contact_surname_error"),
      icon: document.getElementById("contact_surname_icon"),
      validator: (value) => value.trim().length >= 2,
      message: "* გვარი უნდა შეიცავდეს მინიმუმ ორ სიმბოლოს",
    },
    email: {
      input: document.getElementById("contact_email"),
      error: document.getElementById("contact_email_error"),
      icon: document.getElementById("contact_email_icon"),
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "* შეიყვანეთ სწორი ელფოსტა",
    },
    message: {
      input: document.getElementById("contact_message"),
      error: document.getElementById("contact_message_error"),
      icon: null,
      validator: (value) => value.trim().length >= 10,
      message: "* შეტყობინება უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს",
    },
  };

  const toastError = document.getElementById("contact_toast_error");
  const toastSuccess = document.getElementById("contact_toast_success");

  function showError(fieldConfig) {
    fieldConfig.input.classList.add("contact__input--error");
    fieldConfig.error.classList.add("contact__field-error--visible");
    fieldConfig.error.textContent = fieldConfig.message;

    if (fieldConfig.icon) {
      fieldConfig.icon.classList.add("contact__error-icon--visible");
    }
  }

  function clearError(fieldConfig) {
    fieldConfig.input.classList.remove("contact__input--error");
    fieldConfig.error.classList.remove("contact__field-error--visible");
    fieldConfig.error.textContent = "";

    if (fieldConfig.icon) {
      fieldConfig.icon.classList.remove("contact__error-icon--visible");
    }
  }

  function validateField(fieldConfig) {
    const isValid = fieldConfig.validator(fieldConfig.input.value);

    if (!isValid) {
      showError(fieldConfig);
      return false;
    }

    clearError(fieldConfig);
    return true;
  }

  Object.values(fields).forEach((fieldConfig) => {
    fieldConfig.input.addEventListener("input", () => {
      if (fieldConfig.error.textContent) {
        validateField(fieldConfig);
      }
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isFormValid = true;

    Object.values(fields).forEach((fieldConfig) => {
      if (!validateField(fieldConfig)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      toastError.classList.add("contact__toast--error");
      toastSuccess.classList.remove("contact__toast--success");
      return;
    }

    toastError.classList.remove("contact__toast--error");
    toastSuccess.classList.add("contact__toast--success");
    contactForm.reset();
    Object.values(fields).forEach(clearError);
  });
}
