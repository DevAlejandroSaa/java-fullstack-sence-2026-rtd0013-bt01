import { logout } from "./auth.js";

export const formatMoney = (value) => new Intl.NumberFormat("es-CL").format(value);

export const showRedirectToast = (message, route) => {
    const overlay = document.getElementById("loadingOverlay");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;

    overlay.classList.remove("d-none");

    setTimeout(() => {
        window.location.href = route;
    }, 1000);
};

const NAVIGATION_MESSAGES = {
    menuButton: "Redirigiendo a Menú...",
    depositButton: "Redirigiendo a Depositar...",
    sendButton: "Redirigiendo a Enviar Dinero...",
    historyButton: "Redirigiendo a Últimos Movimientos...",
    logoutButton: "Cerrando sesión..."
};

export const bindNavigationLinks = () => {
    document.addEventListener("click", event => {
        const button = event.target.closest("a");
        if (!button) { return; }
        const message = NAVIGATION_MESSAGES[button.id];
        if (!message) { return; }
        event.preventDefault();
        if (button.id === "logoutButton") logout();
        showRedirectToast(message, button.href);
    });
};

export const formatDate = (date) => new Date(date).toLocaleString("es-CL");