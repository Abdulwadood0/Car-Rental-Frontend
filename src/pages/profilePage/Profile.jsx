import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid
} from '@mui/material';
import {
    Edit as EditIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateAccount } from '../../redux/apiCalls/accountApiCall';
import { accountActions } from '../../redux/slices/accountSlice';

const Profile = () => {
    const { t } = useTranslation('profile');
    const { t: error } = useTranslation('errors');

    const user = useSelector((state) => state?.auth?.user);
    const errorMessage = useSelector((state) => state?.account?.errorMessage);
    const isLoading = useSelector((state) => state?.account?.isLoading);
    const isAccountUpdated = useSelector((state) => state?.account?.isAccountUpdated);

    const dispatch = useDispatch();

    const [openDialog, setOpenDialog] = useState(false);


    const [formData, setFormData] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    const isFormChanged = () => (
        user.firstname !== formData.firstname ||
        user.lastname !== formData.lastname ||
        user.email !== formData.email ||
        user.phone !== formData.phone
    );

    const handleEdit = () => {
        setFormData({
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            email: user?.email || '',
            phone: user?.phone || ''
        });
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        dispatch(accountActions.clearErrorMessage());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (isAccountUpdated) {
            handleClose();
            dispatch(accountActions.clearIsAccountUpdated());
        }
    }, [isAccountUpdated])


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateAccount(formData, t));

    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    bgcolor: "background.paper",
                    color: "#113f67",
                    borderRadius: 2
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            bgcolor: '#113f67',
                            fontSize: '3rem',
                            mb: 2,
                            color: '#ffffff'
                        }}
                    >
                        {user?.firstname?.[0]?.toUpperCase()}
                    </Avatar>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                        {user?.firstname} {user?.lastname}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {user?.email}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {user?.phone || t('No phone number')}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleEdit}
                        sx={{
                            mt: 3,
                            backgroundColor: '#113f67',
                            '&:hover': {
                                backgroundColor: '#0a1f3a'
                            }
                        }}
                    >
                        <EditIcon fontSize='small' sx={{ mr: 1, ml: 1 }} />
                        {t('Edit Profile')}
                    </Button>
                </Box>
            </Paper>

            {/* Edit Profile Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: "background.paper",
                        borderRadius: 2
                    }
                }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#113f67' }}>
                        <EditIcon sx={{ mr: 1, }} />
                        {t('Edit Profile')}
                    </Box>
                </DialogTitle>
                <Typography variant="body1" color="error" sx={{ mb: 2, textAlign: 'center' }}>
                    {error(errorMessage?.replace(/"/g, ''))}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <DialogContent>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={t('First Name')}
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: '#113f67'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#113f67'
                                            },
                                            '& input': {
                                                color: '#113f67'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={t('Last Name')}
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: '#113f67'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#113f67'
                                            },
                                            '& input': {
                                                color: '#113f67'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label={t('Email')}
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: '#113f67'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#113f67'
                                            },
                                            '& input': {
                                                color: '#113f67'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label={t('Phone')}
                                    name="phone"
                                    value={formData.phone}
                                    placeholder='05'
                                    onChange={handleChange}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        minLength: 9,
                                        maxLength: 10,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: '#113f67'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#113f67'
                                            },
                                            '& input': {
                                                color: '#113f67'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            sx={{ color: '#113f67' }}
                        >
                            {t('Cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading || !isFormChanged()}
                            sx={{
                                backgroundColor: '#113f67',
                                '&:hover': {
                                    backgroundColor: '#0a1f3a'
                                }
                            }}
                        >
                            {isLoading ? t('Saving...') : t('Save Changes')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default Profile;
