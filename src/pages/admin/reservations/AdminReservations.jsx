import { Box, Container, Pagination } from "@mui/material";
import { useState, useEffect, useCallback, use } from 'react';
import SearchBar from "../../../components/searchBar/SearchBar";

import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from "../../../redux/apiCalls/reservationApiCall";
import { debounce } from 'lodash';
import { useTranslation } from "react-i18next";
import ReservationStatusDropdown from "../../reservationsPage/ReservationStatusSelector";
import ReservationCard from "../../../components/reservationCard/ReservationCard";
import { useNavigate } from "react-router-dom";
import { reservaitionActions } from "../../../redux/slices/reservationSlice";
import EditResevationModal from "../../../components/modals/EditResevationModal";
import ReservationModal from "../../../components/modals/ReservationModal";



const AdminReservations = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);

    const navigate = useNavigate()

    const [selectedReservation, setSelectedReservation] = useState(null);

    const [action, setAction] = useState("")

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [selectedReservationStatus, setSelectedReservationStatus] = useState("")

    const reservations = useSelector((state) => state.reservation.reservations);
    const count = useSelector((state) => state.reservation.count)
    const isReservationUpdated = useSelector((state) => state.reservation.isReservationUpdated)

    const { t } = useTranslation("reservations");
    const dispatch = useDispatch();

    const debouncedSearch = useCallback(
        debounce((query) => {
            dispatch(getReservations(
                selectedReservationStatus,
                t,
                page,
                4,
                query));
        }, 600),
        [] // ensure it's only created once
    );

    useEffect(() => {
        setSelectedReservationStatus("")
        if (searchQuery) {
            debouncedSearch(searchQuery);
        } else {
            dispatch(getReservations(
                selectedReservationStatus,
                t,
                page,
                4,
                ""));
        }
        // Cleanup on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery]);

    useEffect(() => {
        dispatch(getReservations(
            selectedReservationStatus,
            t,
            page,
            4,
            searchQuery));


    }, [selectedReservationStatus])


    const handlePagenation = (page) => {
        dispatch(getReservations(
            selectedReservationStatus,
            t,
            page,
            4,
            searchQuery));
    }

    const handlePayClick = (reservation) => {
        setSelectedReservation(reservation._id)
        dispatch(reservaitionActions.setReservation(reservation))
        navigate(`/payment/${reservation._id}`)
    }

    useEffect(() => {

        dispatch(getReservations(
            selectedReservationStatus,
            t,
            page,
            4,
            searchQuery));


        dispatch(reservaitionActions.clearIsReservationUpdated())

    }, [dispatch, isReservationUpdated]);

    return (
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", mt: 5, minHeight: "70vh" }}>
            <Box sx={{
                display: "flex",
                mt: 3,
                mb: 3,
                gap: 2
            }}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={"Search by email or phone"} />

                <ReservationStatusDropdown onChange={(status) => {
                    setSelectedReservationStatus(status)
                }} />

            </Box>

            {reservations.map((reservation) => (

                <ReservationCard key={reservation._id}
                    reservation={reservation}
                    setSelectedReservation={setSelectedReservation}
                    setOpenEdit={setOpenEdit}
                    handlePayClick={handlePayClick}
                    setOpenCancel={setOpenCancel}
                    setAction={setAction} />
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
    );
}

export default AdminReservations;