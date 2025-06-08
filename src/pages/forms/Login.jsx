import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress,
    Paper,
    IconButton,
    InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls/authApiCall';
import { authActions } from '../../redux/slices/authSlice';
import { useEffect } from 'react';
const Login = () => {
    const { t } = useTranslation("loginPage");
    const { t: tError } = useTranslation("errors");
    const isRTL = localStorage.getItem("i18nextLng") === "ar";

    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const errorMessage = useSelector((state) => state?.auth?.errorMessage);
    const isLoading = useSelector((state) => state?.auth?.isLoading);
    useEffect(() => {
        dispatch(authActions.setErrorMessage(""));
    }, []);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        const trimmedUsername = username.trim().toLowerCase();
        const trimmedPassword = password.trim();

        e.preventDefault();

        if (trimmedUsername === "" || trimmedPassword === "") {
            dispatch(authActions.setErrorMessage("All fields are required"));
            return;
        }


        dispatch(authActions.setIsLoading(true));
        dispatch(login({ username: trimmedUsername, password: trimmedPassword }));
    }


    return (
        <Container maxWidth="sm" sx={{ mb: 25 }}>
            <Paper elevation={3} sx={{ p: 4, mt: 15, borderRadius: 2 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" gutterBottom >
                        {t("Sign In")}
                    </Typography>

                    <Typography component="h1" variant="h5" sx={{ color: "error.main", textAlign: "center" }}>
                        {tError(errorMessage?.replace(/"/g, ''))}
                    </Typography>

                    <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={t("Username")}
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                dir: isRTL ? "rtl" : "ltr"
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={t("Password")}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                [isRTL ? 'startAdornment' : 'endAdornment']: (
                                    <InputAdornment position={isRTL ? "start" : "end"}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge={isRTL ? "start" : "end"}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                dir: isRTL ? "rtl" : "ltr"
                            }}
                        />
                        <Box sx={{ fontFamily: localStorage.getItem("i18nextLng") === "ar" ? "Cairo" : "Lexend" }}>
                            <Link to={"/forgot-password"} style={{
                                textDecoration: "none",
                                color: "inherit",
                                cursor: "pointer",

                            }}>
                                {t("Forgot password?")}
                            </Link>
                        </Box>


                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 2, mb: 2,
                                '&.Mui-disabled': {
                                    bgcolor: '#2C3E50',
                                    color: '#fff',
                                }
                            }}
                            disabled={isLoading}



                        >
                            {!isLoading ? t("Sign In") : <CircularProgress
                                size={20}
                                sx={{
                                    color: '#fff',
                                    mr: 1
                                }}
                            />}
                        </Button>

                        <Box textAlign="center" sx={{ fontFamily: localStorage.getItem("i18nextLng") === "ar" ? "Cairo" : "Lexend" }}>
                            <Link to={"/signup"} style={{
                                textDecoration: "none",
                                color: "inherit",
                                cursor: "pointer",

                            }}>
                                {t("Don't have an account? Sign up")}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container >
    );

}

export default Login;