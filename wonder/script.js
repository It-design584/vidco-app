// Mobile menu toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const body = document.body;

  mobileNav.classList.toggle("active");
  menuBtn.classList.toggle("active");
  body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : "auto";
}

// Close menu when link is clicked
document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("mobileNav").classList.remove("active");
    document.querySelector(".mobile-menu-btn").classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close menu on outside click
document.addEventListener("click", (event) => {
  const mobileNav = document.getElementById("mobileNav");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (!mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
    mobileNav.classList.remove("active");
    menuBtn.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close menu on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    document.getElementById("mobileNav").classList.remove("active");
    document.querySelector(".mobile-menu-btn").classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Expose toggle globally
window.toggleMobileMenu = toggleMobileMenu;

// Form logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputs = document.querySelectorAll("input");
  const submitBtn = document.querySelector(".submit-btn");

  inputs.forEach((input) => {
    input.addEventListener("focus", () => input.parentElement.classList.add("focused"));
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
      validateField(input);
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = "";

    field.style.borderColor = "";
    field.style.boxShadow = "";

    if (field.hasAttribute("required") && !value) {
      isValid = false;
      message = "This field is required";
    } else if (type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = "Please enter a valid email";
      }
    } else if (type === "password" && value.length < 6) {
      isValid = false;
      message = "Password must be at least 6 characters";
    }

    if (!isValid) {
      field.style.borderColor = "#ff4444";
      field.style.boxShadow = "0 0 0 2px rgba(255, 68, 68, 0.3)";
      showErrorMessage(field, message);
    }

    return isValid;
  }

  function showErrorMessage(field, message) {
    const parent = field.parentElement;
    const existing = parent.querySelector(".error-message");
    if (existing) existing.remove();

    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;

    parent.appendChild(error);
    parent.style.marginBottom = "2.2rem";

    setTimeout(() => error.classList.add("visible"), 10);

    setTimeout(() => {
      error.classList.remove("visible");
      setTimeout(() => {
        error.remove();
        parent.style.marginBottom = "1.2rem";
      }, 300);
    }, 3000);
  }

  function showToast(message, success = true) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = success ? "toast success" : "toast error";

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) valid = false;
    });

    if (valid) {
      submitBtn.textContent = "Signing Up...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      setTimeout(() => {
        submitBtn.textContent = "Sign Up";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        showToast("Account created successfully!", true);
      }, 2000);
    } else {
      showToast("Please fix the errors above and try again.", false);
    }
  });
});
