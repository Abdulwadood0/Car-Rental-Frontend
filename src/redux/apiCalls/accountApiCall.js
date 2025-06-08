import { toast } from "react-toastify";
import request from "../../utils/request";
import { accountActions } from "../slices/accountSlice";
import { authActions } from "../slices/authSlice";

export function updateAccount(account, t) {
    return async (dispatch, getState) => {

        dispatch(accountActions.setIsLoading(true));
        try {
            const { data } = await request.put(`api/users/${getState().auth.user._id}`, account,
                {
                    headers: {
                        "Authorization": `Bearer ${getState().auth.user.token}`
                    }
                }
            );

            dispatch(accountActions.setIsAccountUpdated(true));
            dispatch(accountActions.setIsLoading(false));
            dispatch(authActions.UpdateUser(account))
            toast.success(t(data.message));
        } catch (error) {
            dispatch(accountActions.setErrorMessage(error.response.data.message));
            dispatch(accountActions.setIsLoading(false));
        }
    }
}


export function deleteAccount(id,) {
    return async (dispatch, getState) => {

        dispatch(accountActions.setIsLoading(true));
        try {
            const { data } = await request.delete(`api/users/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${getState().auth.user.token}`
                    }
                }
            );

            dispatch(accountActions.setIsAccountDeleted(true));
            dispatch(accountActions.setIsLoading(false));
            toast.success((data.message));
        } catch (error) {
            dispatch(accountActions.setErrorMessage(error.response.data.message));
            dispatch(accountActions.setIsLoading(false));
        }
    }
}



export function getAccounts(search, page = 1, limit = 7) {
    return async (dispatch, getState) => {

        dispatch(accountActions.setIsLoading(true));
        try {
            const { data } = await request.get(`api/users/`,
                {
                    params: { search, page, limit },
                    headers: {
                        "Authorization": `Bearer ${getState().auth.user.token}`
                    }
                }
            );
            dispatch(accountActions.setAccounts(data.users))
            dispatch(accountActions.setCount(data.count))
            dispatch(accountActions.setIsLoading(false));
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(accountActions.setIsLoading(false));
        }
    }
}

