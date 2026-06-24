const STORAGE_KEY = "wallet_state";

const DEFAULT_STATE = {
    balance: 150000,
    currency: "CLP",
    contacts: [],
    movements: []
};

const loadState = () => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return structuredClone(DEFAULT_STATE);
    }

    try {
        const parsed = JSON.parse(data);

        return {
            balance: parsed.balance ?? DEFAULT_STATE.balance,
            contacts: parsed.contacts ?? [],
            movements: parsed.movements ?? []
        };
    } catch {
        return structuredClone(DEFAULT_STATE);
    }
};

let state = loadState();
const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

// movimientos
const addMovement = ({ tag, registro }) => state.movements = [{ tag, registro }, ...state.movements];

export const getMovements = (page = 1) => {
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
        data: state.movements.slice(start, end),
        page,
        totalPages: Math.ceil(state.movements.length / pageSize)
    };
};

// saldo
export const getBalance = () => state.balance;
const setBalance = (amount, action) => action === "+" ? state.balance += amount : state.balance -= amount;

// deposito y envio de dinero
export const processTransaction = (tag, action, registro) => {
    setBalance(registro.amount, action);
    addMovement({ tag, registro });
    saveState();
};

// contactos
export const addContact = (contact) => {
    state.contacts.push(contact);
    saveState();
};

export const getContacts = () => [...state.contacts];