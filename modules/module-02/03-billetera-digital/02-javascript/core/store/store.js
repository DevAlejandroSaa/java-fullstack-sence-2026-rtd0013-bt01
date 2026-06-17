/**
 * =====================
 * STORAGE
 * =====================
 */

const STORAGE_KEY = "wallet_state";

const DEFAULT_STATE = {
    balance: 150000,
    currency: "CLP",
    contacts: [],
    deposits: [],
    transfers: []
};

const loadState = () => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return structuredClone(DEFAULT_STATE);
    }

    try {
        const parsed = JSON.parse(data);

        return {
            ...structuredClone(DEFAULT_STATE),
            ...parsed,
            contacts: parsed.contacts ?? [],
            deposits: parsed.deposits ?? [],
            transfers: parsed.transfers ?? []
        };
    } catch {
        return structuredClone(DEFAULT_STATE);
    }
};

let state = loadState();

const saveState = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};


/**
 * =====================
 * SALDO
 * =====================
 */

export const getBalance = () => state.balance;

export const getCurrency = () => state.currency;

export const addBalance = (amount) => {
    state.balance += Number(amount);
    saveState();
};

export const subtractBalance = (amount) => {
    state.balance -= Number(amount);
    saveState();
};

export const setBalance = (amount) => {
    state.balance = Number(amount);
    saveState();
};

export const addDeposit = (amount) => {
    state.deposits.push({
        id: Date.now(),
        amount: Number(amount),
        createdAt: new Date().toISOString()
    });

    saveState();
};

/**
 * =====================
 * CONTACTOS
 * =====================
 */

export const getContacts = () => [...state.contacts];

export const getContactById = (id) =>
    state.contacts.find(contact => contact.id === id);

export const getContactByAlias = (alias) =>
    state.contacts.find(
        contact =>
            contact.alias.toLowerCase() === alias.toLowerCase()
    );

export const existsContact = (alias) =>
    state.contacts.some(
        contact =>
            contact.alias.toLowerCase() === alias.toLowerCase()
    );

export const addContact = ({ name, cbu, alias, bank }) => {
    const nextId = getNextContactId();

    state.contacts.push({
        id: nextId,
        name,
        cbu,
        alias,
        bank,
        createdAt: new Date().toISOString()
    });

    saveState();
};

const getNextContactId = () => {
    if (state.contacts.length === 0) {
        return 1;
    }

    return Math.max(...state.contacts.map(c => c.id)) + 1;
};

/**
 * =====================
 * TRANSFERENCIAS
 * =====================
 */

export const getTransfers = () => [...state.transfers];

export const getTransferById = (id) =>
    state.transfers.find(transfer => transfer.id === id);

export const addTransfer = ({
    contactId,
    amount,
    description
}) => {
    const nextId = getNextTransferId();

    state.transfers.push({
        id: nextId,
        contactId,
        amount: Number(amount),
        description,
        createdAt: new Date().toISOString()
    });

    saveState();
};

export const clearTransfers = () => {
    state.transfers = [];
    saveState();
};

const getNextTransferId = () => {
    if (state.transfers.length === 0) {
        return 1;
    }

    return Math.max(
        ...state.transfers.map(transfer => transfer.id)
    ) + 1;
};

/**
 * últimos movimientos
 */
const getClosestIndexesByDate = (items, limit = 5) => {
    const now = Date.now();

    return items
        .map((item, index) => ({
            index,
            diff: Math.abs(now - new Date(item.createdAt).getTime())
        }))
        .sort((a, b) => a.diff - b.diff)
        .slice(0, limit)
        .map(item => item.index);
};

const getClosestItems = (items, limit = 5) => {
    const indexes = getClosestIndexesByDate(items, limit);
    return indexes.map(index => items[index]);
};

const buildTaggedItem = (item, tag) => ({
    tag,
    item
});

export const getLastMovements = () => {
    const deposits = getClosestItems(state.deposits, 5);
    const transfers = getClosestItems(state.transfers, 5);

    const allItems = [
        ...deposits.map(item => buildTaggedItem(item, "deposit")),
        ...transfers.map(item => buildTaggedItem(item, "transfer"))
    ];

    return allItems.sort(
        (a, b) =>
            new Date(b.item.createdAt) -
            new Date(a.item.createdAt)
    );
};