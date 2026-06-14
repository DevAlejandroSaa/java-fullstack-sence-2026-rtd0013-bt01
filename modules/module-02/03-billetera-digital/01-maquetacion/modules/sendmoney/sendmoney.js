
export default {

    constructor: () => { },

    init: () => {
        loadAddContactModal();
    },

    destroy: () => { }
};

const loadAddContactModal = async () => {
    const moduleName = "add-contact";

    await loadHtml(moduleName);
    await loadJs(moduleName);
    loadCss(moduleName);
};

const getPath = (moduleName, ext) => {
    return new URL(`./${moduleName}/${moduleName}.${ext}`, import.meta.url);
};

const loadHtml = async (moduleName) => {
    const path = getPath(moduleName, "html");
    const response = await fetch(path);
    const html = await response.text();
    document.getElementById("modalContent").innerHTML = html;
};

const loadJs = async (moduleName) => {
    const path = getPath(moduleName, "js");
    return await import(path.href);
};

const loadCss = (moduleName) => {
    const path = getPath(moduleName, "css");
    const id = `style-${moduleName}`;

    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path.href;

    document.head.appendChild(link);
};