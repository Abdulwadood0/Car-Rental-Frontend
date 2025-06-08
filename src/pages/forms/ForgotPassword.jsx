import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { sendForgotPasswordEmail } from '../../redux/apiCalls/passwordApiCall';
import { useState } from 'react';
import ModalPopup from '../../components/modals/Modal';
import { passwordActions } from '../../redux/slices/passwordSlice';
import { useEffect } from 'react';

function ForgotPasswordPage() {
    const { t } = useTranslation("fogotPasswordPage");
    const { t: tError } = useTranslation("errors");

    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.password.errorMessage);
    const successMessage = useSelector((state) => state.password.successMessage);
    const isLoading = useSelector((state) => state.password.isLoading);

    const [email, setEmail] = useState("");

    useEffect(() => {
        dispatch(passwordActions.clearErrorMessage());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "") {
            dispatch(passwordActions.setErrorMessage("email is not allowed to be empty"));
            return;
        }
        dispatch(passwordActions.setIsLoading(true));
        dispatch(sendForgotPasswordEmail(email));
    }
    return (
        <Container maxWidth="sm" sx={{ mb: 25 }}>
            {successMessage && (
                <ModalPopup message={successMessage} />
            )}
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
                <Box display="flex" flexDirection="column" alignItems="center" >
                    <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                        <MailOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t("Forgot Password")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2, textAlign: 'center' }}>
                        {t("Enter your email address and we'll send you a link to reset your password.")}
                    </Typography>

                    <Typography variant="h5" color="error.main" sx={{ mt: 1, mb: 2, textAlign: 'center' }}>
                        {tError(errorMessage?.replace(/"/g, ''))}
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <TextField
                            name="email"
                            type="email"
                            required
                            fullWidth
                            label={t("Email Address")}
                            margin="normal"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 2,
                                '&.Mui-disabled': {
                                    bgcolor: '#2C3E50',
                                    color: '#fff',
                                }
                            }}
                            disabled={isLoading}



                        >
                            {!isLoading ? t("Send Reset Link") : <CircularProgress
                                size={20}
                                sx={{
                                    color: '#fff',
                                    mr: 1
                                }}
                            />}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default ForgotPasswordPage;
