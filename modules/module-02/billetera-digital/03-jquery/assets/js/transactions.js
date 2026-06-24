import { isAuthenticated } from "./auth.js";
import { getBalance, getMovements } from "./store.js";
import { formatMoney, bindNavigationLinks } from "./util.js";

if (!isAuthenticated()) window.location.href = "login.html";

const $balanceText = $("#balanceText");
const $movementsList = $("#movementsList");
const $paginationContainer = $("#paginationContainer");

const renderBalance = () => {
    $balanceText.text(formatMoney(getBalance()));
};

renderBalance();
bindNavigationLinks();

let currentPage = 1;

const render = (page = 1) => {
    const { data, page: current, totalPages } = getMovements(page);

    renderMovements(data);
    renderPagination(current, totalPages);
};

const renderMovements = (movements) => {
    $movementsList.html(
        movements
            .map(({ tag, registro }) => {
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
            })
            .join("")
    );
};

const renderPagination = (page, totalPages) => {
    $paginationContainer.empty();

    const createButton = ({ icon = null, text = null, targetPage, disabled = false, active = false }) => {
        const $button = $("<button>");

        $button.attr("type", "button");
        $button.addClass(active ? "pagination-btn pagination-btn-active" : "pagination-btn");
        $button.prop("disabled", disabled);

        $button.html(icon ? `<i class="${icon}"></i>` : text);

        if (!disabled) {
            $button.on("click", () => goToPage(targetPage));
        }

        return $button;
    };

    $paginationContainer.append(
        createButton({
            icon: "fa-solid fa-backward-step",
            targetPage: 1,
            disabled: page === 1
        })
    );

    $paginationContainer.append(
        createButton({
            icon: "fa-solid fa-chevron-left",
            targetPage: page - 1,
            disabled: page === 1
        })
    );

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            $paginationContainer.append(
                createButton({
                    text: i,
                    targetPage: i,
                    active: i === page
                })
            );
        }
    } else {
        for (let i = 1; i <= 3; i++) {
            $paginationContainer.append(
                createButton({
                    text: i,
                    targetPage: i,
                    active: i === page
                })
            );
        }

        $paginationContainer.append(
            $("<span>")
                .addClass("px-2 text-secondary")
                .text("...")
        );

        $paginationContainer.append(
            createButton({
                text: totalPages,
                targetPage: totalPages,
                active: page === totalPages
            })
        );
    }

    $paginationContainer.append(
        createButton({
            icon: "fa-solid fa-chevron-right",
            targetPage: page + 1,
            disabled: page === totalPages
        })
    );

    $paginationContainer.append(
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