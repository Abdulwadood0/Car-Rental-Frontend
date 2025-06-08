import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { passwordReducer } from "./slices/passwordSlice";
import { carsReducer } from "./slices/carsSlice";
import { accountReducer } from "./slices/accountSlice";
import { reservaitionReducer } from "./slices/reservationSlice";
import { paymentRducer } from "./slices/paymentSlice";
import { carCompaniesReducer } from "./slices/carCompaniesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        password: passwordReducer,
        cars: carsReducer,
        account: accountReducer,
        reservation: reservaitionReducer,
        payment: paymentRducer,
        carCompanies: carCompaniesReducer,
    },
});


