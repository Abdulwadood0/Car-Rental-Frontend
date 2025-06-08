import { Box, Card, CardContent, Typography, Button, Chip, Avatar } from "@mui/material";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import ImageCarousel from "../imageCarousel/ImageCarousel";
import EditIcon from '@mui/icons-material/Edit';

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const CarCard = ({ car, setOpenSnackbar, carsPriceRanges }) => {

    const { user } = useSelector((state) => state?.auth);
    const navigate = useNavigate();


    const { t } = useTranslation("cars");

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                transition: ' 0.3s ease-in-out',
                backgroundColor: 'background.paper',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                },
                boxShadow: "none",
            }}
        >


            <ImageCarousel car={car} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ direction: "ltr", display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            color: '#1f2937',
                            fontFamily: "Lexend",
                        }}
                    >
                        {car.model.toUpperCase()}
                    </Typography>
                    <Chip

                        avatar={
                            <Avatar
                                alt={car?.carCompanyId?.name}
                                src={car?.carCompanyId?.logo?.url}
                                sx={{ width: 32, height: 32 }}              // adjust size as needed
                            />
                        }
                        label={car.carCompanyId.name}
                        color="primary"
                        sx={{
                            fontFamily: "Lexend",
                            backgroundColor: '#132743',
                            color: 'white',
                            fontWeight: 500
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocalGasStationIcon sx={{ color: '#6b7280' }} />
                        <Typography variant="body2" color="text.secondary">
                            {t(car.fuelType)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SpeedIcon sx={{ color: '#6b7280' }} />
                        <Typography variant="body2" color="text.secondary">
                            {t(car.transmission)}
                        </Typography>
                    </Box>
                </Box>

                {user?.isAdmin &&
                    <Box mb={2}>
                        <Typography >
                            Plate Number: {car?.plateNumber}</Typography>
                    </Box>}



                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    {!user?.isAdmin &&
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#42b883',
                                fontWeight: 600
                            }}
                        >
                            {(() => {
                                const matchModel = carsPriceRanges.find(model => model.model === car.model);
                                if (matchModel?.minPrice === matchModel?.maxPrice) {
                                    return `${matchModel?.minPrice} ${t("SAR")} ${t("/ day")}`;
                                }
                                return matchModel ? `${matchModel?.minPrice} - ${matchModel?.maxPrice} ${t("SAR")} ${t("/ day")}` : `${car?.pricePerDay} ${t("SAR")} ${t("/ day")}`;
                            })()}
                        </Typography>
                    }


                    {!user?.isAdmin &&
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#113f67',
                                '&:hover': {
                                    backgroundColor: '#ea580c'
                                }
                            }}
                            onClick={() => {
                                if (user) {
                                    navigate(`/car-reservation/?model=${car.model}`);
                                } else {
                                    setOpenSnackbar(true);
                                }
                            }}
                        >
                            {t("Rent now")}
                        </Button>
                    }

                    {user?.isAdmin &&

                        <Button
                            variant="contained"

                            sx={{
                                backgroundColor: '#113f67',
                                '&:hover': {
                                    backgroundColor: '#ea580c'
                                },
                            }}
                            onClick={() => {

                                navigate(`/admin/cars/edit/${car?._id}`);

                            }}
                        >
                            {t("Edit")}
                            <EditIcon sx={{ mt: -0.5, fontSize: 17, padding: 1 }} />

                        </Button>

                    }


                </Box>
            </CardContent>
        </Card>
    );
}

export default CarCard;