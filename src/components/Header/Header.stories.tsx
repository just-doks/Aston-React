import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { Header } from "./Header";
import { MemoryRouter } from "react-router";
import "./Header.css"
import "../../App.css";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer, usersAdapter } from "../../store/authSlice";

const MockStore = (isAuth: boolean, user?: {username: string }) => configureStore({
    reducer:  { auth: authReducer },
    preloadedState: {
        auth: usersAdapter.getInitialState({
            ids: user ? [user.username] : [],
            entities: user ? { [user.username] : user } : {},
            isAuth,
            loginUser: user,
            error: ''
        })
    }
})

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const notAuthorized: Story = {
    decorators: [
        (Story) => (
            <Provider store={MockStore(false)}>
                <MemoryRouter>
                    <Story/>
                </MemoryRouter>
            </Provider>
        )
    ]
};

export const Authorized: Story = {
    decorators: [
        (Story) => (
            <Provider store={MockStore(true, { username: "Guest" })}>
                <MemoryRouter>
                    <Story/>
                </MemoryRouter>
            </Provider>
        )
    ]
};