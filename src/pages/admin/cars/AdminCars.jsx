// pages/AdminCarsPage.jsx
import { useState, useEffect, useCallback } from 'react';
import { Grid, Container, Box, Button, Pagination } from '@mui/material';
import CarCard from '../../../components/carCard/CarCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../../redux/apiCalls/carsApiCall';

import { debounce } from 'lodash';
import CarCardSkeleton from '../../../components/mySkeleton/CarCardSkeleton';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/searchBar/SearchBar';

const AdminCars = () => {
    const { cars, loading, count } = useSelector((state) => state?.cars);

    const [searchQuery, setSearchQuery] = useState('');

    const [page, setPage] = useState(1);



    const dispatch = useDispatch();
    const navigate = useNavigate()
    // Debounced function 
    const debouncedSearch = useCallback(
        debounce((query) => {
            dispatch(getCars(query, page));
        }, 600),
        [] // ensure it's only created once
    );

    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery);
        } else {
            dispatch(getCars('', page));
        }
        // Cleanup on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery]);


    const handlePagenation = (page) => {
        dispatch(getCars(searchQuery, page));
    }
    return (


        <Container maxWidth="xl" sx={{ mb: 6 }}>
            <Box sx={{
                display: "flex",
                mt: 3,
                mb: 3,
                gap: 2
            }}>

                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={"Search by model or plate."} />
                <Button
                    onClick={() => navigate("/admin/car/add")}
                    variant="contained"
                    sx={{
                        backgroundColor: "#113f67",
                        color: "#fff",
                        textTransform: "none",
                        width: "160px",
                        fontWeight: "bold",
                        px: 3,
                        borderRadius: 1,
                        "&:hover": {
                            backgroundColor: "#1565c0",
                        },
                    }}
                >
                    Add new car
                </Button>
            </Box>

            <Grid container spacing={2}>
                {cars?.map((car) => (
                    <Grid item xs={12} sm={6} md={4} key={car._id}>

                        {!loading &&
                            <CarCard car={car} />

                        }
                        {loading &&
                            <CarCardSkeleton />
                        }
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5, }}>
                <Pagination count={count} onChange={(e, value) => handlePagenation(value)} />
            </Box>
        </Container>
    );
};

export default AdminCars;
