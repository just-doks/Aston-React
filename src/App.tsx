import { useLayoutEffect } from "react";
import "./App.css";
import { AppRouter } from "./components/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./utils/selectors";
import { initFavorites } from "./store/favoriteSlice";

export function App() {
    const dispatch = useDispatch();
    const user = useSelector(loginUser);
    useLayoutEffect(() => {
        if (user) dispatch(initFavorites(user.username));
    }, [])
    return (
        <AppRouter/>
    )
}
