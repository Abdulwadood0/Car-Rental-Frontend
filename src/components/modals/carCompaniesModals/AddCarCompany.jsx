import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCarCompany } from "../../../redux/apiCalls/carCompaniesApiCall";
import { carCompaniesActions } from "../../../redux/slices/carCompaniesSlice";

const AddCarCompany = ({ openAdd, setOpenAdd }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [err, setErr] = useState("");

    const dispatch = useDispatch()

    const loading = useSelector((state) => state?.carCompanies?.loading);
    const isCarCompanyCreated = useSelector((state) => state?.carCompanies?.isCarCompanyCreated);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleClose = () => {
        setOpenAdd(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName || !image) {
            setErr("Please fill all fields!")
            return;
        }

        const formData = new FormData();
        formData.append("name", trimmedName);
        formData.append("image", image);



        dispatch(createCarCompany(formData))

    };

    useEffect(() => {
        if (isCarCompanyCreated) {
            handleClose()
            dispatch(carCompaniesActions.clearIsCarCompanyCreated())
        }
    }, [isCarCompanyCreated])

    return (
        <Modal open={openAdd} onClose={handleClose}>
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
                    Add Car Company
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
                    Upload Image
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

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: "#53a8b6", "&:hover": { backgroundColor: "#4599a7" } }}
                >
                    {loading ? <CircularProgress size={25} /> : "Add Company"}
                </Button>
            </Box>
        </Modal>
    );
};

export default AddCarCompany;
