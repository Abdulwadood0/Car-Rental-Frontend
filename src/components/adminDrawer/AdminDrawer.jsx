import {
    Drawer,
    Box,
    Typography,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaymentIcon from '@mui/icons-material/Payment';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';

export default function AdminDrawer({ open, setOpen }) {


    const toggleDrawer = () => setOpen(!open);

    const navigate = useNavigate()

    return (
        <Drawer anchor="left" open={open} onClose={toggleDrawer}>
            <Box sx={{ minWidth: { xs: 240, md: 300 }, p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#113f67' }}>
                    Admin Dashboard
                </Typography>

                <Divider sx={{ mt: 2, mb: 3 }} />

                <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <ListItemButton onClick={() => {
                        toggleDrawer()
                        navigate("/admin/cars")
                    }}>
                        <ListItemIcon>
                            <DirectionsCarIcon sx={{ color: '#113f67' }} />
                        </ListItemIcon>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Cars
                        </Typography>
                    </ListItemButton>

                    {/* New Car Companies Section */}
                    <ListItemButton onClick={() => {
                        toggleDrawer()
                        navigate("/admin/car-companies")
                    }}>
                        <ListItemIcon>
                            <BusinessIcon sx={{ color: '#113f67' }} />
                        </ListItemIcon>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Car Companies
                        </Typography>
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                        toggleDrawer()
                        navigate("/admin/reservations")
                    }}>
                        <ListItemIcon>
                            <EventNoteIcon sx={{ color: '#113f67' }} />
                        </ListItemIcon>

                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Reservations
                        </Typography>
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                        toggleDrawer()
                        navigate("/admin/accounts")
                    }}>
                        <ListItemIcon>
                            <PeopleAltIcon sx={{ color: '#113f67' }} />
                        </ListItemIcon>

                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Accounts
                        </Typography>
                    </ListItemButton>


                </List>
            </Box>
        </Drawer>
    );

}
