import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { carCompaniesActions } from "../../../redux/slices/carCompaniesSlice";
import { updateCarCompany } from "../../../redux/apiCalls/carCompaniesApiCall";

const EditCarCompanyModal = ({ openEdit, setOpenEdit, selectedCarCompany }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [err, setErr] = useState("");

    const dispatch = useDispatch();
    const loading = useSelector((state) => state?.carCompanies?.loading);
    const isCarCompanyUpdated = useSelector((state) => state?.carCompanies?.isCarCompanyUpdated);

    useEffect(() => {
        if (selectedCarCompany) {
            setName(selectedCarCompany.name);
        }
    }, [selectedCarCompany]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleClose = () => {
        setOpenEdit(false);
        setName("");
        setImage(null);
        setErr("");
    };

    const isChanged = (image || name !== selectedCarCompany.name)

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setErr("Name is required!");
            return;
        }


        const formData = new FormData();
        formData.append("name", trimmedName);
        if (image) {
            formData.append("image", image);
        }

        dispatch(updateCarCompany(selectedCarCompany._id, formData));
    };

    useEffect(() => {
        if (isCarCompanyUpdated) {
            handleClose()
            dispatch(carCompaniesActions.clearIsCarCompanyUpdated())
        }
    }, [isCarCompanyUpdated])

    return (
        <Modal open={openEdit} onClose={handleClose}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                <Typography variant="h5" fontWeight={600} textAlign="center" color="#113f67">
                    Edit Car Company
                </Typography>

                <Typography color="error">{err}</Typography>

                <TextField
                    label="Company Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                />

                <Button
                    variant="contained"
                    component="label"
                    sx={{ backgroundColor: "#113f67", "&:hover": { backgroundColor: "#0d2f4b" } }}
                >
                    Upload New Logo
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Button>

                {image && (
                    <Typography variant="body2" color="text.secondary">
                        Selected: {image.name}
                    </Typography>
                )}

                {!image && selectedCarCompany?.logo?.url && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={selectedCarCompany.logo.url}
                            alt="Current logo"
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                )}

                <Button
                    type="submit"
                    disabled={!isChanged || loading}
                    variant="contained"
                    sx={{ backgroundColor: "#53a8b6", "&:hover": { backgroundColor: "#4599a7" } }}
                >
                    {loading ? <CircularProgress size={25} /> : "Update Company"}
                </Button>
            </Box>
        </Modal>
    );
};

export default EditCarCompanyModal;