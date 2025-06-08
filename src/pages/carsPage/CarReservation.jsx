import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCarByYearAndModel, getModelYears } from '../../redux/apiCalls/carsApiCall';
import { useNavigate, Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    CircularProgress,
    Divider,


} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';
import { Edit as EditIcon } from '@mui/icons-material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import MySkeleton from '../../components/mySkeleton/MySkeleton';
import { CreateResevation } from '../../redux/apiCalls/reservationApiCall';
import { reservaitionActions } from '../../redux/slices/reservationSlice';
import ImageCarousel from '../../components/imageCarousel/ImageCarousel';

const CarReservation = () => {
    const { t } = useTranslation('carReservation');
    const { t: tcar } = useTranslation("cars");

    const [searchParams] = useSearchParams();
    const model = searchParams.get("model");

    const navigate = useNavigate();
    const car = useSelector((state) => state?.cars?.car);
    const modelYears = useSelector((state) => state?.cars?.modelYears)
    const endDate = useSelector((state) => state?.cars?.endDate)
    const carLoading = useSelector((state) => state?.cars?.loading);

    const reservationLoading = useSelector((state) => state?.reservation?.loading)
    const isReservationCreated = useSelector((state) => state?.reservation?.isReservationCreated)
    const reservation = useSelector((state) => state?.reservation?.reservation)

    const message = useSelector((state) => state?.cars?.message);
    const user = useSelector((state) => state?.auth?.user);


    const [formData, setFormData] = useState({
        pickupDate: null,
        dropoffDate: null,

    });

    const [modelYear, setModelYear] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [duration, setDuration] = useState("")

    const [error, setError] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
        setFormData({
            pickupDate: null,
            dropoffDate: null,

        });
    }, [car]);

    // Step 1: Fetch model years on mount
    useEffect(() => {
        if (isReservationCreated) {
            dispatch(reservaitionActions.clearIsReservationCreated())
        }
        dispatch(getModelYears(model, t));
    }, [model]);

    // Step 2: When modelYears is loaded, set default modelYear and fetch car
    useEffect(() => {
        if (modelYears.length > 0 && !modelYear) {
            const defaultYear = modelYears[0];
            setModelYear(defaultYear);
            dispatch(getCarByYearAndModel(defaultYear, model, t));
        }
    }, [modelYears, modelYear]);





    const handleSelectChange = (event) => {
        const selectedYear = event.target.value;
        setModelYear(selectedYear);
        dispatch(getCarByYearAndModel(selectedYear, model, t))
    };





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
            const price = car?.pricePerDay * duration;

            setTotalPrice(price);
            setDuration(duration)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.pickupDate || !formData.dropoffDate) {
            return setError("Please enter pick-up and drop-off dates")
        }
        const reservationData = {
            carId: car._id,
            startDate: formData.pickupDate,
            endDate: formData.dropoffDate,
            totalPrice: totalPrice,
        }

        dispatch(CreateResevation(reservationData))

    };

    if (carLoading) {
        return (
            <MySkeleton />
        );
    }

    if (isReservationCreated) {
        navigate(`/payment/${reservation?._id}`)
    }

    return (

        <Container maxWidth="lg" sx={{ py: 8 }}>

            <Grid spacing={2}>
                {/* Car Summary */}
                <Grid item xs={12} md={4} mb={5} sx={{ width: { md: "70%" } }} >
                    <Paper sx={{ p: 3, height: "fit-content", bgcolor: "background.paper", color: "#113f67" }}>
                        <Typography variant="h5" gutterBottom >
                            {t('Car Details')}
                        </Typography>

                        <ImageCarousel car={car} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    fontWeight: 600,
                                    color: '#1f2937'
                                }}
                            >
                                {car?.model?.toUpperCase()}
                            </Typography>
                            <Chip
                                label={car?.carCompanyId?.name}
                                color="primary"
                                sx={{
                                    backgroundColor: '#132743',
                                    color: 'white',
                                    fontWeight: 500
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocalGasStationIcon sx={{ color: '#6b7280' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {tcar(car?.fuelType)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <SpeedIcon sx={{ color: '#6b7280' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {tcar(car?.transmission)}
                                </Typography>
                            </Box>
                        </Box>

                        <FormControl sx={{ minWidth: "150px" }}>
                            <InputLabel >{t("Year")}</InputLabel>
                            <Select
                                label="Year"
                                value={modelYear}
                                onChange={handleSelectChange}
                            >
                                {modelYears.map((year, index) => {
                                    return <MenuItem key={index} value={year}>{year}</MenuItem>

                                })}

                            </Select>
                        </FormControl>

                        {message ? <Typography variant='h5' mt={2} color='error'>
                            {t("The car will be available after ") + message}
                        </Typography> : <></>}



                        <Typography variant="h5" color="#42b883" sx={{ mt: 2 }}>
                            {car?.pricePerDay} {t('SAR')} {t('/day')}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Reservation Form */}

                <Grid item xs={12} md={8} display={message ? "none" : ""}>
                    <Paper sx={{ p: 3, bgcolor: "background.paper", color: "#113f67" }}>
                        <Typography variant="h5" gutterBottom>
                            {t('Reservation Details')}
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Personal Information */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6">
                                            {t('Personal Information')}
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to="/profile"
                                            sx={{
                                                color: '#113f67',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(17, 63, 103, 0.1)'
                                                }
                                            }}
                                        >
                                            {t('Edit Profile')}
                                            <EditIcon fontSize='small' sx={{ ml: 1, mr: 1 }} />
                                        </Button>
                                    </Box>
                                    <Paper sx={{ p: 2, bgcolor: '#f4eeff', mb: 2, boxShadow: 'none' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    {t('First Name')}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {user?.firstname}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    {t('Last Name')}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {user?.lastname}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    {t('Email')}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {user?.email}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    {t('Phone')}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {user?.phone || t('No phone number')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>

                                {/* Dates */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom>
                                        {t('Pickup & Drop-off')}
                                    </Typography>
                                </Grid>

                                {error &&
                                    <Grid item xs={12}>
                                        <Typography color='error'>
                                            {t(error)}
                                        </Typography>
                                    </Grid>}


                                {formData.pickupDate && formData.dropoffDate ?
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom color='green' >
                                            {`${t("Total Price:")} ${totalPrice} ${t("SAR")}`}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom color='green'>
                                            {`${t("Rental Duration:")} ${duration} ${t("days")}`}
                                        </Typography>
                                    </Grid> : <></>}


                                <Grid item xs={12} sm={6} sx={{ direction: 'ltr' }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >

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
                                <Grid item xs={12} sm={6} sx={{ direction: 'ltr' }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            sx={{ width: '100%' }}
                                            label={t('Drop-off Date')}
                                            value={formData.dropoffDate}
                                            onChange={(date) => handleDateChange(date, 'dropoffDate')}
                                            minDate={formData.pickupDate ? new Date(new Date(formData.pickupDate).setDate(new Date(formData.pickupDate).getDate() + 1)) :
                                                endDate ? new Date(
                                                    new Date(endDate).setDate(
                                                        new Date(endDate).getDate() + 1
                                                    )
                                                ) : new Date()}
                                            maxDate={endDate
                                                ? new Date(
                                                    new Date(endDate).setDate(
                                                        new Date(endDate).getDate() + 30
                                                    )
                                                )
                                                : new Date(new Date().setDate(new Date().getDate() + 30))}
                                            slotProps={{
                                                textField: { fullWidth: true, required: true }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>


                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={reservationLoading}
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#f97316',

                                        }}
                                    >
                                        {reservationLoading ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            t('Confirm Reservation')
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

        </Container>
    );
};

export default CarReservation;



