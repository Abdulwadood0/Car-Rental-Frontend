import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
    const { t } = useTranslation("landingPage");

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#1f2937',
                color: '#ffffff',
                py: { xs: 6, md: 8 },
                mt: 'auto',
                width: '100%'
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    {/* Company Info */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2.5,
                                mt: -1,
                                fontWeight: 700,
                                fontSize: '1.5rem',
                                color: '#f97316'
                            }}
                        >
                            Car Rental
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 3,
                                opacity: 0.8,
                                lineHeight: 1.8
                            }}
                        >
                            {t("Your trusted partner for premium car rentals. We offer a wide range of vehicles to suit your needs, with flexible booking options and excellent customer service.")}
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: '#f97316'
                            }}
                        >
                            {t("Quick Links")}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link
                                href="#"
                                sx={{
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    opacity: 0.8,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        opacity: 1,
                                        color: '#f97316'
                                    }
                                }}
                            >
                                <Typography>{t("Home")}</Typography>
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    opacity: 0.8,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        opacity: 1,
                                        color: '#f97316'
                                    }
                                }}
                            >
                                <Typography>{t("Cars")}</Typography>
                            </Link>


                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: '#f97316'
                            }}
                        >
                            {t("Contact Us")}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ color: '#f97316' }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    +1 234 567 890
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ color: '#f97316' }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    info@carrental.com
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <LocationOnIcon sx={{ color: '#f97316', mt: 0.5 }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    123 Car Street, Auto City, AC 12345
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Social Media */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: '#f97316'
                            }}
                        >
                            {t("Follow Us")}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <IconButton
                                sx={{
                                    color: '#ffffff',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': {
                                        backgroundColor: '#f97316'
                                    }
                                }}
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: '#ffffff',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': {
                                        backgroundColor: '#f97316'
                                    }
                                }}
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: '#ffffff',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': {
                                        backgroundColor: '#f97316'
                                    }
                                }}
                            >
                                <InstagramIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: '#ffffff',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': {
                                        backgroundColor: '#f97316'
                                    }
                                }}
                            >
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />

                {/* Copyright */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            opacity: 0.8,
                            textAlign: { xs: 'center', sm: 'left' }
                        }}
                    >
                        © {new Date().getFullYear()} Car Rental. {t("All rights reserved.")}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Link
                            href="#"
                            sx={{
                                color: '#ffffff',
                                textDecoration: 'none',
                                opacity: 0.8,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                    color: '#f97316'
                                }
                            }}
                        >
                            <Typography>{t("Privacy Policy")}</Typography>
                        </Link>
                        <Link
                            href="#"
                            sx={{
                                color: '#ffffff',
                                textDecoration: 'none',
                                opacity: 0.8,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                    color: '#f97316'
                                }
                            }}
                        >
                            <Typography>{t("Terms of Service")}</Typography>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
