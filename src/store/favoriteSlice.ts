
import { createSlice } from "@reduxjs/toolkit";
import type { Middleware, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type favoriteState = {
    ids: number[],
    idsForRemoval: number[]
}

const initialState: favoriteState = {
    ids: [],
    idsForRemoval: []
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<number>) {
            state.ids.push(action.payload);
        },
        removeFavorite(state, action: PayloadAction<number>) {
            state.ids = state.ids.filter((id) => id !== action.payload);
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
        }
    }
});

export const favoriteReducer = favoriteSlice.reducer;
export const { 
    addFavorite, 
    removeFavorite,
    addToRemoveQueue,
    removeFromQueue,
    removeFavoritesFromQueue 
} = favoriteSlice.actions;

export const selectFavorite = (state: RootState) => state.favorite;

export const favMiddleware: Middleware<{}, RootState> = store => next => action => {
    if (removeFavoritesFromQueue.match(action)) {
        const { favorite } = store.getState();
        if (!favorite.idsForRemoval.length) {
            console.log("it works");
            return;
        }
    }
    return next(action);
}