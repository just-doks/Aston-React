import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: {isLoading: boolean} = {
    isLoading: false
}

export const { reducer: loaderReducer, actions: loaderActions } = createSlice({
    name: "loader",
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const { setIsLoading } = loaderActions