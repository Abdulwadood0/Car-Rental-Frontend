import { useState, useEffect } from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    MenuItem,
    Paper,
    IconButton,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getcarCompanies } from '../../../redux/apiCalls/carCompaniesApiCall';
import { createCar } from '../../../redux/apiCalls/carsApiCall';
import { carsActions } from '../../../redux/slices/carsSlice';

const CreateCar = () => {
    const carCompanies = useSelector((state) => state?.carCompanies?.carCompanies);
    const loading = useSelector((state) => state?.cars?.loading);
    const isCarCreated = useSelector((state) => state?.cars?.isCarCreated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        carCompanyId: '',
        model: '',
        year: '',
        pricePerDay: '',
        fuelType: '',
        transmission: '',
        plateNumber: '',
        images: [null, null, null],
    });

    const [imagePreviews, setImagePreviews] = useState(['', '', '']);

    // Fetch car companies
    useEffect(() => {
        dispatch(getcarCompanies());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (index, file) => {
        const newImages = [...formData.images];
        newImages[index] = file;
        setFormData(prev => ({
            ...prev,
            images: newImages
        }));

        // Create preview URL
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviews = [...imagePreviews];
                newPreviews[index] = reader.result;
                setImagePreviews(newPreviews);
            };
            reader.readAsDataURL(file);
        } else {
            const newPreviews = [...imagePreviews];
            newPreviews[index] = '';
            setImagePreviews(newPreviews);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check all fields (excluding images) are filled
        const requiredFields = ['carCompanyId', 'model', 'year', 'pricePerDay', 'fuelType', 'transmission', 'plateNumber'];
        for (let field of requiredFields) {
            if (!formData[field]) {
                return alert(`Please fill in the ${field}`);
            }
        }


        // Create FormData for file upload
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                formData.images.forEach((image, index) => {
                    if (image) {
                        formDataToSend.append(`image`, image);
                    }
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        dispatch(createCar(formDataToSend));
    };

    useEffect(() => {
        if (isCarCreated) {
            navigate("/admin/cars")
        }
        dispatch(carsActions.clearIsCarCreated())
    }, [isCarCreated])

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Car
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Car Company"
                                name="carCompanyId"
                                value={formData.carCompanyId}
                                onChange={handleChange}
                                required
                            >
                                {carCompanies?.map((company) => (
                                    <MenuItem key={company._id} value={company._id}>
                                        {company.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Year"
                                name="year"
                                type="number"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                inputProps={{ min: 1900, max: new Date().getFullYear() }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price Per Day"
                                name="pricePerDay"
                                type="number"
                                value={formData.pricePerDay}
                                onChange={handleChange}
                                required
                                inputProps={{ min: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Fuel Type"
                                name="fuelType"
                                value={formData.fuelType}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Gasoline">Gasoline</MenuItem>
                                <MenuItem value="Diesel">Diesel</MenuItem>
                                <MenuItem value="Electric">Electric</MenuItem>
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Transmission"
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Automatic">Automatic</MenuItem>
                                <MenuItem value="Manual">Manual</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Plate Number"
                                name="plateNumber"
                                value={formData.plateNumber}
                                onChange={handleChange}
                                required
                                inputProps={{ maxLength: 10 }}
                            />
                        </Grid>
                        {[0, 1,].map((index) => (
                            <Grid item xs={12} key={index}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{ flex: 1 }}
                                    >
                                        Upload Image {index + 1}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(index, e.target.files[0])}
                                        />
                                    </Button>
                                    {imagePreviews[index] && (
                                        <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                                            <img
                                                src={imagePreviews[index]}
                                                alt={`Preview ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px'
                                                }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => handleImageChange(index, null)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: -8,
                                                    right: -8,
                                                    backgroundColor: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'white',
                                                    }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            disabled={loading}
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#1976d2",
                                "&:hover": {
                                    backgroundColor: "#1565c0",
                                },
                            }}
                        >
                            {!loading && "Add Car"}
                            {loading && <CircularProgress size={20} />}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/admin/cars')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreateCar;