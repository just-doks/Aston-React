import React, { useState, useEffect } from "react";
import "./App.css";
import { AppRouter } from "./components/Routing/AppRouter";
import { TELEGRAM_API_URL } from "#utils/constants";

type TelegramState = {
    isTelegramShareEnabled: boolean
}
export const TelegramContext = React.createContext<TelegramState | null>(null);

export function App() {
    const [tgState, setTgState] = useState<TelegramState>({isTelegramShareEnabled: false})
    useEffect(() => {
        fetch(TELEGRAM_API_URL)
        .then(response => setTgState({isTelegramShareEnabled: Boolean(response)}))
        .catch(reason => { alert(reason) })
    }, [])
    return (
        <TelegramContext.Provider value={tgState}>
            <AppRouter/>
        </TelegramContext.Provider>
    )
}
