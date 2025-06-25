import { toast } from "react-toastify";
import request from "../../utils/request";
import { carCompaniesActions } from "../slices/carCompaniesSlice"

export function getcarCompanies() {
    return async (dispatch) => {

        try {
            dispatch(carCompaniesActions.setLoading())

            const { data } = await request.get("api/companies")

            dispatch(carCompaniesActions.setCarCompanies(data))
            dispatch(carCompaniesActions.clearLoading())

        } catch (error) {
            toast.error(error?.response?.data?.message)
            dispatch(carCompaniesActions.clearLoading())
        }
    }
}


export function deleteCarCompany(id) {
    return async (dispatch, getState) => {

        try {
            dispatch(carCompaniesActions.setLoading())

            const { data } = await request.delete(`/api/companies/${id}`)


            dispatch(carCompaniesActions.clearLoading())
            dispatch(carCompaniesActions.setIsCarCompanyDeleted())
            toast.success(data.message)

        } catch (error) {
            toast.error(error?.response?.data?.message)
            dispatch(carCompaniesActions.clearLoading())
        }
    }
}



export function createCarCompany(company) {
    return async (dispatch, getState) => {


        try {
            dispatch(carCompaniesActions.setLoading())

            const { data } = await request.post(`/api/companies`, company)


            dispatch(carCompaniesActions.clearLoading())
            dispatch(carCompaniesActions.setIsCarCompanyCreated())
            toast.success(data.message)

        } catch (error) {
            toast.error(error?.response?.data?.message)
            dispatch(carCompaniesActions.clearLoading())
        }
    }
}


export function updateCarCompany(id, compamy) {
    return async (dispatch, getState) => {


        try {
            dispatch(carCompaniesActions.setLoading())

            const { data } = await request.patch(`/api/companies/${id}`, compamy)


            dispatch(carCompaniesActions.clearLoading())
            dispatch(carCompaniesActions.setIsCarCompanyUpdated())
            toast.success(data.message)

        } catch (error) {
            toast.error(error?.response?.data?.message)
            dispatch(carCompaniesActions.clearLoading())
        }
    }
}