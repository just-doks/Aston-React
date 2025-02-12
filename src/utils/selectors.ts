import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const error = (state: RootState) => state.auth.error

export const isAuth = (state: RootState) => state.auth.isAuth

export const loginUser = (state: RootState) => state.auth.loginUser

export const searchConfig = (state: RootState) => state.search.searchConfig

export const searchError = (state: RootState) => state.search.searchError

export const searchResults = (state: RootState) => state.search.searchResults

export const history = (state: RootState) => state.search.history

export const telegramFlag = (state: RootState) => state.search.isTelegramShareEnabled

export const authUserHistory = createSelector(
    [history, loginUser], 
    (history, loginUser) => history.filter((historyItem) => historyItem.username === loginUser.username)
)

export const isLoading = (state: RootState) => state.loader.isLoading