import { isAuthenticated, login } from "./auth.js";
import { showRedirectToast } from "./util.js";

if (isAuthenticated()) window.location.href = "menu.html";

const VALID_USER = "admin@admin.cl";
const VALID_PASS = "1234";

const form = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");

const message = document.getElementById("loginMessage");

const clearErrors = () => {
    usernameError.textContent = "";
    passwordError.textContent = "";
};

const showMessage = (text, type) => {
    message.textContent = text;
    message.className = `mt-3 text-center ${type}`;
};

const validateLogin = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    clearErrors();
    message.textContent = "";

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
        usernameError.textContent = "Debes ingresar el usuario";
        isValid = false;
    } else if (!emailRegex.test(username)) {
        usernameError.textContent = "Debes ingresar un usuario válido";
        isValid = false;
    }

    if (!password) {
        passwordError.textContent = "Debes ingresar la contraseña";
        isValid = false;
    }

    if (!isValid) return;

    if (username === VALID_USER && password === VALID_PASS) {
        login();
        showMessage("Inicio de sesión correcto", "text-success");
        setTimeout(() => {
            showRedirectToast("Redirigiendo a menú...", "menu.html");
        }, 1000);
        return;
    }

    showMessage("Usuario o contraseña incorrectos", "text-danger");
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateLogin();
});

const handleEnter = (e) => {
    if (e.key === "Enter") validateLogin();
};

usernameInput.addEventListener("keydown", handleEnter);
passwordInput.addEventListener("keydown", handleEnter);