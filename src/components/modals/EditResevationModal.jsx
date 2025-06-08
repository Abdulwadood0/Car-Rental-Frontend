import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCarByYearAndModel } from '../../redux/apiCalls/carsApiCall';
import { patchReservation } from '../../redux/apiCalls/reservationApiCall';

export default function EditResevationModal({ open, setOpen, car }) {
    const endDate = useSelector((state) => state?.cars?.endDate)
    const pricePerDay = useSelector((state) => state?.cars?.car?.pricePerDay)
    const loading = useSelector((state) => state?.reservation?.loading)
    const isReservationUpdated = useSelector((state) => state?.reservation?.isReservationUpdated)

    const [err, setErr] = useState("")

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        pickupDate: null,
        dropoffDate: null,

    });
    const [totalPrice, setTotalPrice] = useState("");
    const [duration, setDuration] = useState("")

    const handleDateChange = (date, field) => {
        const updatedFormData = {
            ...formData,
            [field]: date
        };

        setFormData(updatedFormData);

        if (updatedFormData.pickupDate && updatedFormData.dropoffDate) {
            const start = new Date(updatedFormData.pickupDate);
            const end = new Date(updatedFormData.dropoffDate);

            const duration = (end - start) / (1000 * 60 * 60 * 24);
            const price = pricePerDay * duration;

            setTotalPrice(price);
            setDuration(duration)
        }
    };
    const { t } = useTranslation("carReservation")


    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.pickupDate || !formData.dropoffDate) {
            return setErr("All fields are required")
        }

        const dates = {
            startDate: formData.pickupDate,
            endDate: formData.dropoffDate,
            totalPrice: totalPrice
        }

        dispatch(patchReservation(car.reservationId, dates, t))


    }
    useEffect(() => {
        setFormData({
            pickupDate: null,
            dropoffDate: null
        })
        setErr("")
    }, [open])

    useEffect(() => {
        if (open) {
            dispatch(getCarByYearAndModel(car.year, car.model, t, car.carId))
        }
    }, [open])

    useEffect(() => {
        if (isReservationUpdated) {
            setOpen(false)

        }
    }, [isReservationUpdated])


    return (
        <>

            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit,
                    },
                }}
            >
                <DialogTitle>{t("Edit Reservation")}</DialogTitle>

                <DialogContent>
                    <Typography color='red'>
                        {t(err)}
                    </Typography>
                    <Grid sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                        {formData.pickupDate && formData.dropoffDate && (
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom color='green'>
                                    {`${t("Total Price:")} ${totalPrice} ${t("SAR")}`}
                                </Typography>
                                <Typography variant="h5" gutterBottom color='green'>
                                    {`${t("Rental Duration:")} ${duration} ${t("days")}`}
                                </Typography>
                            </Grid>
                        )}

                        <Grid item xs={12} sm={6} sx={{ direction: 'ltr', mt: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label={t('Pickup Date')}
                                    value={formData.pickupDate}
                                    onChange={(date) => handleDateChange(date, 'pickupDate')}
                                    minDate={endDate ? new Date(endDate) : new Date()}
                                    maxDate={endDate ? new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 4)) :
                                        new Date(new Date().setDate(new Date().getDate() + 4))
                                    }
                                    slotProps={{
                                        textField: { fullWidth: true, required: true }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ direction: 'ltr' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    label={t('Drop-off Date')}
                                    value={formData.dropoffDate}
                                    onChange={(date) => handleDateChange(date, 'dropoffDate')}
                                    minDate={formData.pickupDate ?
                                        new Date(new Date(formData.pickupDate).setDate(new Date(formData.pickupDate).getDate() + 1)) :
                                        endDate ? new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)) :
                                            new Date()}
                                    maxDate={endDate ?
                                        new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 30)) :
                                        new Date(new Date().setDate(new Date().getDate() + 30))}
                                    slotProps={{
                                        textField: { fullWidth: true, required: true }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button disabled={loading} sx={{ color: "red" }} onClick={handleClose}>
                        {t("Cancel")}</Button>
                    <Button sx={{ color: "green" }} type="submit">{t("Confirm")}</Button>
                </DialogActions>
            </Dialog>


        </>
    );


}
