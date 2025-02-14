import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  fetchAllCharacters,
  fetchCharacterPage,
  fetchFilteredCharacters,
} from "../http/characterAPI";
import {
  configureSearch,
  setSearchError,
  setSearchResults,
} from "./searchSlice";
import { TypeFilters, HistoryItemType } from "../http/characterTypes";
import { getRandomId } from "../utils/randomId";
import { getCurrentDate } from "../utils/getDate";
import { saveSearchConfigToLocalStorage } from "../utils/localStorageFunc";
import { setIsLoading } from "./loaderSlice";

type FilteredCharactersArgs = {
  data: TypeFilters;
  isWriteToHistory: boolean;
};

const fetchAllCharactersThunk = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("search/fetchAllCharacters", async (_, { dispatch }) => {
  try {
    dispatch(setIsLoading(true))
    const data = await fetchAllCharacters();
    dispatch(setSearchResults(data));
  } catch (err) {
    dispatch(setSearchError(err.code));
  } finally {
    dispatch(setIsLoading(false))
  }
});

export const fetchIfEmptyThunk = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("search/fetchIfEmpty", async (_, { getState, dispatch }) => {
  const state = getState();
  const { searchResults, searchError } = state.search;
  const characters = searchResults?.results || [];

  if (!characters.length && !searchError) {
      dispatch(fetchAllCharactersThunk());
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
      dispatch(setIsLoading(true));
      const data = await fetchCharacterPage(url);
      dispatch(setSearchResults(data));
    } catch (err) {
      dispatch(setSearchError(err.code));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
});

export const fetchFilteredCharactersThunk = createAsyncThunk<
  void,
  FilteredCharactersArgs,
  { state: RootState }
>(
  "search/fetchFilteredCharacters",
  async ({ data, isWriteToHistory }, { getState, dispatch }) => {
    const { isAuth } = getState().auth;
    const writeCondition = isWriteToHistory && isAuth;
    try {
      dispatch(setIsLoading(true));
      dispatch(setSearchError(""));
      dispatch(configureSearch(data));
      const searchResults = await fetchFilteredCharacters(data);
      dispatch(setSearchResults(searchResults));
      if (writeCondition) {
        dispatch(configureHistoryThunk(data));
      }
    } catch (error) {
      dispatch(setSearchError(error.code));
      if (writeCondition && isAuth) {
        dispatch(
          configureHistoryThunk({
            ...data,
            error: "Error. Something went terribly wrong.",
          })
        );
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const configureHistoryThunk = createAsyncThunk<
  HistoryItemType,
  TypeFilters,
  { state: RootState }
>(
  "search/configureHistory",
  async (searchConfig, { getState, rejectWithValue }) => {
    const state = getState();

    if (!state.auth.isAuth) {
      return rejectWithValue("User is not authorized");
    }

    const username = state.auth.loginUser.username;

    const historyItem: HistoryItemType = {
      id: getRandomId(5),
      ...searchConfig,
      date: getCurrentDate(),
      username,
    };

    const updateHistory = [historyItem, ...state.search.history];

    saveSearchConfigToLocalStorage(updateHistory);

    return historyItem;
  }
);
