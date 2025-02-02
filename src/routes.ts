import { JSX } from "react";
import { HomePage } from "./pages/HomePage";
import { PATHS } from "./utils/constants";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { CharacterPage } from "./pages/CharacterPage";

export const publicRoutes: {path: string, Component: (props: any) => JSX.Element}[] = [
    {
        path: PATHS.HOME,
        Component: HomePage
    },
    {
        path: PATHS.SEARCH,
        Component: SearchPage
    },
    {
        path: PATHS.CHARACTER,
        Component: CharacterPage
    }
]
