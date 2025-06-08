import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const { t } = useTranslation("landingPage");

    return (
        <Box

            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '80vh', sm: '90vh', md: '90vh' },
                minHeight: { xs: '500px', sm: '600px', md: '700px' },
                backgroundImage: 'url("/images/hero-bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(4, 17, 41, 0.91) 0%, rgba(84, 61, 126, 0.9) 100%)',
                    zIndex: 1,
                }
            }}
        >
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
                <Box
                    sx={{
                        maxWidth: { xs: '90%', sm: '80%', md: '70%' },
                        mx: 'auto',
                        px: { xs: 2, sm: 3, md: 4 }
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            color: '#ffffff',
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                            fontWeight: 700,
                            mb: { xs: 2, sm: 3, md: 4 },
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 }
                        }}
                    >
                        {t("Find Your Perfect Ride")}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#ffffff',
                            mb: { xs: 3, sm: 4, md: 5 },
                            opacity: 0.9,
                            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                            lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 }
                        }}
                    >
                        {t("Affordable Cars, Anytime, Anywhere. Book your ride in seconds with flexible options.")}
                    </Typography>


                    <Link to="/cars">
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#f97316',
                                color: '#ffffff',
                                padding: { xs: '10px 20px', sm: '12px 30px', md: '14px 40px' },
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                '&:hover': {
                                    backgroundColor: '#ea580c',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(249, 115, 22, 0.3)'
                                },
                                transition: 'all 0.3s ease',
                                borderRadius: '30px',
                                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.2)',
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            {t("Browse Cars")}
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection; 