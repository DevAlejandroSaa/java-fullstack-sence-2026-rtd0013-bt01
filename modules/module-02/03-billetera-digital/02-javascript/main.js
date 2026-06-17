import Root from "./core/root/root.js"
import Auth from "./core/session/auth.js";

Root.initTransition();
await Root.navigate(Root.getInitialRoute());

document.addEventListener("click", (e) => {
    const routeElement = e.target.closest("[data-route]");
    if (!routeElement) return;

    e.preventDefault();

    const route = routeElement.dataset.route;

    Root.navigate(route);
});