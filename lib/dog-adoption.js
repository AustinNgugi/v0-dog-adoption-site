/**
 * Azzuri Dog Adoption - Main JavaScript Logic
 * Improved with debouncing, sanitization, and better state management
 */

let dogData = []
let filteredDogs = []
let adoptedDogs = []

// Utility function for input sanitization
const sanitizeInput = (input) => {
  const div = document.createElement("div")
  div.textContent = input
  return div.innerHTML
}

// Debounce utility function
const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  loadDogData()
  setupEventListeners()
})

// Load dog data with retry mechanism
async function loadDogData(retries = 3, delay = 1000) {
  try {
    const response = await fetch("db.json")
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    dogData = await response.json()
    filteredDogs = [...dogData]

    // Load adopted dogs from localStorage
    const savedAdoptedDogs = localStorage.getItem("adoptedDogs")
    if (savedAdoptedDogs) {
      adoptedDogs = JSON.parse(savedAdoptedDogs)
    }

    // Simulate loading delay for better UX
    setTimeout(() => {
      displayDogData()
      updateStats()
      updateCartCount()
      if (window.location.pathname.includes("cart.html")) {
        displayCartItems()
        updateCartSummary()
      }
    }, 1000)
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} attempts left)`)
      setTimeout(() => loadDogData(retries - 1, delay * 2), delay)
      return
    }
    console.error("Error loading dog data:", error)
    showAlert("Error loading dog data. Please try again later.", "danger")
    const loading = document.getElementById("loading")
    if (loading) {
      loading.innerHTML = "<p>Error loading dogs. Please refresh the page.</p>"
    }
  }
}

// Display dog data
function displayDogData() {
  const dogListContainer = document.getElementById("dogList")
  const loading = document.getElementById("loading")
  const noResults = document.getElementById("noResults")

  if (!dogListContainer) return

  loading.style.display = "none"
  dogListContainer.innerHTML = ""

  if (filteredDogs.length === 0) {
    noResults.style.display = "block"
    return
  } else {
    noResults.style.display = "none"
  }

  filteredDogs.forEach((dog, index) => {
    const dogCard = createDogCard(dog, index)
    dogListContainer.appendChild(dogCard)
  })
}

// Create individual dog card
function createDogCard(dog, index) {
  const colDiv = document.createElement("div")
  colDiv.classList.add("col-md-6", "col-lg-4", "mb-4")
  colDiv.dataset.dogName = sanitizeInput(dog.name.toLowerCase())
  colDiv.dataset.dogGender = dog.gender.toLowerCase()
  colDiv.dataset.dogAge = getAgeCategory(dog.age)

  const card = document.createElement("div")
  card.classList.add("dog-card", "card", "h-100")
  card.setAttribute("aria-label", `Dog card for ${dog.name}`)

  const img = document.createElement("img")
  img.classList.add("card-img-top")
  img.src = dog.picture
  img.alt = `Picture of ${dog.name}`
  img.style.cursor = "pointer"
  // Lazy load and async decode for performance
  img.loading = "lazy"
  img.decoding = "async"
  // Open image modal on click
  img.addEventListener("click", () => openImageModal(dog.picture, dog.name))

  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body", "d-flex", "flex-column")

  const title = document.createElement("h5")
  title.classList.add("dog-name")
  title.textContent = sanitizeInput(dog.name)

  const infoDiv = document.createElement("div")
  infoDiv.classList.add("dog-info")

  const ageSpan = document.createElement("span")
  ageSpan.classList.add("info-badge")
  ageSpan.innerHTML = `<i class="fas fa-birthday-cake"></i> ${dog.age} years`

  const genderSpan = document.createElement("span")
  genderSpan.classList.add("info-badge")
  genderSpan.innerHTML = `<i class="fas fa-${dog.gender.toLowerCase() === "male" ? "mars" : "venus"}"></i> ${dog.gender}`

  infoDiv.appendChild(ageSpan)
  infoDiv.appendChild(genderSpan)

  const buttonDiv = document.createElement("div")
  buttonDiv.classList.add("mt-auto", "pt-3")

  const adoptButton = document.createElement("button")
  adoptButton.classList.add("btn", "btn-adopt")
  adoptButton.innerHTML = '<i class="fas fa-heart"></i> Adopt Me'
  adoptButton.onclick = () => adoptDog(dog)
  adoptButton.setAttribute("aria-label", `Adopt ${dog.name}`)

  const returnButton = document.createElement("button")
  returnButton.classList.add("btn", "btn-return")
  returnButton.innerHTML = '<i class="fas fa-undo"></i> Return'
  returnButton.onclick = () => returnDog(dog)
  returnButton.setAttribute("aria-label", `Return ${dog.name}`)

  buttonDiv.appendChild(adoptButton)
  buttonDiv.appendChild(returnButton)

  cardBody.appendChild(title)
  cardBody.appendChild(infoDiv)
  cardBody.appendChild(buttonDiv)

  card.appendChild(img)
  card.appendChild(cardBody)
  colDiv.appendChild(card)

  // Fade-in animation class
  card.classList.add("fade-in")

  return colDiv
}

// Display cart items
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cartItems")
  const cartEmpty = document.getElementById("cartEmpty")
  const cartSummary = document.getElementById("cartSummary")

  if (!cartItemsContainer) return

  cartItemsContainer.innerHTML = ""

  if (adoptedDogs.length === 0) {
    cartEmpty.style.display = "block"
    cartSummary.style.display = "none"
    return
  } else {
    cartEmpty.style.display = "none"
    cartSummary.style.display = "block"
  }

  adoptedDogs.forEach((dog, index) => {
    const cartItem = createCartItemElement(dog, index)
    cartItemsContainer.appendChild(cartItem)
  })
}

// Create individual cart item element
function createCartItemElement(dog, index) {
  const cartItemDiv = document.createElement("div")
  cartItemDiv.classList.add("cart-item")

  cartItemDiv.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-3 text-center">
                <img src="${sanitizeInput(dog.picture)}" alt="${sanitizeInput(dog.name)}" class="dog-image">
            </div>
            <div class="col-md-6">
                <div class="dog-details">
                    <h5>${sanitizeInput(dog.name)}</h5>
                    <div class="mb-2">
                        <span class="dog-info-badge">
                            <i class="fas fa-birthday-cake"></i> ${dog.age} years old
                        </span>
                        <span class="dog-info-badge">
                            <i class="fas fa-${dog.gender.toLowerCase() === "male" ? "mars" : "venus"}"></i> ${dog.gender}
                        </span>
                    </div>
                    <p class="mb-0 text-muted">
                        <i class="fas fa-heart text-danger"></i> Ready for a loving home
                    </p>
                </div>
            </div>
            <div class="col-md-3 text-center">
                <button class="remove-btn" onclick="removeDogFromCart(${index})" aria-label="Remove ${dog.name} from cart">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `

  return cartItemDiv
}

// Adopt dog function
function adoptDog(dog) {
  if (adoptedDogs.some((adopted) => adopted.name === dog.name)) {
    showAlert(`${sanitizeInput(dog.name)} is already in your cart!`, "warning")
    return
  }

  adoptedDogs.push(dog)
  updateCartCount()
  updateStats()
  showAlert(`${sanitizeInput(dog.name)} has been added to your adoption cart! 🎉`, "success")

  localStorage.setItem("adoptedDogs", JSON.stringify(adoptedDogs))
}

// Return dog function
function returnDog(dog) {
  const index = adoptedDogs.findIndex((adopted) => adopted.name === dog.name)
  if (index > -1) {
    adoptedDogs.splice(index, 1)
    updateCartCount()
    updateStats()
    showAlert(`${sanitizeInput(dog.name)} has been removed from your cart.`, "info")

    localStorage.setItem("adoptedDogs", JSON.stringify(adoptedDogs))
  } else {
    showAlert("This dog is not in your cart.", "warning")
  }
}

// Remove dog from cart by index
function removeDogFromCart(index) {
  const cartItemsContainer = document.getElementById("cartItems")
  const cartItemNode = cartItemsContainer ? cartItemsContainer.children[index] : null
  const dogName = adoptedDogs[index] ? adoptedDogs[index].name : "Dog"

  // Animate removal if possible, then remove from state
  if (cartItemNode) {
    cartItemNode.classList.add("removing")
    // wait for animation to complete (matching CSS 0.45s)
    setTimeout(() => {
      if (adoptedDogs[index]) {
        adoptedDogs.splice(index, 1)
      }
      localStorage.setItem("adoptedDogs", JSON.stringify(adoptedDogs))
      displayCartItems()
      updateCartSummary()
      updateCartCount()
      showSnackbar(`${sanitizeInput(dogName)} removed`)
    }, 480)
  } else {
    // Fallback: remove immediately
    if (adoptedDogs[index]) {
      adoptedDogs.splice(index, 1)
    }
    localStorage.setItem("adoptedDogs", JSON.stringify(adoptedDogs))
    displayCartItems()
    updateCartSummary()
    updateCartCount()
    showAlert(`${sanitizeInput(dogName)} has been removed from your cart.`, "info")
  }
}

// Update cart count in navbar
function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  if (cartCount) {
    cartCount.textContent = adoptedDogs.length
    cartCount.style.display = adoptedDogs.length > 0 ? "inline-flex" : "none"
    // subtle badge animation
    cartCount.style.transition = "transform 150ms ease"
    cartCount.style.transform = "scale(1.15)"
    setTimeout(() => {
      cartCount.style.transform = ""
    }, 170)
  }
}

// Open image modal
function openImageModal(src, caption) {
  const modal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")
  const modalCaption = document.getElementById("modalCaption")
  if (!modal || !modalImage) return
  modalImage.src = src
  modalImage.alt = caption || "Dog image"
  if (modalCaption) modalCaption.textContent = caption || ""
  modal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeImageModal() {
  const modal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")
  if (!modal || !modalImage) return
  modal.style.display = "none"
  modalImage.src = ""
  document.body.style.overflow = ""
}

// Simple sort applied to filteredDogs
function applySort() {
  const sel = document.getElementById("sortSelect")
  if (!sel) return
  const val = sel.value
  const copy = [...filteredDogs]
  switch (val) {
    case "age-asc":
      copy.sort((a, b) => a.age - b.age)
      break
    case "age-desc":
      copy.sort((a, b) => b.age - a.age)
      break
    case "name-asc":
      copy.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      copy.sort((a, b) => b.name.localeCompare(a.name))
      break
    default:
      // keep current filtered order
      break
  }
  filteredDogs = copy
  displayDogData()
}

// Lightweight snackbar for small messages (used on cart page)
function showSnackbar(message) {
  let sn = document.querySelector(".snackbar")
  if (!sn) {
    sn = document.createElement("div")
    sn.className = "snackbar"
    document.body.appendChild(sn)
  }
  sn.textContent = message
  sn.style.display = "block"
  sn.style.opacity = "0"
  sn.style.transition = "opacity 180ms ease"
  requestAnimationFrame(() => {
    sn.style.opacity = "1"
  })
  setTimeout(() => {
    sn.style.opacity = "0"
    setTimeout(() => {
      sn.style.display = "none"
    }, 220)
  }, 2200)
}

// Update cart summary
function updateCartSummary() {
  if (!window.location.pathname.includes("cart.html") || adoptedDogs.length === 0) return

  const totalDogsCount = document.getElementById("totalDogsCount")
  const maleDogsCount = document.getElementById("maleDogsCount")
  const femaleDogsCount = document.getElementById("femaleDogsCount")
  const averageAge = document.getElementById("averageAge")

  const maleCount = adoptedDogs.filter((dog) => dog.gender.toLowerCase() === "male").length
  const femaleCount = adoptedDogs.filter((dog) => dog.gender.toLowerCase() === "female").length
  const avgAge =
    adoptedDogs.length > 0 ? (adoptedDogs.reduce((sum, dog) => sum + dog.age, 0) / adoptedDogs.length).toFixed(1) : 0

  totalDogsCount.textContent = adoptedDogs.length
  maleDogsCount.textContent = maleCount
  femaleDogsCount.textContent = femaleCount
  averageAge.textContent = `${avgAge} years`
}

// Search dogs function
const searchDogs = debounce(() => {
  const searchInput = document.getElementById("searchInput")
  if (!searchInput) return

  const searchTerm = sanitizeInput(searchInput.value.trim().toLowerCase())

  if (searchTerm === "") {
    filteredDogs = [...dogData]
  } else {
    filteredDogs = dogData.filter((dog) => dog.name.toLowerCase().includes(searchTerm))
  }

  applyFilters()
  displayDogData()
}, 300)

// Clear search function
function clearSearch() {
  const searchInput = document.getElementById("searchInput")
  const ageFilter = document.getElementById("ageFilter")
  if (!searchInput || !ageFilter) return

  searchInput.value = ""
  ageFilter.value = ""
  filteredDogs = [...dogData]

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector('[data-filter="all"]').classList.add("active")

  displayDogData()
}

// Filter dogs by age
function filterDogs() {
  applyFilters()
  displayDogData()
}

// Filter dogs by gender
function filterByGender(button, gender) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  button.classList.add("active")

  applyFilters()
  displayDogData()
}

// Apply all filters
function applyFilters() {
  const searchInput = document.getElementById("searchInput")
  const ageFilter = document.getElementById("ageFilter")
  if (!searchInput || !ageFilter) return

  const searchTerm = sanitizeInput(searchInput.value.trim().toLowerCase())
  const ageFilterValue = ageFilter.value
  const genderFilter = document.querySelector(".filter-btn.active").dataset.filter

  filteredDogs = dogData.filter((dog) => {
    const matchesSearch = searchTerm === "" || dog.name.toLowerCase().includes(searchTerm)
    const matchesAge = ageFilterValue === "" || getAgeCategory(dog.age) === ageFilterValue
    const matchesGender = genderFilter === "all" || dog.gender.toLowerCase() === genderFilter

    return matchesSearch && matchesAge && matchesGender
  })
}

// Get age category for filtering
function getAgeCategory(age) {
  if (age <= 2) return "puppy"
  if (age <= 5) return "young"
  return "adult"
}

// Update statistics
function updateStats() {
  if (!document.getElementById("totalDogs")) return

  document.getElementById("totalDogs").textContent = dogData.length
  document.getElementById("maleCount").textContent = dogData.filter((dog) => dog.gender.toLowerCase() === "male").length
  document.getElementById("femaleCount").textContent = dogData.filter(
    (dog) => dog.gender.toLowerCase() === "female",
  ).length
  document.getElementById("adoptedCount").textContent = adoptedDogs.length
}

// Clear entire cart
function clearCart() {
  if (adoptedDogs.length === 0) {
    showAlert("Your cart is already empty!", "warning")
    return
  }

  if (confirm("Are you sure you want to remove all dogs from your cart?")) {
    adoptedDogs = []
    localStorage.setItem("adoptedDogs", JSON.stringify(adoptedDogs))

    if (window.location.pathname.includes("cart.html")) {
      displayCartItems()
      updateCartSummary()
    }
    updateCartCount()
    updateStats()

    showAlert("All dogs have been removed from your cart.", "info")
  }
}

// Proceed to adoption
function proceedToAdoption() {
  if (adoptedDogs.length === 0) {
    showAlert("Your cart is empty!", "warning")
    return
  }

  const dogNames = adoptedDogs.map((dog) => sanitizeInput(dog.name)).join(", ")
  const totalDogs = adoptedDogs.length

  let message = `🎉 Congratulations! You've chosen to adopt ${totalDogs} wonderful dog${totalDogs > 1 ? "s" : ""}:\n\n`
  message += `${dogNames}\n\n`
  message += `📍 Next Steps:\n`
  message += `• Visit us at Ruiru Town to complete the adoption process\n`
  message += `• Bring a valid ID and proof of residence\n`
  message += `• Our team will guide you through the final paperwork\n`
  message += `• Prepare your home for your new furry friend${totalDogs > 1 ? "s" : ""}!\n\n`
  message += `Thank you for choosing to give these dogs a loving home! ❤️`

  if (confirm(message + "\n\nWould you like to clear your cart now?")) {
    adoptedDogs = []
    localStorage.setItem("adoptedDogs", JSON.stringify(adoptedDogs))

    if (window.location.pathname.includes("cart.html")) {
      displayCartItems()
      updateCartSummary()
    }
    updateCartCount()
    updateStats()

    showAlert("Thank you for your adoption! We look forward to seeing you at Ruiru Town! 🐕❤️", "success")
  }
}

// Show alert function
function showAlert(message, type) {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type === "success" ? "success" : type === "warning" ? "warning" : type === "danger" ? "danger" : "info"} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; max-width: 400px;"
  alertDiv.innerHTML = `
        ${sanitizeInput(message)}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `
  document.body.appendChild(alertDiv)

  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove()
    }
  }, 5000)
}

// Scroll to top functionality
window.addEventListener("scroll", () => {
  const scrollToTop = document.getElementById("scrollToTop")
  if (scrollToTop && window.pageYOffset > 300) {
    scrollToTop.classList.add("visible")
  } else if (scrollToTop) {
    scrollToTop.classList.remove("visible")
  }
})

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Setup event listeners
function setupEventListeners() {
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchDogs()
      }
    })
    searchInput.addEventListener("input", searchDogs)
  }

  // Real-time sync with localStorage changes
  window.addEventListener("storage", (e) => {
    if (e.key === "adoptedDogs") {
      adoptedDogs = JSON.parse(e.newValue || "[]")
      updateCartCount()
      updateStats()
      if (window.location.pathname.includes("cart.html")) {
        displayCartItems()
        updateCartSummary()
      }
    }
  })

  // Periodic sync
  setInterval(() => {
    const currentCart = localStorage.getItem("adoptedDogs")
    const currentCartArray = currentCart ? JSON.parse(currentCart) : []

    if (JSON.stringify(currentCartArray) !== JSON.stringify(adoptedDogs)) {
      adoptedDogs = currentCartArray
      updateCartCount()
      updateStats()
      if (window.location.pathname.includes("cart.html")) {
        displayCartItems()
        updateCartSummary()
      }
    }
  }, 1000)
}
