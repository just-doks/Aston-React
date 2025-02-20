
import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { logout } from "./authSlice";
import { loadFavorites, saveFavorites } from "src/utils/localStorageFunc";

export type favoriteState = {
    userLogin: string | null,
    ids: number[] | null,
    idsForRemoval: number[] | null
}

const initialState: favoriteState = {
    userLogin: null,
    ids: null,
    idsForRemoval: null
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
            state.idsForRemoval = [] as number[];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout, (state) => {
                state.ids = null;
                state.userLogin = null;
                state.idsForRemoval = null;
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

export const selectIds = createSelector([selectFavorite], (fav) => fav.ids);