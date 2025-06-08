import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isResetPasswordLinkVerified: null,
    isPasswordReset: false,
    errorMessage: null,
    successMessage: null,
    isLoading: false,
}

const passwordSlice = createSlice({
    name: "password",
    initialState,
    reducers: {
        setIsResetPasswordLinkVerified: (state, action) => {
            state.isResetPasswordLinkVerified = action.payload;
        },
        clearIsResetPasswordLinkVerified: (state) => {
            state.isResetPasswordLinkVerified = false;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        setIsPasswordReset: (state, action) => {
            state.isPasswordReset = action.payload;
        },
        clearIsPasswordReset: (state) => {
            state.isPasswordReset = false;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearIsLoading: (state) => {
            state.isLoading = false;
        },
    }
})

const passwordReducer = passwordSlice.reducer;
const passwordActions = passwordSlice.actions;

export { passwordReducer, passwordActions };


