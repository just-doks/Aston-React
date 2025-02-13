import { configureStore, combineReducers, Tuple } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { searchReducer } from "./searchSlice";
import { loaderReducer } from "./loaderSlice";
import { favoriteReducer } from "./favoriteSlice";
import {
    favMiddleware,
    favThunk
} from 'src/middlewares/favoriteMiddlewares.ts';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    loader: loaderReducer,
    favorite: favoriteReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: () => new Tuple(favMiddleware, favThunk),
    devTools: true
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;