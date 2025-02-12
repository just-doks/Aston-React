import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { searchReducer } from "./searchSlice";
import { loaderReducer } from "./loaderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        loader: loaderReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch