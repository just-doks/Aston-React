import { HistoryItemType } from "../http/characterTypes";

export type User = {
    id?: string;
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

export const saveSearchConfigToLocalStorage = (searchConfig: HistoryItemType[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchConfig))
}

export const loadSearchConfigFromLocalStorage = (): HistoryItemType[] => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_HISTORY) || "[]");
}

/**
 * Функция сохранения массива идентификаторов избранных в localStorage 
 */
export function saveFavorites(userLogin: string, favoriteIds: number[]) {
    localStorage.setItem(userLogin, favoriteIds.toString());
}

/**
 * Функция получения массива идентификаторов избранных из localStorage 
 */
export function loadFavorites(userLogin: string) {
    const item = localStorage.getItem(userLogin);
    if (item) 
        return item.split(',').map(el => Number(el));
    else 
        return [] as number[];
}