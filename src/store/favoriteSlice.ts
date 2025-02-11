
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { logout } from "./authSlice";
import { loadFavorites, saveFavorites } from "src/utils/localStorageFunc";

export type favoriteState = {
    userLogin: string | null,
    ids: number[],
    idsForRemoval: number[]
}

const initialState: favoriteState = {
    userLogin: null,
    ids: [] as number[],
    idsForRemoval: [] as number[]
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<number>) {
            state.ids.push(action.payload);
            saveFavorites(state.userLogin, state.ids);
        },
        removeFavorite(state, action: PayloadAction<number>) {
            state.ids = state.ids.filter((id) => id !== action.payload);
            saveFavorites(state.userLogin, state.ids);
        },
        addToRemoveQueue(state, action: PayloadAction<number>)  {
            state.idsForRemoval.push(action.payload);
        },
        removeFromQueue(state, action: PayloadAction<number>) {
            state.idsForRemoval = 
                state.idsForRemoval.filter(id => id !== action.payload);
        },
        removeFavoritesFromQueue(state) {
            state.ids = state.ids.filter((id) => !state.idsForRemoval.includes(id));
            state.idsForRemoval = [];
            saveFavorites(state.userLogin, state.ids);
        },
        initFavorites(state, action: PayloadAction<string>) {
            state.userLogin = action.payload;
            state.ids = loadFavorites(state.userLogin);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout, (state) => {
                state = initialState;
            })
    }
});

export const favoriteReducer = favoriteSlice.reducer;
export const { 
    addFavorite, 
    removeFavorite,
    addToRemoveQueue,
    removeFromQueue,
    removeFavoritesFromQueue,
    initFavorites
} = favoriteSlice.actions;

export const selectFavorite = (state: RootState) => state.favorite;