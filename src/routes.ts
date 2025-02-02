import { FC } from "react";
import { HomePage } from "./pages/HomePage/HomePage";
import { PATHS } from "./utils/constants";
import { SignInPage, SignUpPage } from "./pages/AuthPages/AuthPages";
import { HistoryPage } from "./pages/HistoryPage/HistoryPage";

export const publicRoutes: { path: string; Component: FC }[] = [
  {
    path: PATHS.HOME,
    Component: HomePage,
  },
  { path: PATHS.SIGNUP, Component: SignUpPage },
  { path: PATHS.SIGNIN, Component: SignInPage },
  { path: PATHS.HISTORY, Component: HistoryPage}
];
