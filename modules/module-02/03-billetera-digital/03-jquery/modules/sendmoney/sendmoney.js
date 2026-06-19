import { getBalance, getContacts, subtractBalance, addTransfer } from "../../core/store/store.js";

export default {
    constructor: () => { },

    destroy: () => { },

    init: () => {
        loadContactsInSelect();
        bindContactSelect();
        bindTransferForm();
        window.addEventListener("contacts:updated", loadContactsInSelect);
        bindAddContactModal();
    }
};

const bindAddContactModal = () => {
    const button = document.querySelector(".add-contact-button");

    button.addEventListener("click", async () => {
        await loadAddContactModal();
    }, { once: true });
};

const loadAddContactModal = async () => {
    const moduleName = "add-contact";

    loadCss(moduleName);
    await loadHtml(moduleName);
    await loadJs(moduleName);
};

const getPath = (moduleName, ext) => {
    return new URL(`./${moduleName}/${moduleName}.${ext}`, import.meta.url);
};

const loadHtml = async (moduleName) => {
    const path = getPath(moduleName, "html");
    const response = await fetch(path);
    const html = await response.text();
    document.getElementById("modalContent").innerHTML = html;
};

const loadJs = async (moduleName) => {
    const path = getPath(moduleName, "js");

    const module = await import(path.href);

    module.default?.init?.();

    return module;
};

const loadCss = (moduleName) => {
    const path = getPath(moduleName, "css");
    const id = `style-${moduleName}`;

    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path.href;

    document.head.appendChild(link);
};

const loadContactsInSelect = () => {
    const select = document.getElementById("contactSelect");

    if (!select) return;

    const contacts = getContacts();

    select.innerHTML = `<option value="">Seleccione un contacto</option>`;

    contacts.forEach(contact => {
        const option = document.createElement("option");

        option.value = contact.id;
        option.textContent = `${contact.name} - ${contact.alias}`;

        select.appendChild(option);
    });
};

const bindContactSelect = () => {
    const select = document.getElementById("contactSelect");

    if (!select) return;

    select.addEventListener("change", handleContactChange);
};

const handleContactChange = (event) => {
    const contactId = Number(event.target.value);

    if (!contactId) {
        clearContactDetails();
        return;
    }

    const contact = getContacts().find(c => c.id === contactId);

    if (!contact) return;

    renderContactDetails(contact);
};

const renderContactDetails = (contact) => {
    const container = document.getElementById("contactDetailsPlaceholder");

    if (!container) return;

    container.innerHTML = `
        <div class="mb-2">
            <div><strong>Nombre y Apellido</strong></div>
            <div>${contact.name}</div>
        </div>

        <div class="mb-2">
            <div><strong>CBU</strong></div>
            <div>${contact.cbu}</div>
        </div>

        <div class="mb-2">
            <div><strong>Alias</strong></div>
            <div>${contact.alias}</div>
        </div>

        <div class="mb-2">
            <div><strong>Banco</strong></div>
            <div>${contact.bank}</div>
        </div>
    `;
};

const clearContactDetails = () => {
    const container = document.getElementById("contactDetailsPlaceholder");

    if (!container) return;

    container.innerHTML = `
        <div>Nombre y Apellido: <span></span></div>
        <div>CBU: <span></span></div>
        <div>Alias: <span></span></div>
        <div>Banco: <span></span></div>
    `;
};

const validateTransfer = ({ contactId, amount }) => {
    const errors = [];

    const balance = getBalance();
    const value = Number(amount);

    if (!contactId) {
        errors.push({
            field: "contactSelect",
            message: "Debe seleccionar un contacto."
        });
    }

    if (amount === "" || isNaN(value)) {
        errors.push({
            field: "amount",
            message: "Debe ingresar un monto válido."
        });
        return errors;
    }

    if (value <= 0) {
        errors.push({
            field: "amount",
            message: "El monto debe ser mayor a 0."
        });
    }

    if (value > balance) {
        errors.push({
            field: "amount",
            message: `Saldo insuficiente. Disponible: ${balance}`
        });
    }

    return errors;
};

const displayValidationErrors = (errors) => {
    clearValidationErrors();

    errors.forEach(({ field, message }) => {
        const input = document.getElementById(field);
        const errorBox = document.getElementById(`${field}Error`);

        if (input) input.classList.add("is-invalid");

        if (errorBox) {
            errorBox.textContent = message;
        }
    });
};

const showMessage = (message, type = "success") => {
    const box = document.getElementById("sendMoneyMessage");

    if (!box) return;

    box.className = `alert alert-${type} mt-3`;
    box.textContent = message;
};

const clearValidationErrors = () => {
    document.querySelectorAll(".is-invalid")
        .forEach(element => element.classList.remove("is-invalid"));

    document.querySelectorAll("[id$='Error']")
        .forEach(element => element.textContent = "");
};

const processTransfer = ({ contact, amount, description }) => {
    addTransfer({
        contactId: contact.id,
        amount,
        description
    });

    subtractBalance(amount);

    showMessage("El envío de dinero se realizó correctamente.");
};

const bindTransferForm = () => {
    const form = document.getElementById("sendMoneyForm");

    if (!form) return;

    form.addEventListener("submit", handleTransferSubmit);
};

const handleTransferSubmit = (event) => {
    event.preventDefault();

    clearValidationErrors();

    const contactId = Number(
        document.getElementById("contactSelect")?.value
    );

    const amount = document.getElementById("amount")?.value ?? "";

    const description =
        document.getElementById("description")?.value ?? "";

    const errors = validateTransfer({
        contactId,
        amount
    });

    if (errors.length > 0) {
        displayValidationErrors(errors);
        return;
    }

    const contact = getContacts().find(
        contact => contact.id === contactId
    );

    processTransfer({
        contact,
        amount,
        description
    });
};