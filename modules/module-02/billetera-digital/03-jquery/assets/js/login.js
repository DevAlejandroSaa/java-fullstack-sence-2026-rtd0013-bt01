import { isAuthenticated, login } from "./auth.js";
import { showRedirectToast } from "./util.js";

if (isAuthenticated()) window.location.href = "menu.html";

const VALID_USER = "admin@admin.cl";
const VALID_PASS = "1234";

const $form = $("#loginForm");
const $username = $("#username");
const $password = $("#password");

const $usernameError = $("#usernameError");
const $passwordError = $("#passwordError");
const $message = $("#loginMessage");

const clearErrors = () => {
    $usernameError.text("");
    $passwordError.text("");
};

const showMessage = (text, type) => {
    $message.text(text).attr("class", `mt-3 text-center ${type}`);
};

const validateLogin = () => {
    const username = $username.val().trim();
    const password = $password.val().trim();

    clearErrors();
    $message.text("");

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
        $usernameError.text("Debes ingresar el usuario");
        isValid = false;
    } else if (!emailRegex.test(username)) {
        $usernameError.text("Debes ingresar un usuario válido");
        isValid = false;
    }

    if (!password) {
        $passwordError.text("Debes ingresar la contraseña");
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

$form.on("submit", function (e) {
    e.preventDefault();
    validateLogin();
});

$username.add($password).on("keydown", function (e) {
    if (e.key === "Enter") validateLogin();
});