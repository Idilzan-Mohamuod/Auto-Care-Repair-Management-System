const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

if (loginForm && signupForm) {
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // sign up
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const signupMessage = document.getElementById("signupMessage");

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !email || !password) {
      signupMessage.textContent = "Fill in all fields";
      return;
    }

    if (password.length < 6) {
      signupMessage.textContent = "Password too short (min 6 chars)";
      return;
    }

    if (password !== confirmPassword) {
      signupMessage.textContent = "Passwords don't match";
      return;
    }

    const user = { name, email, password };

    localStorage.setItem("autocareUser", JSON.stringify(user));

    signupMessage.textContent = "Account created!";
    signupForm.reset();

    setTimeout(() => {
      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      signupMessage.textContent = "";
    }, 1000);
  });

  // sign in
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginMessage = document.getElementById("loginMessage");

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      loginMessage.textContent = "Enter email and password";
      return;
    }

    let savedUser;
    try {
      savedUser = JSON.parse(localStorage.getItem("autocareUser"));
    } catch {
      loginMessage.textContent = "Something went wrong, try again";
      return;
    }

    if (!savedUser) {
      loginMessage.textContent = "No account found, sign up first";
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("autocareLoggedIn", "true");
      localStorage.setItem("autocareUserName", savedUser.name);
      window.location.href = "Pages/Dashboard.html";
    } else {
      loginMessage.textContent = "Wrong email or password";
    }
  });
}

// dashboard welcome msg
const welcomeUser = document.getElementById("welcomeUser");
if (welcomeUser) {
  const userName = localStorage.getItem("autocareUserName");
  if (userName) {
    welcomeUser.textContent = `Welcome back, ${userName}!`;
  }
}