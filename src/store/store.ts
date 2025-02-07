import { combineReducers, configureStore, Tuple } from "@reduxjs/toolkit";
import {authReducer} from "./authSlice"
import {searchReducer} from "./searchSlice"
import { favoriteReducer, favMiddleware } from "./favoriteSlice";

const rootReduceer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    favorite: favoriteReducer
})

export const store = configureStore({
    reducer: rootReduceer,
    middleware: () => new Tuple(favMiddleware),
    devTools: true
})

export type RootState = ReturnType<typeof rootReduceer>;
export type AppDispatch = typeof store.dispatch;