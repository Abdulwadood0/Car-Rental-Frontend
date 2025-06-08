import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cars: [],
    car: null,
    modelYears: [],
    carsPriceRanges: [],
    endDate: null,
    message: null,
    loading: false,
    error: null,
    isCarDeleted: false,
    isCarUpdated: false,
    isCarCreated: false,
    count: null
}

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setCars: (state, action) => {
            state.cars = action.payload;
        },
        clearCars: (state) => {
            state.cars = [];
        },
        setCar: (state, action) => {
            state.car = action.payload;
        },
        clearCar: (state) => {
            state.car = [];
        },
        setModelYears: (state, action) => {
            state.modelYears = action.payload;
        },
        clearModelYears: (state) => {
            state.modelYears = [];
        },

        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        clearEndDate: (state) => {
            state.endDate = null;
        },

        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = null;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },

        setCarsPriceRanges: (state, action) => {
            state.carsPriceRanges = action.payload;
        },
        clearCarsPriceRanges: (state) => {
            state.carsPriceRanges = [];
        },

        setIsCarDeleted: (state) => {
            state.isCarDeleted = true;
        },
        clearIsCarDeleted: (state) => {
            state.isCarDeleted = false;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
        clearCount: (state) => {
            state.count = null;
        },
        setIsCarUpdated: (state) => {
            state.isCarUpdated = true;
        },
        clearIsCarUpdated: (state) => {
            state.isCarUpdated = false;
        },
        setIsCarCreated: (state) => {
            state.isCarCreated = true;
        },
        clearIsCarCreated: (state) => {
            state.isCarCreated = false;
        },
    }
})

const carsReducer = carsSlice.reducer;
const carsActions = carsSlice.actions;

export { carsReducer, carsActions };
