import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    Box,
    InputAdornment,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress,

} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTranslation } from 'react-i18next';
import { makePayment, retryPayment } from '../../redux/apiCalls/paymentApiCall';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentActions } from '../../redux/slices/paymentSlice';

const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    const formatted = digitsOnly.match(/.{1,4}/g)?.join(' ') || '';
    return formatted;
};



const Payment = () => {

    const { t } = useTranslation("payment")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { reservationId } = useParams()

    const reservation = useSelector((state => state?.reservation?.reservation))
    const loading = useSelector((state) => state?.payment?.loading)
    const message = useSelector((state) => state?.payment?.message)


    useEffect(() => {
        if (message === "Car is no longer avalible") {
            navigate("/cars")
            dispatch(paymentActions.clearMessage())
        }
    }, [message])


    const [formData, setFormData] = useState({
        type: "creditcard",
        name: "Mohammed Ali",
        number: "4111111111111111",
        cvc: "123",
        month: "12",
        year: "28"
    });


    const handleFormDataChange = (data, field) => {

        setFormData({
            ...formData,
            [field]: data
        })
    }

    const handleNumberFormDataChange = (data) => {
        setFormData({
            ...formData,
            ["number"]: formatCardNumber(data)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataWithoutSpaces = {
            ...formData,
            number: formData.number.replace(/\s/g, '') // remove all spaces
        };

        const data = {
            description: "Payment for car rental",
            source: formDataWithoutSpaces
        }

        if (reservation.paymentId) {
            return dispatch(retryPayment(reservationId, data, t))
        }

        dispatch(makePayment(reservationId, data, t))

    };

    // Generate month options (01-12)
    const months = Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, '0')
    );

    // Generate year options (current year to +10 years)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) =>
        (currentYear + i).toString().slice(2)
    );

    return (
        <Card sx={{ maxWidth: 400, margin: '2rem auto', padding: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {t("Payment")}
                </Typography>

                <Typography variant="h6" gutterBottom>
                    {t("For a successful payment, don't change the card information.")}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label={t("Cardholder Name")}
                        fullWidth
                        margin="normal"
                        value={formData.name}
                        onChange={(e) => handleFormDataChange(e.target.value, "name")}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label={t("Card Number")}
                        fullWidth
                        margin="normal"
                        value={formData.number}
                        onChange={(e) => handleNumberFormDataChange(e.target.value)}
                        required
                        inputProps={{ maxLength: 19 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CreditCardIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, flexGrow: 1, width: { xs: "100%" } }}>
                            <FormControl fullWidth>
                                <InputLabel>{t("Month")}</InputLabel>
                                <Select
                                    value={formData.month}
                                    onChange={(e) => handleFormDataChange(e.target.value, "month")}
                                    label="Month"
                                    required

                                >
                                    {months.map((month) => (
                                        <MenuItem key={month} value={month}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>{t("Year")}</InputLabel>
                                <Select
                                    value={formData.year}
                                    onChange={(e) => handleFormDataChange(e.target.value, "year")}
                                    label="Year"
                                    required
                                >
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            label="CVC"
                            type="password"
                            value={formData.cvc}
                            sx={{ width: "100px" }}
                            onChange={(e) => handleFormDataChange(e.target.value, "cvc")}
                            required

                            inputProps={{ maxLength: 3 }}

                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 3,
                            '&:hover': {
                                bgcolor: "green"
                            }
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} />
                        ) : (
                            t("pay_amount", { price: reservation?.totalPrice })
                        )}
                    </Button>
                </form>

            </CardContent>
        </Card>
    );
};

export default Payment;