import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword, verifyResetPasswordlink } from '../../redux/apiCalls/passwordApiCall';
import { useTranslation } from 'react-i18next';
import { passwordActions } from '../../redux/slices/passwordSlice';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { t } = useTranslation("fogotPasswordPage");
    const { t: tError } = useTranslation("errors");
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const isResetPasswordLinkVerified = useSelector((state) => state.password.isResetPasswordLinkVerified);
    const errorMessage = useSelector((state) => state.password.errorMessage);
    const isLoading = useSelector((state) => state.password.isLoading);
    const isPasswordReset = useSelector((state) => state.password.isPasswordReset);
    const dispatch = useDispatch();
    const { userId, token } = useParams();

    useEffect(() => {
        dispatch(verifyResetPasswordlink(userId, token));

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError(tError("Passwords do not match"));
            return;
        }

        setError('');
        dispatch(passwordActions.setIsLoading(true));
        dispatch(resetPassword(userId, token, newPassword));


    }

    if (isPasswordReset) {
        navigate("/login");
    }

    return (
        <Container maxWidth="sm" sx={{ mb: 25 }}>
            {!isResetPasswordLinkVerified ? (
                <Typography
                    align="center"
                    sx={{
                        mt: 10,
                        color: '#FE4F2D',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        padding: '12px 20px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(254, 79, 45, 0.1)',
                        border: '1px solid rgba(254, 79, 45, 0.2)',

                    }}
                >
                    {t(errorMessage)}
                </Typography>
            ) : (
                <Paper elevation={3} sx={{ p: 4, mt: 10, borderRadius: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        {t("Reset Password")}
                    </Typography>

                    <Typography variant="h5" align="center" gutterBottom color="error.main">
                        {tError(errorMessage?.replace(/"/g, ''))}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            required
                            label={t("New Password")}
                            type="password"
                            margin="normal"

                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            required
                            label={t("Confirm Password")}
                            type="password"
                            margin="normal"
                            value={confirmPassword}

                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!error}
                            helperText={t(error)}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 3,
                                '&.Mui-disabled': {
                                    bgcolor: '#2C3E50',
                                    color: '#fff',
                                }
                            }}
                            disabled={isLoading}



                        >
                            {!isLoading ? t("Reset Password") : <CircularProgress
                                size={20}
                                sx={{
                                    color: '#fff',
                                    mr: 1
                                }}
                            />}
                        </Button>

                    </Box>
                </Paper>
            )
            }
        </Container >
    )




}

export default ResetPassword;