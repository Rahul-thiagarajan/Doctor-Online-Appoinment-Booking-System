let doctors = JSON.parse(localStorage.getItem("doctors"));
let users = JSON.parse(localStorage.getItem("users"));
// Get doctor id from URL
const params = new URLSearchParams(window.location.search);
const docid = params.get("id");

// Find the matching doctor
const doctor = doctors.find(d => d.doctorId === docid);

// Fill the details
document.getElementById("doctorName").textContent = doctor.doctorName || doctor.name;
document.getElementById("designationDept").textContent = `${doctor.designation} - ${doctor.department}`;
document.getElementById("age").textContent = doctor.age;
document.getElementById("gender").textContent = doctor.gender;
document.getElementById("experience").textContent = doctor.experience;
document.getElementById("about").textContent = doctor.about;

// Rating stars
const ratingContainer = document.getElementById("ratingContainer");
ratingContainer.innerHTML = Array.from({ length: 5 }, (_, i) =>
  `<img src="../src/assets/logo/${i < doctor.rating ? 'star' : 'nostar'}.png" class="w-4 h-4">`
).join('');

// Reviews
const reviewsContainer = document.getElementById("reviewsContainer");
reviewsContainer.innerHTML = doctor.reviews.map(r => `
  <div class="bg-white rounded-xl shadow p-4 flex flex-col gap-1">
    <p class="font-semibold text-gray-800">${r.user}</p>
    <p class="text-gray-600 text-sm">${r.comment}</p>
  </div>
`).join('');

// Achievements
const achievementsContainer = document.getElementById("achievementsContainer");
achievementsContainer.innerHTML = doctor.achievements.map(a => `
  <p class="text-gray-800 text-md">• ${a}</p>
`).join('');

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