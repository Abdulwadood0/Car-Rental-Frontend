import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reservation: null,
    reservations: [],
    loading: false,
    isReservationCreated: false,
    isReservationUpdated: false,
    count: null
}

const reservaitionSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        setReservation: (state, action) => {
            state.reservation = action.payload
        },
        clearReservation: (state) => {
            state.reservation = null
        },

        setReservations: (state, action) => {
            state.reservations = action.payload
        },
        clearReservations: (state) => {
            state.reservations = []
        },

        setLoading: (state) => {
            state.loading = true
        },
        clearLoading: (state) => {
            state.loading = false
        },

        setIsReservationCreated: (state) => {
            state.isReservationCreated = true
        },
        clearIsReservationCreated: (state) => {
            state.isReservationCreated = false
        },

        setIsReservationUpdated: (state) => {
            state.isReservationUpdated = true
        },
        clearIsReservationUpdated: (state) => {
            state.isReservationUpdated = false
        },

        setCount: (state, action) => {
            state.count = action.payload
        },
        clearCount: (state) => {
            state.count = null
        },

    }
})

const reservaitionReducer = reservaitionSlice.reducer
const reservaitionActions = reservaitionSlice.actions

export { reservaitionActions, reservaitionReducer };
