// Mobile menu toggle functionality - Fixed to match about page exactly
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const menuBtn = document.querySelector(".mobile-menu-btn")
  const body = document.body

  mobileNav.classList.toggle("active")
  menuBtn.classList.toggle("active")
  body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : "auto"
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const mobileNav = document.getElementById("mobileNav")
    const mobileToggle = document.querySelector(".mobile-menu-btn")

    mobileNav.classList.remove("active")
    mobileToggle.classList.remove("active")
    document.body.style.overflow = "auto"
  })
})

// Close mobile menu when clicking outside - Fixed targeting
document.addEventListener("click", (event) => {
  const mobileNav = document.getElementById("mobileNav")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  if (!mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
    mobileNav.classList.remove("active")
    menuBtn.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Close mobile menu on window resize if it's open
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const mobileNav = document.getElementById("mobileNav")
    const menuBtn = document.querySelector(".mobile-menu-btn")

    mobileNav.classList.remove("active")
    menuBtn.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Make toggleMobileMenu globally available
window.toggleMobileMenu = toggleMobileMenu

// Enhanced form functionality
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form")
  const inputs = document.querySelectorAll("input")
  const submitBtn = document.querySelector(".submit-btn")

  // Add focus/blur effects with better mobile support
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused")
    })

    // Add input validation on blur
    input.addEventListener("blur", function () {
      validateField(this)
    })
  })

  // Field validation function
  function validateField(field) {
    const value = field.value.trim()
    const fieldType = field.type
    let isValid = true
    let errorMessage = ""

    // Remove previous error styling
    field.style.borderColor = ""
    field.style.boxShadow = ""

    if (field.hasAttribute("required") && !value) {
      isValid = false
      errorMessage = "This field is required"
    } else if (fieldType === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        errorMessage = "Please enter a valid email address"
      }
    } else if (fieldType === "password" && value) {
      if (value.length < 6) {
        isValid = false
        errorMessage = "Password must be at least 6 characters"
      }
    }

    if (!isValid) {
      field.style.borderColor = "#ff4444"
      field.style.boxShadow = "0 0 0 2px rgba(255, 68, 68, 0.3)"

      // Show error message briefly
      showErrorMessage(field, errorMessage)
    }

    return isValid
  }

  // Show error message function
  function showErrorMessage(field, message) {
    // Remove existing error message
    const existingError = field.parentElement.querySelector(".error-message")
    if (existingError) {
      existingError.remove()
    }

    // Create and show new error message
    const errorDiv = document.createElement("div")
    errorDiv.className = "error-message"
    errorDiv.textContent = message
    errorDiv.style.cssText = `
      color: #ff4444;
      font-size: 0.8rem;
      margin-top: 0.25rem;
      position: absolute;
      bottom: -1.5rem;
      left: 0;
      opacity: 0;
      transition: opacity 0.3s ease;
    `

    field.parentElement.style.position = "relative"
    field.parentElement.appendChild(errorDiv)

    // Fade in error message
    setTimeout(() => {
      errorDiv.style.opacity = "1"
    }, 10)

    // Remove error message after 3 seconds
    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.style.opacity = "0"
        setTimeout(() => {
          if (errorDiv.parentElement) {
            errorDiv.remove()
          }
        }, 300)
      }
    }, 3000)
  }

  // Enhanced form submission with loading state
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate all fields
    let isFormValid = true
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isFormValid = false
      }
    })

    if (isFormValid) {
      // Show loading state
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Signing Up..."
      submitBtn.disabled = true
      submitBtn.style.opacity = "0.7"
      submitBtn.style.cursor = "not-allowed"

      // Simulate form submission (replace with actual submission logic)
      setTimeout(() => {
        // Reset button state
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        submitBtn.style.opacity = "1"
        submitBtn.style.cursor = "pointer"

        // Show success message
        showSuccessMessage()

        // Optionally reset form
        // form.reset()
      }, 2000)
    } else {
      // Show general error message
      showGeneralError("Please fix the errors above and try again.")
    }
  })

  // Success message function
  function showSuccessMessage() {
    const successDiv = document.createElement("div")
    successDiv.textContent = "Account created successfully! Welcome to Vidco!"
    successDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #4CAF50;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      font-weight: 500;
      opacity: 0;
      transition: all 0.3s ease;
    `

    document.body.appendChild(successDiv)

    setTimeout(() => {
      successDiv.style.opacity = "1"
      successDiv.style.transform = "translateX(-50%) translateY(10px)"
    }, 10)

    setTimeout(() => {
      successDiv.style.opacity = "0"
      successDiv.style.transform = "translateX(-50%) translateY(-10px)"
      setTimeout(() => {
        if (successDiv.parentElement) {
          successDiv.remove()
        }
      }, 300)
    }, 4000)
  }

  // General error message function
  function showGeneralError(message) {
    const errorDiv = document.createElement("div")
    errorDiv.textContent = message
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff4444;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      font-weight: 500;
      opacity: 0;
      transition: all 0.3s ease;
    `

    document.body.appendChild(errorDiv)

    setTimeout(() => {
      errorDiv.style.opacity = "1"
      errorDiv.style.transform = "translateX(-50%) translateY(10px)"
    }, 10)

    setTimeout(() => {
      errorDiv.style.opacity = "0"
      errorDiv.style.transform = "translateX(-50%) translateY(-10px)"
      setTimeout(() => {
        if (errorDiv.parentElement) {
          errorDiv.remove()
        }
      }, 300)
    }, 3000)
  }
})
