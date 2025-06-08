import {
    Container,
    Typography,
    Box,

    Pagination,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReservations } from "../../redux/apiCalls/reservationApiCall";
import { useTranslation } from "react-i18next";
import EditResevationModal from "../../components/modals/EditResevationModal";
import MySkeleton from "../../components/mySkeleton/MySkeleton"
import { reservaitionActions } from "../../redux/slices/reservationSlice";
import ReservationStatusSelector from "./ReservationStatusSelector";
import { useNavigate } from "react-router-dom";
import ReservationCard from "../../components/reservationCard/ReservationCard";
import ReservationModal from "../../components/modals/ReservationModal";
const Reservations = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);

    const [action, setAction] = useState("")


    const [selectedReservation, setSelectedReservation] = useState(null);
    const loading = useSelector((state) => state?.reservation?.loading)
    const count = useSelector((state) => state?.reservation?.count)
    const isReservationUpdated = useSelector((state) => state?.reservation?.isReservationUpdated)

    const [selectedReservationStatus, setSelectedReservationStatus] = useState("")



    const reservations = useSelector((state) => state?.reservation?.reservations);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { t } = useTranslation("reservations");

    const handlePayClick = (reservation) => {
        setSelectedReservation(reservation._id)
        dispatch(reservaitionActions.setReservation(reservation))
        navigate(`/payment/${reservation._id}`)
    }



    useEffect(() => {
        dispatch(getReservations("", t));
        dispatch(reservaitionActions.clearIsReservationUpdated())

    }, [dispatch, isReservationUpdated]);

    useEffect(() => {
        if (selectedReservationStatus) {
            dispatch(getReservations(selectedReservationStatus, t));

        }
    }, [selectedReservationStatus])

    const handlePagenation = (page) => {
        dispatch(getReservations("", t, page))
    }

    return (
        <>

            <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", mt: 5, minHeight: "70vh" }}>


                <Typography variant="h4" fontWeight="bold" mb={4} gutterBottom>
                    {t("My Reservations")}
                </Typography>


                <ReservationStatusSelector onChange={(status) => {
                    setSelectedReservationStatus(status)
                }} />

                {loading && <MySkeleton />}

                {reservations.map((reservation) => (
                    <ReservationCard key={reservation._id}
                        reservation={reservation}
                        setSelectedReservation={setSelectedReservation}
                        setOpenEdit={setOpenEdit}
                        handlePayClick={handlePayClick}
                        setOpenCancel={setOpenCancel}
                        setAction={setAction}
                    />
                ))}



                {selectedReservation && openEdit && (
                    <EditResevationModal
                        open={openEdit}
                        setOpen={setOpenEdit}
                        car={{
                            carId: selectedReservation?.carId,
                            year: selectedReservation?.carId?.year,
                            model: selectedReservation?.carId?.model,
                            reservationId: selectedReservation?._id
                        }}
                    />
                )}


                {selectedReservation && openCancel && (
                    <ReservationModal
                        open={openCancel}
                        setOpen={setOpenCancel}
                        reservation={selectedReservation}
                        action={action}
                    />
                )}


                <Box sx={{ display: "flex", justifyContent: "center", mt: "auto", mb: 5 }}>
                    <Pagination count={count} onChange={(e, value) => handlePagenation(value)} />
                </Box>
            </Container>
        </>
    );
}

export default Reservations;
