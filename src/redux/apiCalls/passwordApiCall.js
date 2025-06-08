import request from "../../utils/request";
import { passwordActions } from "../slices/passwordSlice";


export function sendForgotPasswordEmail(email) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/api/password/reset-password-link", { email });
            dispatch(passwordActions.setSuccessMessage(data.message));
            dispatch(passwordActions.clearErrorMessage());
            dispatch(passwordActions.setIsLoading(false));
        } catch (error) {
            dispatch(passwordActions.setErrorMessage(error.response.data.message));
            dispatch(passwordActions.setIsLoading(false));
        }
    }
};


export const verifyResetPasswordlink = (userId, token) => {
    return async (dispatch) => {
        try {
            await request.get(`/api/password/reset-password/${userId}/${token}`);
            dispatch(passwordActions.setIsResetPasswordLinkVerified(true));
            dispatch(passwordActions.clearErrorMessage());
        } catch (error) {
            dispatch(passwordActions.setIsResetPasswordLinkVerified(false))
            dispatch(passwordActions.setErrorMessage("Invalid or expired reset password link"));
        }
    }
}


export const resetPassword = (userId, token, password) => {
    return async (dispatch) => {
        try {
            const { data } = await request.put(`/api/password/reset-password/${userId}/${token}`, { password });
            dispatch(passwordActions.clearErrorMessage());
            dispatch(passwordActions.setIsPasswordReset(true));
            dispatch(passwordActions.setIsLoading(false));
        } catch (error) {
            dispatch(passwordActions.setErrorMessage(error.response.data.message));
            dispatch(passwordActions.setIsLoading(false));
        }
    }
}


