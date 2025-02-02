import { RootState } from "../store/store";

export const authSelectors = {
    loginUser: (state: RootState) => state.auth.loginUser,
    isAuth: (state: RootState) => state.auth.isAuth,
    error: (state: RootState) => state.auth.error
}

