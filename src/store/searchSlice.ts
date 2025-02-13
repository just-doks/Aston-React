import { CharacterResponse, HistoryItemType } from "@/http/characterTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeFilters } from "../http/characterTypes";
import { loadSearchConfigFromLocalStorage, removeItemFromLocalStorage } from "../utils/localStorageFunc";
import { configureHistoryThunk } from "./searchThunks";

export type SearchState = {
  searchConfig: TypeFilters;
  history: HistoryItemType[];
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
  searchError: "",
  isTelegramShareEnabled: false,
};

export const { reducer: searchReducer, actions: searchActions } = createSlice({
  name: "search",
  initialState,
  reducers: {
    configureSearch(state, action: PayloadAction<TypeFilters>) {
      state.searchConfig = action.payload;
    },
    clearHistory(state) {
      state.history.length = 0;
      removeItemFromLocalStorage("searchHistory");
    },
    clearSearchConfig(state) {
      state.searchConfig = { name: "" };
    },
    setSearchResults(state, action: PayloadAction<CharacterResponse>) {
      state.searchResults = action.payload;
    },
    setSearchError(state, action: PayloadAction<string>) {
      state.searchError = action.payload;
    },
    enableTelegramShare(
      state,
      action: PayloadAction<{ isTelegramShareEnabled: boolean }>
    ) {
      state.isTelegramShareEnabled = action.payload.isTelegramShareEnabled;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configureHistoryThunk.fulfilled, (state, action) => {
      state.history.unshift(action.payload)
    })
  }
});

export const {
  configureSearch,
  setSearchResults,
  clearHistory,
  clearSearchConfig,
  setSearchError,
  enableTelegramShare,
} = searchActions;
