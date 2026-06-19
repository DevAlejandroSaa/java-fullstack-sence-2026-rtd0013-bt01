import Auth from "../session/auth.js";
import { Header } from "../layouts/header/header.js";
import Footer from "../layouts/footer/footer.js";

export default class Root {

    static currentInstance = null;
    static currentModule = null;
    static currentRoute = null;
    static overlay = null;

    static titles = {
        login: "Inicio de sesión",
        menu: "Menú principal",
        deposit: "Depósito",
        sendmoney: "Enviar dinero",
        transactions: "Últimos movimientos"
    };

    static navigate = async (moduleName) => {
        const from = Root.currentRoute;
        const to = moduleName;

        await Root.loadLayout();

        await Root.runTransition(from, to, async () => {
            await Root.destroyCurrent();
            await Root.destroyCss(moduleName);

            await Root.loadJs(moduleName);
            await Root.loadCss(moduleName);
            await Root.loadHtml(moduleName);

            await Root.initCurrent();

            Root.updateLayout(moduleName);
            Root.setTitle(moduleName);

            Root.currentRoute = moduleName;
            localStorage.setItem("currentRoute", moduleName);
        });
    };

    static setTitle = (moduleName) => document.title = `Wallet Digital | ${Root.titles[moduleName] || moduleName}`;

    static getPath = (moduleName, ext) => {
        return `/modules/${moduleName}/${moduleName}.${ext}`;
    };

    static loadHtml = async (moduleName) => {
        const path = Root.getPath(moduleName, "html");
        const response = await fetch(path);
        const html = await response.text();
        document.querySelector("#app").innerHTML = html;
    };

    static loadJs = async (moduleName) => {
        const path = Root.getPath(moduleName, "js");
        const module = await import(path);
        Root.currentModule = module.default;
        Root.currentInstance = Root.currentModule;
    };

    static loadCss = (moduleName) => {
        const path = Root.getPath(moduleName, "css");
        const id = `style-${moduleName}`;

        if (document.getElementById(id)) return;

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = path;
        link.id = id;

        document.head.appendChild(link);
    };

    static destroyCss = (moduleName) => document.getElementById(`style-${moduleName}`)?.remove();

    static destroyCurrent = async () => {
        if (Root.currentInstance?.destroy) {
            await Root.currentInstance.destroy();
        }
        Root.currentInstance = null;
        Root.currentModule = null;
    };

    static initCurrent = async () => {
        if (Root.currentInstance?.init) {
            await Root.currentInstance.init();
        }
    };

    static loadLayout = async () => {
        const header = document.getElementById("header");
        const footer = document.getElementById("footer");

        if (header && !header.innerHTML.trim()) {
            header.innerHTML = await Header();

            const { bindEvents } = await import("../layouts/header/header.js");
            bindEvents();
        }

        if (footer && !footer.innerHTML.trim()) {
            footer.innerHTML = await Footer();
        }
    };

    static updateLayout = (moduleName) => {
        document.getElementById("header")?.classList.toggle("d-none", moduleName === "login");
        document.getElementById("footer")?.classList.toggle("d-none", moduleName === "login");
    };

    static resolveRoute = (moduleName) => {
        if (!Auth.isLoggedIn() && moduleName !== "login") {
            moduleName = "login";
        }

        if (Auth.isLoggedIn() && moduleName === "login") {
            moduleName = "menu";
        }

        return moduleName;
    };

    static getInitialRoute = () => {
        const savedRoute = localStorage.getItem("currentRoute");
        const route = savedRoute || "login";
        return Root.resolveRoute(route);
    };

    static initTransition = () => {
        Root.overlay = document.getElementById("transitionOverlay");
    };

    static getTransitionDelay = (from, to) => {
        if (!from) return 0; // refresh / primera carga

        if (from === "login" && to === "menu") {
            return 2000;
        }

        return 1000;
    };

    static runTransition = async (from, to, callback) => {
        if (!from || from === "login" || to === "login") {
            await callback();
            return;
        }

        Root.showTransitionToast(from, to);

        const delay = Root.getTransitionDelay(from, to);

        if (delay === 0) {
            await callback();
            return;
        }

        if (Root.overlay) {
            Root.overlay.classList.add("active");
        }

        await new Promise(r => setTimeout(r, delay));

        await callback();

        if (Root.overlay) {
            Root.overlay.classList.remove("active");
        }
    };

    static showTransitionToast = (from, to) => {
        const toastEl = document.getElementById("walletToast");
        const msg = document.getElementById("toastMessage");

        if (!toastEl || !msg) return;

        msg.innerHTML = `
        <div>🔄 Mensaje de transición</div>
        <div class="small text-light">
            ${from ?? "inicio"} → ${to}
        </div>
    `;

        const toast = new bootstrap.Toast(toastEl, {
            delay: 1000
        });

        toast.show();
    };
}