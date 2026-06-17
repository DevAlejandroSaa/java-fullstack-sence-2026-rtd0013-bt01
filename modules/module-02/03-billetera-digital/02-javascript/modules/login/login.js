import Root from "../../core/root/root.js";
import Auth from "../../core/session/auth.js";

export default {

    init: () => bindEvents(),

    destroy: () => destroy()
};

const get = (id) => document.getElementById(id);

const usernameInput = () => get("username");
const passwordInput = () => get("password");
const messageBox = () => get("loginMessage");

const getUsername = () => usernameInput().value.trim();
const getPassword = () => passwordInput().value.trim();

const showMessage = (text, type) => {
    const box = messageBox();
    box.className = `mt-3 text-center ${type}`;
    box.textContent = text;
};

const clearMessage = () => {
    const box = messageBox();
    box.className = "mt-3 text-center";
    box.textContent = "";
};

const markError = (input) => input.classList.add("is-invalid");
const clearError = (input) => input.classList.remove("is-invalid");

const validateEmpty = (u, p) => {
    let ok = true;

    if (!u) {
        markError(usernameInput());
        ok = false;
    } else {
        clearError(usernameInput());
    }

    if (!p) {
        markError(passwordInput());
        ok = false;
    } else {
        clearError(passwordInput());
    }

    if (!ok) showMessage("Debes completar todos los campos.", "text-danger");

    return ok;
};

const validateCredentials = (u, p) => {
    const ok = (u === "admin" && p === "1234");

    if (!ok) {
        markError(usernameInput());
        markError(passwordInput());
        showMessage("Credenciales incorrectas.", "text-danger");
    }

    return ok;
};

const success = async () => {
    Auth.login();
    showMessage("Inicio de sesión correcto.", "text-success");
    await Root.navigate("menu");
};

const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    clearMessage();

    const u = getUsername();
    const p = getPassword();

    if (!validateEmpty(u, p)) return;
    if (!validateCredentials(u, p)) return;

    await success();
};

const bindEvents = () => {
    const btn = get("loginButton");
    btn.addEventListener("click", handleLogin, true);
};

const destroy = () => {
    const btn = get("loginButton");
    if (btn) btn.replaceWith(btn.cloneNode(true));
};