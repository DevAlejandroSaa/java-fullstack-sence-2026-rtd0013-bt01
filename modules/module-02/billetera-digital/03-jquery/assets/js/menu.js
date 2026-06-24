import { isAuthenticated } from "./auth.js";
import { getBalance } from "./store.js";
import { formatMoney, bindNavigationLinks } from "./util.js";

if (!isAuthenticated()) window.location.href = "login.html";

const $balanceText = $("#balanceText");

const renderBalance = () => {
    $balanceText.text(formatMoney(getBalance()));
};

renderBalance();
bindNavigationLinks();