import { isAuthenticated, getUser } from "./auth.js";
import { getBalance, addContact, getContacts, processTransaction } from "./store.js";
import { formatMoney, bindNavigationLinks } from "./util.js";

if (!isAuthenticated()) window.location.href = "login.html";

const $balanceText = $("#balanceText");

const renderBalance = () => {
    $balanceText.text(formatMoney(getBalance()));
};

renderBalance();
bindNavigationLinks();

const user = getUser();
$("#userName").text(user ?? "Usuario");

const $newContactForm = $("#newContactForm");

const $nombre = $('[name="nombre"]');
const $cbu = $('[name="cbu"]');
const $alias = $('[name="alias"]');
const $banco = $('[name="banco"]');

const $errorNombre = $("#error-nombre");
const $errorCbu = $("#error-cbu");
const $errorAlias = $("#error-alias");
const $errorBanco = $("#error-banco");

const $newContactSuccess = $("#success-message");

const clearMessages = () => {
    $errorNombre.text("");
    $errorCbu.text("");
    $errorAlias.text("");
    $errorBanco.text("");
    $newContactSuccess.text("");
};

const validateNombre = (value) => {
    if (!value) return "El nombre es obligatorio";
    if (value.trim().length < 3) return "Mínimo 3 caracteres";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "Solo letras";
    return null;
};

const validateCbu = (value) => {
    if (!value) return "El CBU es obligatorio";
    if (value.length !== 5) return "Debe tener 5 dígitos";
    if (isNaN(value)) return "Solo números";
    return null;
};

const validateAlias = (value) => {
    if (!value) return "El alias es obligatorio";
    if (value.trim().length < 3) return "Mínimo 3 caracteres";
    return null;
};

const validateBanco = (value) => {
    if (!value) return "Debes seleccionar un banco";
    return null;
};

const validateForm = () => {
    clearMessages();

    const nombre = $nombre.val().trim();
    const cbu = $cbu.val().trim();
    const alias = $alias.val().trim();
    const banco = $banco.val();

    let isValid = true;

    const nombreError = validateNombre(nombre);
    const cbuError = validateCbu(cbu);
    const aliasError = validateAlias(alias);
    const bancoError = validateBanco(banco);

    if (nombreError) {
        $errorNombre.text(nombreError);
        isValid = false;
    }

    if (cbuError) {
        $errorCbu.text(cbuError);
        isValid = false;
    }

    if (aliasError) {
        $errorAlias.text(aliasError);
        isValid = false;
    }

    if (bancoError) {
        $errorBanco.text(bancoError);
        isValid = false;
    }

    return isValid;
};

$newContactForm.on("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const newContact = {
        id: crypto.randomUUID(),
        nombre: $nombre.val().trim(),
        cbu: $cbu.val().trim(),
        alias: $alias.val().trim(),
        banco: $banco.val()
    };

    addContact(newContact);

    $newContactSuccess.text("Contacto guardado correctamente");
    this.reset();
});

const $searchForm = $("#searchContactForm");
const $searchInput = $("#searchContactForm [name='search']");
const $searchMessage = $("#search-message");

let selectedContactId = null;

const searchContacts = (contacts, query) => {
    const q = query.toLowerCase().trim();

    if (!q) {
        selectedContactId = null;
        return [];
    }

    const filtered = contacts.filter(c => c.nombre.toLowerCase().includes(q));
    selectedContactId = filtered.length > 0 ? filtered[0].id : null;

    return filtered;
};

$searchForm.on("submit", function (e) {
    e.preventDefault();

    const value = $searchInput.val();
    const contacts = getContacts();
    const results = searchContacts(contacts, value);

    if (!value.trim()) {
        $searchMessage.text("Debes ingresar un nombre para buscar")
            .attr("class", "small mt-2 text-center text-danger");
        return;
    }

    if (results.length === 0) {
        $searchMessage.text("No se encontraron contactos")
            .attr("class", "small mt-2 text-center text-danger");
        return;
    }

    $searchMessage.text("contacto encontrado")
        .attr("class", "small text-success text-center mt-2 p-2");
});

const $sendMoneyForm = $("#sendMoneyForm");
const $sendAmount = $('[name="amount"]');
const $sendError = $("#error-amount");
const $sendSuccess = $("#success-send");

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

$sendMoneyForm.on("submit", function (e) {
    e.preventDefault();

    const amount = Number($sendAmount.val());

    const contactError = validateContact();
    const amountError = validateAmount(amount);

    if (contactError) {
        $searchMessage.text(contactError)
            .attr("class", "small mt-2 text-center text-danger");
        return;
    }

    if (amountError) {
        $sendError.text(amountError);
        return;
    }

    const registro = {
        id: crypto.randomUUID(),
        idContact: selectedContactId,
        amount,
        date: new Date().toISOString()
    };

    processTransaction("sendMoney", "-", registro);
    renderBalance();

    $sendSuccess.text("Transferencia válida");
    $sendError.text("");
});