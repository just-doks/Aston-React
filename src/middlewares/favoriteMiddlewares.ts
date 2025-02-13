import type { Middleware, ThunkMiddleware, UnknownAction } from "@reduxjs/toolkit";
import type { RootState } from "src/store/store.ts";
import { removeFavoritesFromQueue, initFavorites } from "src/store/favoriteSlice";
import { loginUser, registerUser } from "src/store/authSlice";

export const favMiddleware: Middleware<{}, RootState> = api => next => action => {
    if (removeFavoritesFromQueue.match(action)) {
        const { favorite } = api.getState();
        if (!favorite.idsForRemoval?.length) {
            return;
        }
    }
    return next(action);
}

export const favThunk: ThunkMiddleware<RootState, UnknownAction, unknown> = 
({ dispatch, getState }) => next => action => {
    if (loginUser.match(action) || registerUser.match(action)) {
        next(action);
        const state = getState();
        dispatch(initFavorites(state.auth.loginUser.username));
        return;
    }
    return next(action);
}