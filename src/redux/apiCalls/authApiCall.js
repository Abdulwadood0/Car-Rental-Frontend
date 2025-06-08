import request from "../../utils/request";
import { authActions } from "../slices/authSlice";

export function login(userData) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("api/auth/login", userData);
            dispatch(authActions.login(data));
            dispatch(authActions.setIsLoading(false));
            localStorage.setItem("user", JSON.stringify(data));

        } catch (error) {
            dispatch(authActions.setErrorMessage(error.response.data.message));
            dispatch(authActions.setIsLoading(false));
        }
    }
}

export function logout() {
    return async (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("user");
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
