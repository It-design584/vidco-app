const app = document.getElementById("app")

// Create main section container
const section = document.createElement("section")
section.className = "team-section"

// Title
const heading = document.createElement("h1")
heading.textContent = "One Team Many Talents"

// Subtitle
const subheading = document.createElement("p")
subheading.className = "subtitle"
subheading.textContent =
  "Our trusted development team delivers innovative, high-quality solutions with creativity and precision."

// Team data
const team = [
  {
    name: "Okon Joseph Itoro",
    role: "Frontend developer",
    image: "images/itoro.jpg",
  },
  {
    name: "Isinkaye Iyanu",
    role: "Software developer and Content Creator",
    image: "images/Iyanu.jpg",
  },
  {
    name: "Isaac Gabriel Umoh",
    role: "Frontend developer and Musical Instrumentalists",
    image: "images/fine isaac.jpg",
  },
]

// Create team container
const container = document.createElement("div")
container.className = "team-container"

// Create each profile card
team.forEach((member) => {
  const card = document.createElement("div")
  card.className = "team-card"

  const img = document.createElement("img")
  img.src = member.image
  img.alt = `${member.name} photo`

  const name = document.createElement("h3")
  name.textContent = member.name

  const role = document.createElement("p")
  role.textContent = member.role

  card.appendChild(img)
  card.appendChild(name)
  card.appendChild(role)
  container.appendChild(card)
})

// Mobile menu functionality
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
  if (window.innerWidth > 768) {
    const mobileNav = document.getElementById("mobileNav")
    const menuBtn = document.querySelector(".mobile-menu-btn")

    mobileNav.classList.remove("active")
    menuBtn.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Append all elements
section.appendChild(heading)
section.appendChild(subheading)
section.appendChild(container)
app.appendChild(section)

// Make toggleMobileMenu globally available
window.toggleMobileMenu = toggleMobileMenu
