export default class Root {

    static currentInstance = null;
    static currentModule = null;

    static titles = {
        login: "Inicio de sesión",
        menu: "Menú principal",
        deposit: "Depósito",
        sendmoney: "Enviar dinero",
        transactions: "Últimos movimientos"
    };

    static navigate = async (moduleName) => {
        await Root.destroyCurrent();
        await Root.destroyCss(moduleName);

        await Root.loadHtml(moduleName);
        await Root.loadJs(moduleName);
        await Root.loadCss(moduleName);

        await Root.initCurrent();
        Root.setTitle(moduleName);
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
}