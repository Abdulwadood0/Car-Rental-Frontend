import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCarCompany } from '../../../redux/apiCalls/carCompaniesApiCall';
import { useEffect } from 'react';
import { carCompaniesActions } from '../../../redux/slices/carCompaniesSlice';

const DeleteCarCompanyModal = ({ openDelete, setOpenDelete, selectedCarCompany }) => {
    const dispatch = useDispatch()

    const loading = useSelector((state) => state?.carCompanies?.loading);

    const isCarCompanyDeleted = useSelector((state) => state?.carCompanies?.isCarCompanyDeleted);



    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleSubmit = () => {
        dispatch(deleteCarCompany(selectedCarCompany._id))
    }

    useEffect(() => {
        if (isCarCompanyDeleted) {
            setOpenDelete(false)
            dispatch(carCompaniesActions.clearIsCarCompanyDeleted())
        }
    }, [isCarCompanyDeleted])

    return (
        <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Delete Car Compamy</DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="textSecondary">
                    Are you sure you want to delete this Car Compamy? This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    No
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : "Yes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteCarCompanyModal;