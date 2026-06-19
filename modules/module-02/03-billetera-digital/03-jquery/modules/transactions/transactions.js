import { getLastMovements } from "../../core/store/store.js";

export default {

    constructor() { },
    destroy() { },
    init() {
        loadMovements();
    }

}

const loadMovements = () => {
    const container = document.getElementById("transactionsList");

    if (!container) return;

    const movements = getLastMovements();

    container.innerHTML = movements.map(m => `
    <tr>
        <td>
            <span class="badge ${m.tag === "deposit"
            ? "bg-success"
            : "bg-primary"
        }">
                ${m.tag === "deposit" ? "Depósito" : "Envío"}
            </span>
        </td>

        <td class="fw-semibold">
            $${m.item.amount}
        </td>

        <td class="text-white">
            ${formatDate(m.item.createdAt)}
        </td>
    </tr>
`).join("");
};

const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat("es-CL", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(dateStr));
};