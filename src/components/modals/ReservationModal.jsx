import React, { useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { patchReservation } from '../../redux/apiCalls/reservationApiCall';
import { useTranslation } from 'react-i18next';

export default function ReservationModal({ open, setOpen, reservation, action }) {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state?.reservation?.loading);
    const { t } = useTranslation("reservations");
    const isReservationUpdated = useSelector((state) => state?.reservation?.isReservationUpdated)

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {

        if (action === "cancel") {
            dispatch(patchReservation(reservation, { status: "cancelled" }, t));
        } else if (action === "start") {
            dispatch(patchReservation(reservation, { status: "ongoing" }, t));
        } else if (action === "end") {
            dispatch(patchReservation(reservation, { status: "completed" }, t));
        }

    };

    useEffect(() => {

        if (isReservationUpdated) {
            setOpen(false)
        }
    }, [isReservationUpdated])


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{t(`${action.charAt(0).toUpperCase()}${action.slice(1)} Reservation`)}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="textSecondary">
                    {t(`Are you sure you want to ${action} this reservation? This action cannot be undone.`)}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    {t("No")}
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : t("Yes")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
