import { FC } from "react";
import { HomePage } from "./pages/HomePage";
import { PATHS } from "./utils/constants";
import { SearchPage } from "./pages/SearchPage";
import { CharacterPage } from "./pages/CharacterPage";
import { SignInPage, SignUpPage } from "./pages/AuthPages/AuthPages";
import { HistoryPage } from "./pages/HistoryPage/HistoryPage";
import { FavPage } from "./pages/FavPage";

export type RouteType = {
  path: string,
  Component: FC
};

export const publicRoutes: RouteType[] = [
    {
        path: PATHS.HOME,
        Component: HomePage,
    },
    { 
        path: PATHS.SEARCH, 
        Component: SearchPage 
    },
    { 
        path: PATHS.SIGNUP, 
        Component: SignUpPage 
    },
    { 
        path: PATHS.SIGNIN, 
        Component: SignInPage 
    },
    {
        path: PATHS.CHARACTER + '/:id',
        Component: CharacterPage
    }
];

export const privateRoutes: RouteType[] = [
    { 
        path: PATHS.HISTORY, 
        Component: HistoryPage 
    },
    {
        path: PATHS.FAVORITES,
        Component: FavPage
    }
];

