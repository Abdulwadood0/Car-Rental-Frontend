import axios from "axios";

const request = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true, // 👈 SEND COOKIES automatically
    baseURL: "http://localhost:5000",
});

// Store reference to dispatch function
let dispatch = null;

// Function to set dispatch (call this from your app initialization)
export const setAxiosDispatch = (dispatchFunction) => {
    dispatch = dispatchFunction;
};

// Function to get current access token from store
let getAccessToken = () => null;

export const setTokenGetter = (tokenGetter) => {
    getAccessToken = tokenGetter;
};

// Request interceptor: attach access token
request.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle expired access token
request.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post(
                    "http://localhost:5000/api/auth/refresh",
                    {},
                    { withCredentials: true } // Only here for refresh token cookie
                );

                // Update token in store if dispatch is available
                if (dispatch) {
                    const { authActions } = await import("../redux/slices/authSlice");
                    dispatch(authActions.setAccessToken(data));
                }

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${data}`;
                return request(originalRequest);

            } catch (refreshError) {
                // Refresh failed, logout user
                if (dispatch) {
                    const { authActions } = await import("../redux/slices/authSlice");
                    dispatch(authActions.logout());
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default request;