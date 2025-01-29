import { FC } from "react";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { PATHS } from "./utils/constants";

export const publicRoutes: {path: string, Component: FC}[] = [
    {
        path: PATHS.HOME,
        Component: HomePage
    },
    {
        path: PATHS.SEARCH,
        Component: SearchPage
    }
]