import { addContact, getContacts } from "../../../core/store/store.js";

export default {
    constructor() { },
    destroy() { },

    init() {
        bindSaveButton();
    }
};

const bindSaveButton = () => {
    const button = document.querySelector("#contactForm button[type='submit']");

    button.addEventListener("click", handleSaveContact);
};

const handleSaveContact = (event) => {
    event.preventDefault();

    clearValidationErrors();
    clearMessage();

    const contact = getContactData();

    const errors = validateContact(contact);
    const duplicateErrors = validateDuplicates(contact);

    const allErrors = [...errors, ...duplicateErrors];

    if (allErrors.length > 0) {
        displayValidationErrors(allErrors);
        return;
    }

    addContact(contact);
    window.dispatchEvent(new Event("contacts:updated"));

    showMessage("Contacto agregado correctamente", "success");

    resetForm();
};

const getContactData = () => ({
    name: getValue("contactName"),
    cbu: getValue("contactCbu"),
    alias: getValue("contactAlias"),
    bank: getValue("contactBank")
});

const getValue = (id) =>
    document.getElementById(id).value.trim();

const validateContact = ({ name, cbu, alias }) => {
    const errors = [];

    if (!name) {
        errors.push({
            field: "contactName",
            message: "Debe ingresar un nombre y apellido."
        });
    }

    if (!cbu) {
        errors.push({
            field: "contactCbu",
            message: "Debe ingresar un número de CBU."
        });
    } else if (!/^\d+$/.test(cbu)) {
        errors.push({
            field: "contactCbu",
            message: "El CBU solo puede contener números."
        });
    }

    if (!alias) {
        errors.push({
            field: "contactAlias",
            message: "Debe ingresar un alias."
        });
    }

    return errors;
};

const validateDuplicates = ({ name, cbu, alias }) => {
    const contacts = getContacts();
    const errors = [];

    const nameExists = contacts.some(
        c => c.name.toLowerCase() === name.toLowerCase()
    );

    const cbuExists = contacts.some(
        c => c.cbu === cbu
    );

    const aliasExists = contacts.some(
        c => c.alias.toLowerCase() === alias.toLowerCase()
    );

    if (nameExists) {
        errors.push({
            field: "contactName",
            message: "Este nombre ya está registrado."
        });
    }

    if (cbuExists) {
        errors.push({
            field: "contactCbu",
            message: "Este CBU ya está registrado."
        });
    }

    if (aliasExists) {
        errors.push({
            field: "contactAlias",
            message: "Este alias ya está registrado."
        });
    }

    return errors;
};

const displayValidationErrors = (errors) => {
    errors.forEach(({ field, message }) => {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);

        if (input) input.classList.add("is-invalid");
        if (errorElement) errorElement.textContent = message;
    });
};

const clearValidationErrors = () => {
    document
        .querySelectorAll(".is-invalid")
        .forEach(el => el.classList.remove("is-invalid"));

    document
        .querySelectorAll("[id$='Error']")
        .forEach(el => el.textContent = "");
};

const showMessage = (text, type = "success") => {
    const container = document.getElementById("addContactMessage");

    if (!container) return;

    container.className = `mt-3 mb-4 p-2 text-center text-${type}`;
    container.textContent = text;
};

const clearMessage = () => {
    const container = document.getElementById("addContactMessage");

    if (!container) return;

    container.textContent = "";
};

const resetForm = () => {
    document.getElementById("contactForm").reset();
};