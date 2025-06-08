import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payment: null,
    loading: false,
    message: "",
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPayment: (state, action) => {
            state.payment = action.payload
        },
        clearPayment: (state) => {
            state.payment = null
        },

        setLoading: (state) => {
            state.loading = true
        },
        clearLoading: (state) => {
            state.loading = false
        },

        setMessage: (state, action) => {
            state.message = action.payload
        },
        clearMessage: (state) => {
            state.message = ""
        },


    }
})

const paymentRducer = paymentSlice.reducer
const paymentActions = paymentSlice.actions;

export { paymentActions, paymentRducer };