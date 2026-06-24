import { isAuthenticated, getUser } from "./auth.js";
import { getBalance, getTotalMovements, getTotalIncome, getTotalExpenses } from "./store.js";
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

$("#incomeSummary").text(formatMoney(getTotalIncome()));
$("#expenseSummary").text(formatMoney(getTotalExpenses()));
$("#movementsSummary").text(getTotalMovements());