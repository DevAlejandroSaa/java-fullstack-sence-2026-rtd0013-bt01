import { isAuthenticated } from "./auth.js";
import { getBalance, processTransaction } from "./store.js";
import { formatMoney, bindNavigationLinks } from "./util.js";

if (!isAuthenticated()) window.location.href = "login.html";

const $balanceText = $("#balanceText");

const renderBalance = () => {
    $balanceText.text(formatMoney(getBalance()));
};

renderBalance();
bindNavigationLinks();

const $form = $("form");
const $amount = $("#amount");
const $amountError = $("#amountError");
const $depositResult = $("#depositResult");

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
    $amountError.text(message);
};

const showSuccess = (message) => {
    $depositResult.text(message);
};

const clearMessages = () => {
    $amountError.text("");
    $depositResult.text("");
};

$form.on("submit", function (e) {
    e.preventDefault();

    const value = $amount.val();
    const error = validateAmount(value);

    if (error) {
        showError(error);
        return;
    }

    clearMessages();

    const registro = {
        id: crypto.randomUUID(),
        amount: Number(value),
        date: new Date().toISOString()
    };

    processTransaction("deposit", "+", registro);
    renderBalance();
    showSuccess("Depósito realizado con éxito");
});