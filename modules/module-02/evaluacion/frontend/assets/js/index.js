import { isAuthenticated } from "./auth.js";

window.location.href = isAuthenticated() ? "pages/menu.html" : "pages/login.html";