import { isAuthenticated } from "./auth.js";
import { getBalance, addContact, getContacts, processTransaction } from "./store.js";
import { formatMoney, showRedirectToast, bindNavigationLinks } from "./util.js";

if (!isAuthenticated()) window.location.href = "login.html";

const balanceText = document.getElementById("balanceText");

const renderBalance = () => balanceText.textContent = formatMoney(getBalance());
renderBalance();
bindNavigationLinks();

// validaciones para nuevo contacto
const newContactForm = document.getElementById("newContactForm");

// inputs
const nombreInput = newContactForm.querySelector('[name="nombre"]');
const cbuInput = newContactForm.querySelector('[name="cbu"]');
const aliasInput = newContactForm.querySelector('[name="alias"]');
const bancoInput = newContactForm.querySelector('[name="banco"]');

// errores
const errorNombre = document.getElementById("error-nombre");
const errorCbu = document.getElementById("error-cbu");
const errorAlias = document.getElementById("error-alias");
const errorBanco = document.getElementById("error-banco");

// success
const newContactSuccessMessage = document.getElementById("success-message");

const clearMessages = () => {
    errorNombre.textContent = "";
    errorCbu.textContent = "";
    errorAlias.textContent = "";
    errorBanco.textContent = "";
    newContactSuccessMessage.textContent = "";
};

// 🔹 Nombre: letras + mínimo 3
const validateNombre = (value) => {
    if (!value) return "El nombre es obligatorio";
    if (value.trim().length < 3) return "Mínimo 3 caracteres";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "Solo letras";
    return null;
};

// 🔹 CBU: 5 dígitos
const validateCbu = (value) => {
    if (!value) return "El CBU es obligatorio";
    if (value.length !== 5) return "Debe tener 5 dígitos";
    if (isNaN(value)) return "Solo números";
    return null;
};

// 🔹 Alias: mínimo 3
const validateAlias = (value) => {
    if (!value) return "El alias es obligatorio";
    if (value.trim().length < 3) return "Mínimo 3 caracteres";
    return null;
};

// 🔹 Banco: select obligatorio
const validateBanco = (value) => {
    if (!value) return "Debes seleccionar un banco";
    return null;
};

const validateForm = () => {
    clearMessages();

    const nombre = nombreInput.value.trim();
    const cbu = cbuInput.value.trim();
    const alias = aliasInput.value.trim();
    const banco = bancoInput.value;

    let isValid = true;

    const nombreError = validateNombre(nombre);
    const cbuError = validateCbu(cbu);
    const aliasError = validateAlias(alias);
    const bancoError = validateBanco(banco);

    if (nombreError) {
        errorNombre.textContent = nombreError;
        isValid = false;
    }

    if (cbuError) {
        errorCbu.textContent = cbuError;
        isValid = false;
    }

    if (aliasError) {
        errorAlias.textContent = aliasError;
        isValid = false;
    }

    if (bancoError) {
        errorBanco.textContent = bancoError;
        isValid = false;
    }

    return isValid;
};

newContactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newContact = {
        id: crypto.randomUUID(),
        nombre: nombreInput.value.trim(),
        cbu: cbuInput.value.trim(),
        alias: aliasInput.value.trim(),
        banco: bancoInput.value
    };

    addContact(newContact);

    newContactSuccessMessage.textContent = "Contacto guardado correctamente";
    newContactForm.reset();
});

// busca contacto
const searchContactForm = document.getElementById("searchContactForm");
const input = searchContactForm.search;
const searchMessage = document.getElementById("search-message");

let selectedContactId = null;

const searchContacts = (contacts, query) => {
    const q = query.toLowerCase().trim();

    if (!q) {
        selectedContactId = null;
        return [];
    }

    const filtered = contacts.filter(contact => contact.nombre.toLowerCase().includes(q));
    selectedContactId = filtered.length > 0 ? filtered[0].id : null;
    return filtered;
};

searchContactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const contacts = getContacts();
    const results = searchContacts(contacts, input.value);

    if (!input.value.trim()) {
        searchMessage.textContent = "Debes ingresar un nombre para buscar";
        searchMessage.className = "small mt-2 text-center text-danger";
        return;
    }

    if (results.length === 0) {
        searchMessage.textContent = "No se encontraron contactos";
        searchMessage.className = "small mt-2 text-center text-danger";
        return;
    }

    searchMessage.textContent = `contacto encontrado`;
    searchMessage.className = "small text-success text-center mt-2 p-2";
});

// validaciones para enviar dinero
const sendMoneyForm = document.getElementById("sendMoneyForm");
const sendMoneyAmountInput = sendMoneyForm.querySelector('[name="amount"]');

const sendMoneyErrorAmount = document.getElementById("error-amount");
const sendMoneySuccessMessage = document.getElementById("success-send");

const validateContact = () => {
    if (!selectedContactId) return "Debes seleccionar un contacto";
    return null;
};

const validateAmount = (value) => {
    if (!value) return "Debes ingresar un monto";
    if (value <= 0) return "El monto debe ser mayor a 0";
    if (value > getBalance()) return "Saldo insuficiente";
    return null;
};

sendMoneyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const contactError = validateContact();
    const amountError = validateAmount(Number(sendMoneyAmountInput.value));

    if (contactError) {
        searchMessage.textContent = contactError;
        searchMessage.className = "small mt-2 text-center text-danger";
        return;
    }

    if (amountError) {
        sendMoneyErrorAmount.textContent = amountError;
        return;
    }

    const registro = ({ id: crypto.randomUUID(), idContact: selectedContactId, amount: Number(sendMoneyAmountInput.value), date: new Date().toISOString() });
    processTransaction("sendMoney", "-", registro);
    renderBalance();

    sendMoneySuccessMessage.textContent = "Transferencia válida";
    sendMoneyErrorAmount.textContent = "";
});