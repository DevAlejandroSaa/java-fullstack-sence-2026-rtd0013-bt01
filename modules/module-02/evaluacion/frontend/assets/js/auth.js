const AUTH_KEY = "billetera_auth";

export const login = () => localStorage.setItem(AUTH_KEY, "true");
export const logout = () => localStorage.removeItem(AUTH_KEY);
export const isAuthenticated = () => localStorage.getItem(AUTH_KEY) === "true";

const USER_KEY = "billetera_user";

export const setUser = (email) => {
    const user = email.split("@")[0];
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));