import { useLayoutEffect } from "react";
import { $host } from "./http";
import "./App.css";
import { AppRouter } from "./components/Routing/AppRouter";
import { useDispatch } from "react-redux";
import { enableTelegramShare } from "./store/searchSlice";

export function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const fetchTelegram = async () => {
      const { data } = await $host.get(
        "https://react-http-2e5c1-default-rtdb.europe-west1.firebasedatabase.app/isTelegramShareEnabled.json"
      );
      dispatch(enableTelegramShare({isTelegramShareEnabled: data}));
    };
    fetchTelegram();
  }, []);
  return <AppRouter />;
}
