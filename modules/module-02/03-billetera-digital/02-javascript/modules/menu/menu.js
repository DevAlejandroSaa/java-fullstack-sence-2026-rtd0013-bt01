import { getBalance, getCurrency } from "../../core/store/store.js";

export default {

    constructor() { },
    destroy() { },
    init() {
        loadBalance();
    }

}

const get = (id) => document.getElementById(id);
const formatBalance = (amount) => amount.toLocaleString("es-CL");
const loadBalance = () => get("balance").textContent = `$${formatBalance(getBalance())} ${getCurrency()}`;