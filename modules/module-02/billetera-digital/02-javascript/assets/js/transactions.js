import { isAuthenticated } from "./auth.js";
import { getBalance, getMovements } from "./store.js";
import { formatMoney, showRedirectToast, bindNavigationLinks } from "./util.js";

if (!isAuthenticated()) window.location.href = "login.html";

const balanceText = document.getElementById("balanceText");

const renderBalance = () => balanceText.textContent = formatMoney(getBalance());

renderBalance();
bindNavigationLinks();

// mostrar los últimos movimientos
let currentPage = 1;

const render = (page = 1) => {
    const { data, page: current, totalPages } = getMovements(page);

    renderMovements(data);
    renderPagination(current, totalPages);
};

const renderMovements = (movements) => {
    movementsList.innerHTML = movements.map(({ tag, registro }) => {
        const isDeposit = tag === "deposit";

        return `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <div class="fw-semibold">
                        ${isDeposit ? "Depósito" : "Envío de dinero"}
                    </div>
                    <small class="text-secondary">
                        ${registro.date}
                    </small>
                </div>

                <span class="${isDeposit ? "text-success" : "text-danger"} fw-bold">
                    ${isDeposit ? "+" : "-"} ${formatMoney(registro.amount)}
                </span>
            </li>
        `;
    }).join("");
};

const renderPagination = (page, totalPages) => {
    paginationContainer.innerHTML = "";

    const createButton = ({ icon = null, text = null, targetPage, disabled = false, active = false }) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = active
            ? "pagination-btn pagination-btn-active"
            : "pagination-btn";

        button.disabled = disabled;

        button.innerHTML = icon
            ? `<i class="${icon}"></i>`
            : text;

        if (!disabled) {
            button.addEventListener("click", () => goToPage(targetPage));
        }

        return button;
    };

    paginationContainer.appendChild(
        createButton({
            icon: "fa-solid fa-backward-step",
            targetPage: 1,
            disabled: page === 1
        })
    );

    paginationContainer.appendChild(
        createButton({
            icon: "fa-solid fa-chevron-left",
            targetPage: page - 1,
            disabled: page === 1
        })
    );

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(
                createButton({
                    text: i,
                    targetPage: i,
                    active: i === page
                })
            );
        }
    } else {
        for (let i = 1; i <= 3; i++) {
            paginationContainer.appendChild(
                createButton({
                    text: i,
                    targetPage: i,
                    active: i === page
                })
            );
        }

        const dots = document.createElement("span");
        dots.className = "px-2 text-secondary";
        dots.textContent = "...";

        paginationContainer.appendChild(dots);

        paginationContainer.appendChild(
            createButton({
                text: totalPages,
                targetPage: totalPages,
                active: page === totalPages
            })
        );
    }

    paginationContainer.appendChild(
        createButton({
            icon: "fa-solid fa-chevron-right",
            targetPage: page + 1,
            disabled: page === totalPages
        })
    );

    paginationContainer.appendChild(
        createButton({
            icon: "fa-solid fa-forward-step",
            targetPage: totalPages,
            disabled: page === totalPages
        })
    );
};

const goToPage = (page) => {
    currentPage = page;
    render(currentPage);
};

render();