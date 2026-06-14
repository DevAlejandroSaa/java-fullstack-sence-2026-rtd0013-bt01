import Root from "./core/root/root.js"
import Header from "./core/layouts/header/header.js";
import Footer from "./core/layouts/footer/footer.js";

document.getElementById("header").innerHTML = await Header();
document.getElementById("footer").innerHTML = await Footer();

const toggleLayout = (route) => {
    document.getElementById("header").classList.toggle("d-none", route === "login");
    document.getElementById("footer").classList.toggle("d-none", route === "login");
};

Root.navigate("login");
toggleLayout("login");

document.addEventListener("click", (e) => {
    const routeElement = e.target.closest("[data-route]");
    if (!routeElement) return;

    e.preventDefault();

    const route = routeElement.dataset.route;

    Root.navigate(route);
    toggleLayout(route);
});