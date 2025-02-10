import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  fetchAllCharacters,
  fetchCharacterPage,
  fetchFilteredCharacters,
} from "../http/characterAPI";
import {
  configureHistory,
  configureSearch,
  setSearchError,
  setSearchResults,
} from "./searchSlice";
import { TypeFilters } from "../http/characterTypes";

type FilteredCharactersArgs = {
  data: TypeFilters;
  isWriteToHistory: boolean;
};

export const fetchIfEmptyThunk = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("search/fetchIfEmpty", async (_, { getState, dispatch }) => {
  const { searchResults, searchError, history } = getState().search;
  const characters = searchResults?.results || [];

  if (!characters.length && !searchError && history.length) {
    try {
      const data = await fetchFilteredCharacters(history[0]);
      dispatch(setSearchResults(data));
    } catch (err) {
      if ((err.code = "ERR_BAD_REQUEST")) {
        try {
          const data = await fetchAllCharacters();
          dispatch(setSearchResults(data));
        } catch (err) {
          dispatch(setSearchError(err.code));
        }
      } else {
        dispatch(setSearchError(err.code));
      }
    }
  }
});

export const fetchCharacterPageThunk = createAsyncThunk<
  void,
  "prevPage" | "nextPage",
  { state: RootState }
>("search/fetchCharacterPage", async (page, { getState, dispatch }) => {
  const { searchResults } = getState().search;
  const nextPage = searchResults?.info?.next;
  const prevPage = searchResults?.info?.prev;

  const url = page === "prevPage" ? prevPage : nextPage;

  if (url) {
    try {
      const data = await fetchCharacterPage(url);
      dispatch(setSearchResults(data));
    } catch (err) {
      dispatch(setSearchError(err.code));
    }
  }
});

export const fetchFilteredCharactersThunk = createAsyncThunk<
  void,
  FilteredCharactersArgs
>(
  "search/fetchFilteredCharacters",
  async ({ data, isWriteToHistory }, { dispatch }) => {
    try {
      dispatch(setSearchError(""));
      dispatch(configureSearch(data));
      const searchResults = await fetchFilteredCharacters(data);
      dispatch(setSearchResults(searchResults));

      if (isWriteToHistory && data.name) {
        dispatch(configureHistory(data));
      }
    } catch (error) {
      dispatch(setSearchError(error.code));
      if (isWriteToHistory) {
        dispatch(
          configureHistory({
            ...data,
            error: "Error. Something went terribly wrong.",
          })
        );
      }
    }
  }
);
