import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";

export function login(userData) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("api/auth/login", userData, { withCredentials: true });
            dispatch(authActions.setUser(data.user));
            dispatch(authActions.setAccessToken(data.accessToken));
            dispatch(authActions.setIsLoading(false));

        } catch (error) {
            dispatch(authActions.setErrorMessage(error.response.data.message));
            dispatch(authActions.setIsLoading(false));
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await request.post("api/auth/logout", {}, { withCredentials: true })
            dispatch(authActions.logout());

        } catch (error) {
            toast.error("Something went wrong")
        }

    }
}

export function register(userData) {
    return async (dispatch) => {
        try {
            await request.post("api/auth/signup", userData);
            dispatch(authActions.clearErrorMessage());
            dispatch(authActions.setIsRegisterSuccess(true));
            dispatch(authActions.setSuccessMessage("Account created successfully, please login"));
            dispatch(authActions.setIsLoading(false));
        } catch (error) {
            dispatch(authActions.setIsRegisterSuccess(false));
            dispatch(authActions.setErrorMessage(error.response.data.message));
            dispatch(authActions.setIsLoading(false));
        }
    }
}

export function fetchCurrentUser() {
    return async (dispatch, getState) => {
        try {

            const { data } = await request.get("api/auth/me")
            dispatch(authActions.setUser(data))



        } catch (error) {
            dispatch(authActions.logout())
        }

    }
}
