export default class Auth {
    static STORAGE_KEY = "isLoggedIn";

    static login = () => localStorage.setItem(Auth.STORAGE_KEY, "true");
    static logout = () => localStorage.removeItem(Auth.STORAGE_KEY);
    static isLoggedIn = () => localStorage.getItem(Auth.STORAGE_KEY) === "true";
}