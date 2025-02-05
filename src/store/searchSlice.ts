import { getRandomId } from '../utils/randomId';
import { CharacterResponse } from "@/http/characterTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeFilters } from "../http/characterTypes";
import { loadSearchConfigFromLocalStorage, removeItemFromLocalStorage, saveSearchConfigToLocalStorage } from "../utils/localStorageFunc"
import { getCurrentDate } from "../utils/getDate";

export type SearchState = {
  searchConfig: TypeFilters;
  history: TypeFilters[];
  searchResults: CharacterResponse;
  searchError: string;
  isTelegramShareEnabled: boolean;
};

const initialState: SearchState = {
  searchConfig: {
    name: "",
  },
  history: loadSearchConfigFromLocalStorage(),
  searchResults: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  },
  searchError: '',
  isTelegramShareEnabled: false
};

export const { reducer: searchReducer, actions: searchActions } = createSlice({
  name: "search",
  initialState,
  reducers: {
    configureSearch(state, action: PayloadAction<TypeFilters>) {
      state.searchConfig = action.payload;
    },
    configureHistory(state, action: PayloadAction<TypeFilters>) {
      state.history.unshift({id: getRandomId(5), ...action.payload, date: getCurrentDate()})
      saveSearchConfigToLocalStorage(state.history)
    },
    clearHistory(state) {
      state.history.length = 0
      removeItemFromLocalStorage("searchHistory")
    },
    clearSearchConfig(state) {
      state.searchConfig = { name: "" }
    },
    setSearchResults(state, action: PayloadAction<CharacterResponse>) {
      state.searchResults = action.payload;
    },
    setSearchError(state, action: PayloadAction<string>) {
        state.searchError = action.payload;
    },
    enableTelegramShare(state, action: PayloadAction<{isTelegramShareEnabled: boolean}>) {
      state.isTelegramShareEnabled = action.payload.isTelegramShareEnabled;
    }
  },
});

export const { configureSearch, configureHistory, setSearchResults, clearHistory, clearSearchConfig, setSearchError } = searchActions;