import { paymentActions } from "../slices/paymentSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function makePayment(reservationId, paymentInfo, t) {
    return async (dispatch, getState) => {
        try {
            dispatch(paymentActions.setLoading())

            const { data } = await request.post(`api/payment/${reservationId}`, paymentInfo, {
                headers: {
                    "Authorization": `Bearer ${getState().auth.user.token}`
                }
            })

            dispatch(paymentActions.clearLoading())
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }


        } catch (error) {
            toast.error(t(error.response.data.message))
            dispatch(paymentActions.setMessage(error.response.data.message))
            dispatch(paymentActions.clearLoading())

        }
    }
}

export function retryPayment(reservationId, paymentInfo, t) {
    return async (dispatch, getState) => {

        try {
            dispatch(paymentActions.setLoading())

            const { data } = await request.post(`/api/payment/retry/${reservationId}`, paymentInfo, {
                headers: {
                    "Authorization": `Bearer ${getState().auth.user.token}`
                }
            })

            dispatch(paymentActions.clearLoading())
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }


        } catch (error) {
            toast.error(t(error.response.data.message))
            dispatch(paymentActions.setMessage(error.response.data.message))
            dispatch(paymentActions.clearLoading())

        }
    }
}

export function handlePaymentCallBack(paymentId) {
    return async (dispatch) => {
        try {
            dispatch(paymentActions.setLoading())
            const { data } = await request.get(`/api/payment/callback?id=${paymentId}`)

            dispatch(paymentActions.setMessage(data.message))
            dispatch(paymentActions.setPayment(data.payment))

            dispatch(paymentActions.clearLoading())

        } catch (error) {
            dispatch(paymentActions.setMessage(error?.response?.data?.message))
            dispatch(paymentActions.clearLoading())


        }
    }
}