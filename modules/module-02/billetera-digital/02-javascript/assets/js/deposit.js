import { isAuthenticated } from "./auth.js";
import { getBalance, processTransaction } from "./store.js";
import { formatMoney, bindNavigationLinks } from "./util.js";

if (!isAuthenticated()) window.location.href = "login.html";

const balanceText = document.getElementById("balanceText");

const renderBalance = () => balanceText.textContent = formatMoney(getBalance());

renderBalance();
bindNavigationLinks();

const form = document.querySelector("form");
const amountInput = document.getElementById("amount");
const amountError = document.getElementById("amountError");
const depositResult = document.getElementById("depositResult");

const isEmpty = (value) => value.trim() === "";
const isNotNumber = (value) => isNaN(Number(value));
const isInvalidAmount = (value) => Number(value) <= 0;

const validateAmount = (value) => {
    if (isEmpty(value)) return "Debe ingresar un monto";
    if (isNotNumber(value)) return "Debe ingresar un número válido";
    if (isInvalidAmount(value)) return "El monto debe ser mayor a 0";
    return null;
};

const showError = (message) => {
    amountError.textContent = message;
};

const showSuccess = (message) => {
    depositResult.textContent = message;
};

const clearMessages = () => {
    amountError.textContent = "";
    depositResult.textContent = "";
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = amountInput.value;
    const error = validateAmount(value);

    if (error) {
        showError(error);
        return;
    }

    clearMessages();

    const registro = ({ id: crypto.randomUUID(), amount: Number(value), date: new Date().toISOString() });
    processTransaction("deposit", "+", registro);
    renderBalance();
    showSuccess("Depósito realizado con éxito");
});