import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    errorMessage: null,
    successMessage: null,
    isRegisterSuccess: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        UpdateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
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

        setIsRegisterSuccess: (state, action) => {
            state.isRegisterSuccess = action.payload;
        },
        clearIsRegisterSuccess: (state) => {
            state.isRegisterSuccess = false;
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearIsLoading: (state) => {
            state.isLoading = false;
        },
    },
});


//Extract the reducer from the slice so I can give it to the Redux store.
const authReducer = authSlice.reducer;

//Extract all the action functions so I can dispatch them like dispatch(authActions.login(data))
const authActions = authSlice.actions;

export { authReducer, authActions };



