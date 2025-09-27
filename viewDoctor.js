let doctors = JSON.parse(localStorage.getItem("doctors"));
let users = JSON.parse(localStorage.getItem("users"));
const container = document.querySelector('#doctorContainer');
doctors.forEach(doc => {
  const card = document.createElement('div');
  // Updated responsive classes: full width on mobile, half on small tablets, 1/3 on medium, 1/4 on large screens
  card.className = 'bg-white rounded-xl shadow-xl flex flex-col gap-3 items-center p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-[280px] max-w-[320px]';
  card.innerHTML = `
    <img src="../src/assets/images/profile.png" class="w-16 h-16">
    <div class="font-bold text-md text-center">${doc.doctorName}</div>
    <div class="font-bold text-sm text-gray-500 mb-2 text-center">${doc.department}</div>
    <div class="flex">
      ${Array.from({ length: 5 }, (_, i) => `
        <img src="../src/assets/logo/${i < doc.rating ? 'star' : 'nostar'}.png" class="w-5 h-5">
      `).join('')}
    </div>
    <button 
      id="${doc.doctorId}"
      class="view-btn bg-sky-700 transition delay-10 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-blue-500 text-white font-bold text-sm p-2 rounded-xl text-shadow-lg w-full"
    >View profile</button>
  `;
  
  container.appendChild(card);
});

document.querySelectorAll('.view-btn').forEach(button => {
  button.addEventListener('click', e => {
    const docid = e.target.id;
    window.location.href = `doctorAbout.html?id=${docid}`;
  });
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
    if(loginEmail.value){
    loginPassword.disabled=false;
  }
  else{
    loginPassword.disabled=true;
  }
  emailWarning.classList.remove("hidden");
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