const AUTH_KEY = "billetera_auth";

export const login = () => localStorage.setItem(AUTH_KEY, "true");
export const logout = () => localStorage.removeItem(AUTH_KEY);
export const isAuthenticated = () => localStorage.getItem(AUTH_KEY) === "true";