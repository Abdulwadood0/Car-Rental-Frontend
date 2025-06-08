import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carCompanies: [],
    loading: false,
    isCarCompanyDeleted: false,
    isCarCompanyCreated: false,
    isCarCompanyUpdated: false
}

const carCompaniesSlice = createSlice({
    name: "carCompanies",
    initialState,
    reducers: {
        setCarCompanies: (state, action) => {
            state.carCompanies = action.payload
        },
        clearCarCompanies: (state) => {
            state.carCompanies = []
        },


        setLoading: (state) => {
            state.loading = true
        },
        clearLoading: (state) => {
            state.loading = false
        },


        setIsCarCompanyDeleted: (state) => {
            state.isCarCompanyDeleted = true
        },
        clearIsCarCompanyDeleted: (state) => {
            state.isCarCompanyDeleted = false
        },


        setIsCarCompanyCreated: (state) => {
            state.isCarCompanyCreated = true
        },
        clearIsCarCompanyCreated: (state) => {
            state.isCarCompanyCreated = false
        },

        setIsCarCompanyUpdated: (state) => {
            state.isCarCompanyUpdated = true
        },
        clearIsCarCompanyUpdated: (state) => {
            state.isCarCompanyUpdated = false
        },
    }
})

const carCompaniesReducer = carCompaniesSlice.reducer
const carCompaniesActions = carCompaniesSlice.actions

export { carCompaniesActions, carCompaniesReducer }