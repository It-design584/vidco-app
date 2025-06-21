// Mobile menu functionality - Enhanced from trial.js approach
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const menuBtn = document.querySelector(".mobile-menu-btn")
  const body = document.body

  mobileNav.classList.toggle("active")
  menuBtn.classList.toggle("active")
  body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : "auto"
}

// Close mobile menu when clicking outside
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
  if (window.innerWidth > 640) {
    const mobileNav = document.getElementById("mobileNav")
    const menuBtn = document.querySelector(".mobile-menu-btn")

    mobileNav.classList.remove("active")
    menuBtn.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Call popup functionality
function openCallPopup() {
  const popup = document.getElementById('callPopup');
  popup.style.display = 'block';
}

function closePopup() {
  const popup = document.getElementById('callPopup');
  const scheduleFields = document.getElementById('scheduleFields');
  popup.style.display = 'none';
  scheduleFields.style.display = 'none';
}

function callImmediately() {
  alert('Starting call immediately...');
  closePopup();
}

function showScheduler() {
  const scheduleFields = document.getElementById('scheduleFields');
  scheduleFields.style.display = 'block';
}

function confirmScheduledCall() {
  const scheduleTime = document.getElementById('scheduleTime').value;
  if (scheduleTime) {
    alert(`Call scheduled for: ${new Date(scheduleTime).toLocaleString()}`);
    closePopup();
  } else {
    alert('Please select a date and time.');
  }
}

// Make toggleMobileMenu globally available
window.toggleMobileMenu = toggleMobileMenu