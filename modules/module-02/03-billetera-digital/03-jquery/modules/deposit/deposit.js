import { addBalance, getBalance, getCurrency, addDeposit } from "../../core/store/store.js";

export default {

    constructor() { },
    destroy() { },
    init() {
        bindDepositForm();
    }

}

const validateAmount = (amount) => {
    if (isNaN(amount) || amount <= 0) {
        return "❌ Debes ingresar un monto válido";
    }
    return null;
};

const formatCLP = (amount) =>
    new Intl.NumberFormat("es-CL").format(amount);

const handleDeposit = (amount) => {
    addBalance(Number(amount));
    addDeposit(amount);

    return {
        balance: getBalance(),
        currency: getCurrency()
    };
};

const renderMessage = (text) => {
    const message = document.getElementById("depositMessage");

    if (!message) return;

    message.innerHTML = text;
};

const bindDepositForm = () => {
    const form = document.getElementById("depositForm");
    const input = document.getElementById("depositAmount");

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const amount = Number(input.value);

        const error = validateAmount(amount);

        if (error) {
            renderMessage(error);
            return;
        }

        const result = handleDeposit(amount);

        renderMessage(
            `✅ Depósito realizado con éxito <br>
             💰 Nuevo saldo: $${formatCLP(result.balance)} ${result.currency}`
        );

        input.value = "";
    });
};