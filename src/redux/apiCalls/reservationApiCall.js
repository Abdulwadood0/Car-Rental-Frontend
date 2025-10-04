import { reservaitionActions } from "../slices/reservationSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

export function CreateResevation(reservaition) {
    return async (dispatch, getState) => {
        try {
            dispatch(reservaitionActions.setLoading())
            const { data } = await request.post("api/reservation", reservaition)
            dispatch(reservaitionActions.setReservation(data))
            dispatch(reservaitionActions.clearLoading())
            dispatch(reservaitionActions.setIsReservationCreated())

        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(reservaitionActions.clearLoading())

        }
    }
}

export function getReservations(status, t, page = 1, limit = 4, search) {
    return async (dispatch, getState) => {
        try {
            dispatch(reservaitionActions.setLoading())

            const isAdmin = getState().auth.user.isAdmin;

            if (isAdmin) {
                const { data } = await request.get(`api/reservation?status=${status}&page=${page}&limit=${limit}&search=${search}`)
                dispatch(reservaitionActions.setReservations(data.reservations))
                dispatch(reservaitionActions.setCount(data.count))
                dispatch(reservaitionActions.clearLoading())
                return

            }

            if (!status) {
                const { data } = await request.get(`api/reservation?page=${page}&limit=${limit}`)

                dispatch(reservaitionActions.setReservations(data.reservations))
                dispatch(reservaitionActions.setCount(data.count))
                dispatch(reservaitionActions.clearLoading())
                return
            } else if (status) {

                const { data } = await request.get(`api/reservation?status=${status}&page=${page}&limit=${limit}`)
                dispatch(reservaitionActions.setReservations(data.reservations))
                dispatch(reservaitionActions.setCount(data.count))
                dispatch(reservaitionActions.clearLoading())
                return
            }




        } catch (error) {
            toast.error(t(error?.response?.data?.message))
            dispatch(reservaitionActions.clearReservations())
            dispatch(reservaitionActions.clearLoading())

        }
    }
}

export function patchReservation(reservaition, updates, t) {
    return async (dispatch, getState) => {
        try {
            dispatch(reservaitionActions.setLoading())
            const { data } = await request.patch(`/api/reservation/${reservaition._id}`, updates)

            toast.success(t(data.message), {
                autoClose: 2000,
            })
            dispatch(reservaitionActions.clearLoading())
            dispatch(reservaitionActions.setIsReservationUpdated())

        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(reservaitionActions.clearLoading())
        }
    }
}



