import { carsActions } from "../slices/carsSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function getCars(search, page = 1, companyId = '', sortBy = '', limit = 6) {
    return async (dispatch, getState) => {
        try {
            dispatch(carsActions.setLoading(true));

            // build config for axios
            const config = {
                params: { search, page, limit, companyId, sortBy }
            };

            // only attach header if we have a real token
            const token = getState().auth.user?.token;
            if (token) {
                config.headers = {
                    Authorization: `Bearer ${token}`
                };
            }

            const { data } = await request.get("/api/cars", config);

            const { data: priceRanges } = await request.get("api/cars/priceranges");

            let noDuplicateCars = data.cars.filter((car, index, self) =>
                index === self.findIndex((c) => c.model === car.model)
            );

            dispatch(carsActions.setCars(noDuplicateCars));
            dispatch(carsActions.setCount(data.count))
            dispatch(carsActions.setCarsPriceRanges(priceRanges));
            dispatch(carsActions.setLoading(false));

        }
        catch (error) {
            dispatch(carsActions.setError(error?.response?.data?.message));
            toast.error(error?.response?.data?.message)
            dispatch(carsActions.setLoading(false));
        }
    }
}

export function getCar(id) {
    return async (dispatch) => {
        try {
            dispatch(carsActions.setLoading(true));
            const { data } = await request.get(`/api/cars/${id}`)

            dispatch(carsActions.setCar(data))
            dispatch(carsActions.setLoading(false));

        } catch (error) {
            dispatch(carsActions.setError(error?.response?.data?.message));
            dispatch(carsActions.setLoading(false));
        }
    }
}


export function getModelYears(model, t) {
    return async (dispatch) => {
        try {
            dispatch(carsActions.setLoading(true));
            const { data } = await request.get("api/cars", {
                params: { model }
            });

            dispatch(carsActions.setModelYears(data))

            dispatch(carsActions.setLoading(false));


        } catch (error) {
            toast.error(t(error?.response?.data?.message))
            dispatch(carsActions.setLoading(false));

        }
    }
}

export function getCarByYearAndModel(year, model, t, carId = "") {
    return async (dispatch) => {

        try {

            dispatch(carsActions.setLoading(true));
            const params = { year, model };
            if (carId) {
                params.carId = carId;
            }

            const { data } = await request.get("api/cars/by-year", { params });

            if (data.message) {
                dispatch(carsActions.setCar(data.car))
                dispatch(carsActions.setMessage(data.message))
                dispatch(carsActions.setLoading(false));
                return
            }

            if (data.endDate) {
                dispatch(carsActions.setCar(data.car))
                dispatch(carsActions.setEndDate(data.endDate))
                dispatch(carsActions.clearMessage())
                dispatch(carsActions.setLoading(false));
                return
            }

            dispatch(carsActions.setCar(data))
            dispatch(carsActions.clearEndDate())
            dispatch(carsActions.clearMessage())
            dispatch(carsActions.setLoading(false));


        } catch (error) {
            toast.error(t(error?.response?.data?.message))
            dispatch(carsActions.setLoading(false));

        }
    }
}

export function createCar(car) {
    return async (dispatch, getState) => {

        try {
            dispatch(carsActions.setLoading(true));


            const { data } = await request.post("api/cars", car)

            dispatch(carsActions.setLoading(false));
            dispatch(carsActions.setIsCarCreated())
            toast.success("Car added successfully!")

        } catch (error) {
            toast.error((error?.response?.data?.message))
            dispatch(carsActions.setLoading(false));

        }
    }
}

export function updateCar(car, id) {
    return async (dispatch, getState) => {
        try {
            dispatch(carsActions.setLoading(true));


            await request.put(`api/cars/${id}`, car)

            dispatch(carsActions.setLoading(false));
            dispatch(carsActions.setIsCarUpdated())
            toast.success("Car Updated successfully!")

        } catch (error) {
            toast.error((error?.response?.data?.message))
            dispatch(carsActions.setLoading(false));

        }
    }
}

export function deleteCar(id) {
    return async (dispatch, getState) => {
        try {
            dispatch(carsActions.setLoading(true));


            await request.delete(`api/cars/${id}`)

            dispatch(carsActions.setLoading(false));
            dispatch(carsActions.setIsCarDeleted())
            toast.success("Car Deleted successfully!")


        } catch (error) {
            toast.error((error?.response?.data?.message))
            dispatch(carsActions.setLoading(false));

        }
    }
}

