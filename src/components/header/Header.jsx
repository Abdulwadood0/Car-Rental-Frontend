import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TranslateIcon from '@mui/icons-material/Translate';
import { logout } from '../../redux/apiCalls/authApiCall';
import { useDispatch } from 'react-redux';
import AdminDrawer from '../adminDrawer/AdminDrawer';


export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const { t, i18n } = useTranslation("common");
    const user = useSelector(state => state?.auth?.user);
    const dispatch = useDispatch();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleChangeLanguage = () => {
        setAnchorEl(null);
        localStorage.setItem("lang", i18n.language === 'ar' ? 'en' : 'ar')
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',

            }}
        >
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: "background.dark" }}>
                <AppBar position="static"
                    sx={{
                        height: '90px', display: 'flex', justifyContent: 'center',
                        bgcolor: "background.dark",
                        maxWidth: 'xl',
                        boxShadow: 'none',

                    }}>
                    <Toolbar sx={{
                        paddingLeft: "0px !important",
                        paddingRight: "0px !important"
                    }}>
                        {/* left side */}


                        {user?.isAdmin &&
                            <>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={() => setOpenDrawer(true)}

                                    sx={{
                                        ml: {
                                            xs: '0px', xl: '20px'

                                        },


                                    }}
                                >
                                    <MenuIcon />

                                </IconButton>

                                <AdminDrawer open={openDrawer} setOpen={setOpenDrawer} />
                            </>
                        }




                        {!(user?.isAdmin) &&
                            <>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleOpenNavMenu}

                                    sx={{
                                        ml: {
                                            xs: '0px', xl: '20px'

                                        },


                                    }}
                                >
                                    <MenuIcon />

                                </IconButton>
                                <Menu
                                    id="nav-menu"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}

                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        '& .MuiPaper-root': {
                                            backgroundColor: '#1a1a1a',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                        }
                                    }}
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography sx={{
                                                color: "#ffffff",
                                                fontWeight: 500,
                                                transition: "color 0.3s ease",
                                                '&:hover': {
                                                    color: "#f97316"
                                                }
                                            }}>
                                                {t("HOME")}
                                            </Typography>
                                        </Link>
                                    </MenuItem>

                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to="/cars" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography sx={{
                                                color: "#ffffff",
                                                fontWeight: 500,
                                                transition: "color 0.3s ease",
                                                '&:hover': {
                                                    color: "#f97316"
                                                }
                                            }}>
                                                {t("CARS")}
                                            </Typography>
                                        </Link>
                                    </MenuItem>

                                    {user &&
                                        <MenuItem onClick={handleCloseNavMenu}>


                                            <Link to="/reservations" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>


                                                <Typography sx={{
                                                    color: "#ffffff",
                                                    fontWeight: 500,
                                                    transition: "color 0.3s ease",
                                                    '&:hover': {
                                                        color: "#f97316"
                                                    }
                                                }}>

                                                    {t("RESERVATIONS")}
                                                </Typography>


                                            </Link>
                                        </MenuItem>
                                    }

                                </Menu>
                            </>

                        }



                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', width: '100%', cursor: "default" }}>
                            <Typography variant="h4" component="div" sx={{
                                width: "fit-content",
                                fontFamily: "Lexend",
                                flexGrow: 1,
                                fontWeight: 'bold',
                                fontSize: { xs: '1.7rem', md: '2.5rem' },
                                ":hover": {
                                    color: "#f97316"
                                },
                                transition: "color 0.3s ease",
                                cursor: "pointer"
                            }}>
                                Car Rental
                            </Typography>
                        </Link>



                        {/* right side */}
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >


                                <AccountCircle sx={{ fontSize: { xs: '2rem', md: '2.6rem' } }} />


                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                sx={{
                                    '& .MuiPaper-root': {
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                        mt: "50px"
                                    }
                                }}
                            >

                                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <MenuItem onClick={handleClose} sx={{
                                        display: user ? "block" : "none",
                                    }}>
                                        <Typography sx={{
                                            color: "#ffffff",
                                            fontWeight: 500,
                                            transition: "color 0.3s ease",
                                            '&:hover': {
                                                color: "#f97316"
                                            }
                                        }}>
                                            {t("Account")}
                                        </Typography>
                                    </MenuItem>
                                </Link>

                                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <MenuItem onClick={handleClose} sx={{
                                        display: !user ? "block" : "none",
                                    }}>
                                        <Typography sx={{
                                            color: "#ffffff",
                                            fontWeight: 500,
                                            transition: "color 0.3s ease",
                                            '&:hover': {
                                                color: "#f97316"
                                            }
                                        }}>
                                            {t("Sign In")}
                                        </Typography>
                                    </MenuItem>
                                </Link>

                                <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <MenuItem onClick={handleClose} sx={{
                                        display: !user ? "block" : "none",
                                    }}>
                                        <Typography sx={{
                                            color: "#ffffff",
                                            fontWeight: 500,
                                            transition: "color 0.3s ease",
                                            '&:hover': {
                                                color: "#f97316"
                                            }
                                        }}>
                                            {t("Sign Up")}
                                        </Typography>
                                    </MenuItem>
                                </Link>

                                <MenuItem onClick={handleLogout} sx={{
                                    display: user ? "block" : "none",
                                }}>
                                    <Typography sx={{
                                        color: "#ffffff",
                                        fontWeight: 500,
                                        transition: "color 0.3s ease",
                                        '&:hover': {
                                            color: "#f97316"
                                        }
                                    }}>
                                        {t("Logout")}
                                    </Typography>
                                </MenuItem>

                                <MenuItem onClick={handleChangeLanguage}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TranslateIcon sx={{ color: "#f97316" }} />
                                        <Typography sx={{
                                            color: "#ffffff",
                                            fontWeight: 500,
                                            fontFamily: i18n.language === 'ar' ? 'Lexend' : 'Cairo',
                                            transition: "color 0.3s ease",
                                            '&:hover': {
                                                color: "#f97316"
                                            }
                                        }}>
                                            {i18n.language === 'ar' ? t('English') : t('العربية')}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </Box >
    );
}
