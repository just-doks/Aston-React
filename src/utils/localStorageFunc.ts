import { TypeFilters } from "../http/characterTypes";

export type User = {
    username: string;
    password: string;
};

const LOCAL_STORAGE_KEYS = {
    USERS: "users",
    LOGIN_USER: "loginUser",
    SEARCH_HISTORY: "searchHistory"
}

export const loadUsersFromLocalStorage = (): User[] => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS) || "[]");
};


export const loadLoginUser = (): User | null => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.LOGIN_USER) || "null");
};


export const saveLoginUserToLocalStorage = (user: User) => {
    const existingUser = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGIN_USER)
    if(!existingUser) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.LOGIN_USER, JSON.stringify(user));
    }
};

export const saveUsersToLocalStorage = (users: User[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const removeItemFromLocalStorage = (item: string) => {
    localStorage.removeItem(item);
};

export const saveSearchConfigToLocalStorage = (searchConfig: TypeFilters[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchConfig))
}

export const loadSearchConfigFromLocalStorage = (): TypeFilters[] => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_HISTORY) || "[]");
}