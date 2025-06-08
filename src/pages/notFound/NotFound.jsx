import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                textAlign: 'center',
                gap: 3
            }}
        >
            <Typography variant="h1" color="primary" fontWeight="bold">
                404
            </Typography>
            <Typography variant="h4" color="text.secondary">
                {t("Page Not Found")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {t("The page you are looking for does not exist or has been moved.")}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
            >
                {t("Go Back Home")}
            </Button>
        </Box>
    );
} 