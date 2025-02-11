import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  type User,
  loadUsersFromLocalStorage,
  loadLoginUser,
  saveLoginUserToLocalStorage,
  saveUsersToLocalStorage,
  removeItemFromLocalStorage,
} from "../utils/localStorageFunc";

const storedUser = loadLoginUser();
const initialUsers = loadUsersFromLocalStorage()

const usersAdapter = createEntityAdapter({
  selectId: (user: User) => user.username
})

const initialState = usersAdapter.getInitialState ({
  ids: initialUsers.map(user => user.username),
  entities: Object.fromEntries(initialUsers.map(user => [user.username, user])),
  isAuth: !!storedUser,
  loginUser: storedUser,
  error: "",
});

export const {reducer: authReducer, actions: authActions} = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      const existingUser = Object.values(state.entities).find(
        (user) => user.username === action.payload.username
      );

      if (existingUser) {
        state.error = "User with the same name already exists";
      } else {
        usersAdapter.addOne(state, action.payload)
        saveUsersToLocalStorage(Object.values(state.entities));

        state.loginUser = action.payload;
        saveLoginUserToLocalStorage(action.payload);
        state.isAuth = true;
        state.error = "";
      }
    },
    loginUser: (state, action: PayloadAction<User>) => {
      const foundUser = Object.values(state.entities).find(
        (user) =>
          user.username === action.payload.username
      );

      if (!foundUser) {
        state.error = "Incorrect login"
      }
      else if (foundUser.password !== action.payload.password) {
        state.error = "Incorrect password"
      }
      else {
        state.loginUser = foundUser;
        saveLoginUserToLocalStorage(foundUser);
        state.isAuth = true;
        state.error = "";
      }
    },
    logout: (state) => {
      removeItemFromLocalStorage("loginUser");
      state.loginUser = null;
      state.isAuth = false;
    },
    removeError: (state) => {
      state.error = ''
    }
  },
});

export const { registerUser, loginUser, logout, removeError } = authActions;
