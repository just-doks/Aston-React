import { useEffect } from "react";
import { $host } from "./http";
import "./App.css";
import { AppRouter } from "./components/AppRouter";

export function App() {
  const fetchTelegram = async () => {
    const { data } = await $host.get(
      "https://react-http-2e5c1-default-rtdb.europe-west1.firebasedatabase.app/isTelegramShareEnabled.json"
    );
    return data
  };
  useEffect(() => {
    fetchTelegram();
  }, []);
  return <AppRouter />;
}
