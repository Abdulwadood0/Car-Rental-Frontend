import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: null,
    accounts: [],
    isLoading: false,
    isAccountUpdated: false,
    isAccountDeleted: false,
    errorMessage: null,
    count: null
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        clearAccount: (state) => {
            state.account = null;
        },


        setAccounts: (state, action) => {
            state.accounts = action.payload;
        },
        clearAccounts: (state) => {
            state.accounts = [];
        },


        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearIsLoading: (state) => {
            state.isLoading = false;
        },


        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        },


        setIsAccountUpdated: (state, action) => {
            state.isAccountUpdated = action.payload;
        },
        clearIsAccountUpdated: (state) => {
            state.isAccountUpdated = false;
        },


        setIsAccountDeleted: (state, action) => {
            state.isAccountDeleted = action.payload;
        },
        clearIsAccountDeleted: (state) => {
            state.isAccountDeleted = false;
        },

        setCount: (state, action) => {
            state.count = action.payload
        },
        clearCount: (state) => {
            state.count = null
        },
    },

})

const accountReducer = accountSlice.reducer;
const accountActions = accountSlice.actions;

export { accountReducer, accountActions };
