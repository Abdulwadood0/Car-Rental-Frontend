import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { passwordActions } from '../../redux/slices/passwordSlice';
import { authActions } from '../../redux/slices/authSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1A1A2E',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    backdropFilter: 'blur(8px)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translate(-50%, -51%)',
    }
};

export default function ModalPopup({ message }) {
    const { t } = useTranslation("fogotPasswordPage");

    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        dispatch(passwordActions.clearSuccessMessage());
        dispatch(authActions.clearIsRegisterSuccess());
        navigate("/login");
    }

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                }}
            >
                Open modal
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: '#fff',
                            textAlign: 'center',
                            fontWeight: 500,
                            mb: 1
                        }}
                    >
                        {t(message)}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            bgcolor: '#2C3E50',
                            color: '#fff',
                            px: 4,
                            py: 1,
                            borderRadius: '25px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: '#34495E',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }
                        }}
                    >
                        {t("Login")}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
