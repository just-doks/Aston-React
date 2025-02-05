import { CharacterResponse } from "@/http/characterTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeFilters } from "../http/characterTypes";

export type SearchState = {
  searchConfig: TypeFilters;
  searchResults: CharacterResponse;
  searchError: string;
  isTelegramShareEnabled: boolean;
};

const initialState: SearchState = {
  searchConfig: {
    name: "",
  },
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

export const { configureSearch, setSearchResults, setSearchError, enableTelegramShare } = searchActions;