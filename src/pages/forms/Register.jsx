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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '../../redux/apiCalls/authApiCall';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authActions } from '../../redux/slices/authSlice';
import ModalPopup from '../../components/modals/Modal';
import { useEffect } from 'react';

function RegisterPage() {
    const { t } = useTranslation("registerPage");
    const { t: tError } = useTranslation("errors");

    const dispatch = useDispatch();

    const errorMessage = useSelector((state) => state?.auth?.errorMessage);
    const successMessage = useSelector((state) => state?.auth?.successMessage);
    const isRegisterSuccess = useSelector((state) => state?.auth?.isRegisterSuccess);
    const isLoading = useSelector((state) => state?.auth?.isLoading);
    useEffect(() => {
        dispatch(authActions.setErrorMessage(""));
    }, []);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        if (username === "" || email === "" || password === "" || firstname === "" || lastname === "" || phone === "") {
            dispatch(authActions.setErrorMessage("All fields are required"));
            return;
        }

        const lowerUsername = username.trim().toLowerCase();
        const lowerEmail = email.trim().toLowerCase();
        const lowerFirstname = firstname.trim().toLowerCase();
        const lowerLastname = lastname.trim().toLowerCase();
        const trimmedPhone = phone.trim();
        const trimmedPassword = password.trim();

        dispatch(authActions.setIsLoading(true));

        dispatch(register({ username: lowerUsername, email: lowerEmail, password: trimmedPassword, firstname: lowerFirstname, lastname: lowerLastname, phone: trimmedPhone }))
    }

    return (
        <Container maxWidth="sm" sx={{ mb: 18 }}>
            {isRegisterSuccess && (
                <ModalPopup message={t(successMessage)} />
            )}

            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
                <Box display="flex" flexDirection="column" alignItems="center" >
                    <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t("Sign Up")}
                    </Typography>

                    <Typography component="h1" variant="h5" sx={{ color: "error.main", textAlign: "center" }}>
                        {tError(errorMessage?.replace(/"/g, ''))}
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleRegister}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                name="firstname"
                                required
                                fullWidth
                                label={t("First Name")}
                                margin="normal"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <TextField
                                name="lastname"
                                required
                                fullWidth
                                label={t("Last Name")}
                                margin="normal"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </Box>
                        <TextField
                            name="username"
                            required
                            fullWidth
                            label={t("Username")}
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                        <TextField
                            name="phone"
                            type="tel"
                            required
                            fullWidth
                            label={t("Phone Number")}
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            inputProps={{
                                pattern: "[0-9]*",
                                minLength: 9,
                                maxLength: 10
                            }}
                        />
                        <TextField
                            name="password"
                            type="password"
                            required
                            fullWidth
                            label={t("Password")}
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 3, mb: 2, width: "50%", marginLeft: "25%", marginRight: "25%",
                                '&.Mui-disabled': {
                                    bgcolor: '#2C3E50',
                                    color: '#fff',
                                }
                            }}
                            disabled={isLoading}
                        >
                            {!isLoading ? t("Register") : <CircularProgress
                                size={20}
                                sx={{
                                    color: '#fff',
                                    mr: 1
                                }}
                            />}
                        </Button>

                        <Box textAlign="center" sx={{ fontFamily: localStorage.getItem("i18nextLng") === "ar" ? "Cairo" : "Lexend" }}>
                            <Link to={"/login"} style={{
                                textDecoration: "none",
                                color: "inherit",
                                cursor: "pointer",
                            }}>
                                {t("Already have an account? Sign in")}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default RegisterPage;
