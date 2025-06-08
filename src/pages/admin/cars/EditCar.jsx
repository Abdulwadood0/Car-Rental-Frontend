import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar, getCar, updateCar } from "../../../redux/apiCalls/carsApiCall";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    IconButton,
    Stack,
    Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { carsActions } from "../../../redux/slices/carsSlice";

const EditCar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const car = useSelector((state) => state?.cars?.car);
    const isCarDeleted = useSelector((state) => state?.cars?.isCarDeleted);
    const isCarUpdated = useSelector((state) => state?.cars?.isCarUpdated);
    const loading = useSelector((state) => state?.cars?.loading);

    const { id } = useParams();
    const [formData, setFormData] = useState({
        model: "",
        year: "",
        pricePerDay: "",
        fuelType: "",
        transmission: "",
        status: "",
        images: [],
        publicIds: [],
        newImages: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        dispatch(getCar(id));
        dispatch(carsActions.clearIsCarDeleted())
    }, [dispatch, id]);

    useEffect(() => {
        if (car) {
            setFormData({
                model: car.model || "",
                year: car.year || "",
                pricePerDay: car.pricePerDay || "",
                fuelType: car?.fuelType || "",
                transmission: car.transmission || "",
                status: car.status || "",
                images: car.images || [],
                publicIds: [],
                newImages: [],
            });
            // Set initial image previews for existing images
            setImagePreviews(car.images?.map(img => img.url) || []);
        }
    }, [car]);



    const isFormChanged = () => {
        if (!car) return false;
        return (
            formData.model !== car.model ||
            formData.year !== car.year ||
            formData.pricePerDay !== car.pricePerDay ||
            formData.fuelType !== car.fuelType ||
            formData.transmission !== car.transmission ||
            formData.status !== car.status ||
            formData.newImages.some(img => img) ||
            formData.publicIds.length > 0
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (index, file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviews = [...imagePreviews];
                newPreviews[index] = reader.result;
                setImagePreviews(newPreviews);

                const newImages = [...formData.newImages];
                newImages[index] = file;
                setFormData(prev => ({
                    ...prev,
                    newImages: newImages
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = (index, id) => {


        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
            publicIds: id ? [...prev.publicIds, id] : prev.publicIds, // ✅ only add valid ID
        }));

        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'newImages') {
                formData.newImages.forEach((image) => {
                    if (image) {
                        formDataToSend.append('image', image); // multiple images under 'images'
                    }
                });
            } else if (Array.isArray(formData[key]) || typeof formData[key] === 'object') {
                formDataToSend.append(key, JSON.stringify(formData[key]));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });


        dispatch(updateCar(formDataToSend, id))

    };

    const handleDeleteCar = () => {
        dispatch(deleteCar(id))
    };

    useEffect(() => {
        if (isCarDeleted) {
            navigate("/cars")
        }
    }, [isCarDeleted])

    useEffect(() => {
        if (isCarUpdated) {
            navigate("/admin/cars")
        }
        dispatch(carsActions.clearIsCarUpdated())
    }, [isCarUpdated])

    return (
        <Container maxWidth="xl" sx={{ p: 3 }} >
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Car
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Year"
                                name="year"
                                type="number"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Price Per Day"
                                name="pricePerDay"
                                type="number"
                                value={formData.pricePerDay}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Fuel Type</InputLabel>
                                <Select
                                    name="fuelType"
                                    value={formData.fuelType}
                                    onChange={handleChange}
                                    label="Fuel Type"
                                >
                                    <MenuItem value="Gasoline">Gasoline</MenuItem>
                                    <MenuItem value="Diesel">Diesel</MenuItem>
                                    <MenuItem value="Electric">Electric</MenuItem>
                                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Transmission</InputLabel>
                                <Select
                                    name="transmission"
                                    value={formData.transmission}
                                    onChange={handleChange}
                                    label="Transmission"
                                >
                                    <MenuItem value="Automatic">Automatic</MenuItem>
                                    <MenuItem value="Manual">Manual</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    label="Status"
                                >
                                    <MenuItem value="Available">Available</MenuItem>
                                    <MenuItem value="Rented">Rented</MenuItem>
                                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Car Images
                            </Typography>
                            <Stack direction="row" spacing={2} flexWrap="wrap">
                                {imagePreviews.map((preview, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            position: "relative",
                                            width: 150,
                                            height: 150,
                                        }}
                                    >
                                        <img
                                            src={preview}
                                            alt={`Car ${index + 1}`}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => handleDeleteImage(index, formData.images[index]?.publicId)}
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                color: "error.main",
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                disabled={imagePreviews.length > 1}
                            >
                                Upload New Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(imagePreviews.length, e.target.files[0])}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    type="submit"
                                    disabled={loading || !isFormChanged()}
                                    variant="contained"
                                    sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
                                    size="large"
                                >
                                    Update Car
                                </Button>
                                <Button
                                    variant="contained"
                                    disabled={loading}
                                    color="error"
                                    size="large"
                                    onClick={handleDeleteCar}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete Car
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EditCar;