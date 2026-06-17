import Auth from "../../session/auth.js";
import Root from "../../root/root.js";

const Header = async () => {
    const response = await fetch(new URL("./header.html", import.meta.url));
    return await response.text();
};

const bindEvents = () => document.querySelector("[data-route='login']")?.addEventListener("click", handleLogout);

const handleLogout = async (e) => {
    e.preventDefault();

    Auth.logout();

    await Root.navigate("login");
};

export { Header, bindEvents };