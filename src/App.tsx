import React, { useState, useLayoutEffect } from "react";
import "./App.css";
import { AppRouter } from "./components/Routing/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./utils/selectors";
import { initFavorites } from "./store/favoriteSlice";
import { TELEGRAM_API_URL } from "#utils/constants";

type TelegramState = {
    isTelegramShareEnabled: boolean
}
export const TelegramContext = React.createContext<TelegramState | null>(null);

export function App() {
    const dispatch = useDispatch();
    const user = useSelector(loginUser);
    const [tgState, setTgState] = useState<TelegramState>({isTelegramShareEnabled: false})
    useLayoutEffect(() => {
        fetch(TELEGRAM_API_URL)
        .then(response => setTgState({isTelegramShareEnabled: Boolean(response)}))
        .catch(reason => { alert(reason) })
        if (user) dispatch(initFavorites(user.username));
    }, [])
    return (
        <TelegramContext.Provider value={tgState}>
            <AppRouter/>
        </TelegramContext.Provider>
    )
}
