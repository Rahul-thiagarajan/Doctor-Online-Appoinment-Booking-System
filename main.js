let doctors = JSON.parse(localStorage.getItem("doctors"));
let users = JSON.parse(localStorage.getItem("users"));

function createDoctorCard(doctor, index, isMobile = false) {
  const isCenter = index === 1;
  const opacity = isCenter && !isMobile ? 'opacity-100' : isMobile ? 'opacity-100' : 'opacity-40';
  const scale = isCenter && !isMobile ? 'lg:scale-110' : 'lg:scale-100';
  
  // Mobile: Full width cards, Desktop: 1/3 width cards
  const cardWidth = isMobile ? 'w-full' : 'w-full sm:w-1/2 lg:w-1/3';
  
  return `
    <div class="card flex-shrink-0 ${cardWidth} px-2 sm:px-4 lg:px-6 ${opacity} ${scale} transition-all duration-700" data-doctor-id="${doctor.doctorId}">
      <div class="bg-white rounded-xl shadow-lg sm:shadow-xl lg:shadow-2xl flex flex-col items-center p-4 sm:p-6 lg:p-8 mx-1 sm:mx-2">
        <img src="../src/assets/images/profile.png" 
             class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-30 xl:h-30 mb-2 lg:mb-3 rounded-full object-cover border-2 border-gray-100" 
             alt="${doctor.doctorName}">
        <div class="font-bold text-base sm:text-lg lg:text-xl text-center text-gray-800 leading-tight">${doctor.doctorName}</div>
        <div class="font-semibold text-xs sm:text-sm lg:text-md text-gray-500 mb-2 text-center">${doctor.department}</div>
        <div class="flex justify-center items-center">
          ${generateStarRating(doctor.rating)}
        </div>
        ${isMobile ? `
        <button class="mt-3 bg-sky-700 hover:bg-sky-800 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-200">
          View Profile
        </button>
        ` : ''}
      </div>
    </div>
  `;
}

// Responsive star rating function to complement the doctor cards
function generateStarRating(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('<i class="fa-solid fa-star text-yellow-400 text-xs sm:text-sm lg:text-base"></i>');
  }
  
  // Half star
  if (hasHalfStar) {
    stars.push('<i class="fa-solid fa-star-half-stroke text-yellow-400 text-xs sm:text-sm lg:text-base"></i>');
  }
  
  // Empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push('<i class="fa-regular fa-star text-gray-300 text-xs sm:text-sm lg:text-base"></i>');
  }
  
  return `<div class="flex items-center space-x-1">${stars.join('')}</div>`;
}
// Function to render all cards
function renderDoctorCards() {
  const carousel = document.getElementById('carousel');
  console.log("Inside render doctors card")
  if (!carousel) {
    console.error('Carousel element not found');
    return;
  }
  // Clear existing content
  carousel.innerHTML = '';
  // Generate cards HTML
  let cardsHtml = '';
  doctors.forEach((doctor, index) => {
    cardsHtml += createDoctorCard(doctor, index);
  });
  
  // Insert cards into carousel
  carousel.innerHTML = cardsHtml;
}

// doctors animation
const carousel = document.getElementById('carousel');

function rotateCards() {
  const cards = carousel.querySelectorAll('.card');
  
  // Check if cards exist before trying to rotate
  if (cards.length === 0) {
    console.warn('No cards found to rotate');
    return;
  }
  const cardWidth = cards[0].offsetWidth;
  carousel.style.transition = 'transform 0.7s ease-in-out';
  carousel.style.transform = `translateX(-${cardWidth}px)`;

  // After the slide finishes, reset instantly and move first card to end
  setTimeout(() => {
    carousel.style.transition = 'none';
    carousel.appendChild(cards[0]);
    carousel.style.transform = 'translateX(0)';

    // Recalculate styles dynamically (center card bigger, others smaller)
    const updatedCards = carousel.querySelectorAll('.card');
    updatedCards.forEach((card, i) => {
      card.classList.remove('opacity-100', 'scale-110', 'opacity-40', 'scale-90');
      if (i === 1) {
        card.classList.add('opacity-100', 'scale-110');
      } else {
        card.classList.add('opacity-40', 'scale-90');
      }
    });
  }, 700);
}

// Start rotation with delay to ensure cards are rendered
let rotationInterval;

function startCardRotation() {
  // Clear any existing interval
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }
  // Start rotation after ensuring cards exist
  setTimeout(() => {
    const cards = carousel.querySelectorAll('.card');
    if (cards.length > 0) {
      rotationInterval = setInterval(rotateCards, 3000);
    } else {
      console.error('No cards found to start rotation');
    }
  }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderDoctorCards();
  startCardRotation();
});

document.getElementById("loginButton").addEventListener("click", () => {
  document.getElementById("loginPopup").classList.remove("hidden")
})

const loginPopup = document.getElementById("loginPopup");
loginPopup.addEventListener("click", (e) => {
  if (e.target === loginPopup) {
    loginPopup.classList.add("hidden");
  }
});

document.getElementById("loginCloseButton").addEventListener("click", () => {
  document.getElementById("loginPopup").classList.add("hidden")
})

document.getElementById("bookApponBtn").addEventListener("click", () => {
  document.getElementById("loginPopup").classList.remove("hidden") 
})

document.getElementById("showSignup").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("loginBg").classList.remove("h-[80%]");
  document.getElementById("loginBg").classList.add("h-[95%]")
  document.getElementById("loginContainer").classList.add("hidden");
  document.getElementById("signupContainer").classList.remove("hidden");
});

document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("loginBg").classList.remove("h-[95%]");
  document.getElementById("loginBg").classList.add("h-[80%]")
  document.getElementById("loginContainer").classList.remove("hidden");
  document.getElementById("signupContainer").classList.add("hidden");
});


document.getElementById("authLogin").addEventListener("click",(e)=>{
  console.log("Login auth called")
  e.preventDefault()
  const loginEmail=document.getElementById("loginEmail").value;
  const loginPassword=document.getElementById("loginPassword").value;
  const user=users.find(u => u.email===loginEmail && u.password===loginPassword);
  if(!user){
    alert("Invalid username and password")
  }
  else{
    localStorage.setItem("currentUser", user.id); 
    if(user.role === "Admin"){
      window.location.href="../src/features/dashboard/adminDashboard.html"
    }
    if(user.role === "Doctor"){
      window.location.href="../src/features/dashboard/doctorDashboard.html"
    }
    if(user.role === "Patient"){
      window.location.href="../src/features/dashboard/patientDashboard.html"
    }
  }
});




const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const authLoginBtn = document.getElementById("authLogin");
const emailWarning = document.getElementById("emailWarning");




loginEmail.addEventListener("input", () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  document.getElementById("userMarker").classList.add("hidden");
  emailWarning.classList.remove("hidden");
  if(loginEmail.value){
    loginPassword.disabled=false;
  }
  else{
    loginPassword.disabled=true;
  }
  if (emailPattern.test(loginEmail.value)) {
    emailWarning.classList.add("hidden");
    loginEmail.classList.remove("border-red-500");
    loginEmail.classList.add("border-green-500");
  } else {
    emailWarning.classList.remove("hidden");
    loginEmail.classList.remove("border-green-500");
    loginEmail.classList.add("border-red-500");
  }
});


const signupContainer = document.getElementById("signupContainer");
const signupForm = signupContainer.querySelector("form");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirm = document.getElementById("signupConfirm");
const emailWarningSignup = document.getElementById("emailWarningSignup")


signupEmail.addEventListener("input", () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  document.getElementById("userMarkerSignup").classList.add("hidden");
  emailWarningSignup.classList.remove("hidden");
  if(signupEmail.value){
    signupPassword.disabled=false;
  }
  else{
    signupPassword.disabled=true;
  }
  if (emailPattern.test(signupEmail.value)) {
    emailWarningSignup.classList.add("hidden");
    signupEmail.classList.remove("border-red-500");
    signupEmail.classList.add("border-green-500");
  } else {
    emailWarningSignup.classList.remove("hidden");
    signupEmail.classList.remove("border-green-500");
    signupEmail.classList.add("border-red-500");
  }
});

const passwordLength = document.getElementById("passwordLength");
const passwordCondition1 = document.getElementById("passwordCondition1");
const passwordCondition2 = document.getElementById("passwordCondition2");
const passwordCondition3 = document.getElementById("passwordCondition3");

signupPassword.addEventListener("input",()=>{
  let signupPass = signupPassword.value;
  const hasUppercase = /[A-Z]/.test(signupPass);
  const hasNumber = /[0-9]/.test(signupPass);
  const hasSpecial = /[^a-zA-Z0-9]/.test(signupPass);
  passwordLength.classList.remove("hidden");
  passwordCondition1.classList.remove("hidden");
  passwordCondition2.classList.remove("hidden");
  passwordCondition3.classList.remove("hidden");
  if(signupPassword.value){
    signupConfirm.disabled=false;
  }
  else{
    signupConfirm.disabled=true;
  }
  if(signupPass.length > 7){
    passwordLength.classList.add("hidden");
  }
  if(hasUppercase){
    passwordCondition1.classList.add("hidden");
  }
  if(hasNumber){
    passwordCondition2.classList.add("hidden");
  }
  if(hasSpecial){
    passwordCondition3.classList.add("hidden");
  }
})

const confirmMatch = document.getElementById("confirmMatch");
signupConfirm.addEventListener("input",()=>{
  confirmMatch.classList.remove("hidden");
  if(signupConfirm.value === signupPassword.value){
    confirmMatch.classList.add("hidden")
  }
}
)


signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Signup successful! You can now log in.");
  signupForm.reset();
});

// Initially disable the login button
authLoginBtn.disabled = true;
authLoginBtn.classList.add("opacity-50", "cursor-not-allowed");

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to toggle login button
function toggleLoginButton() {
  if (loginEmail.value && loginPassword.value && isValidEmail(loginEmail.value)) {
    authLoginBtn.disabled = false;
    authLoginBtn.classList.remove("opacity-50", "cursor-not-allowed");
  } else {
    authLoginBtn.disabled = true;
    authLoginBtn.classList.add("opacity-50", "cursor-not-allowed");
  }
}

// Add event listeners to inputs
loginEmail.addEventListener("input", toggleLoginButton);
loginPassword.addEventListener("input", toggleLoginButton);
