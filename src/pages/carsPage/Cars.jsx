import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../redux/apiCalls/carsApiCall";
import { getcarCompanies } from "../../redux/apiCalls/carCompaniesApiCall";
import { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Typography, CircularProgress, Snackbar, Alert, Pagination, MenuItem, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import CarCard from "../../components/carCard/CarCard";
import CarCardSkeleton from "../../components/mySkeleton/CarCardSkeleton";
import SearchBar from "../../components/searchBar/SearchBar";
import { debounce } from 'lodash';

const Cars = () => {
    const dispatch = useDispatch();
    const { cars, count, loading, carsPriceRanges } = useSelector((state) => state?.cars);
    const { carCompanies } = useSelector((state) => state?.carCompanies);
    const { t } = useTranslation("cars");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [sortBy, setSortBy] = useState('');

    const [searchQuery, setSearchQuery] = useState('');

    // Fetch car companies on mount
    useEffect(() => {
        dispatch(getcarCompanies());
        dispatch(getCars('', 1, '', '')); // Fetch cars on first load
    }, [dispatch]);

    const handlePagenation = (page) => {
        dispatch(getCars(searchQuery, page, selectedCompany, sortBy));
    }

    const handleCompanyChange = (event) => {
        const companyId = event.target.value;
        setSelectedCompany(companyId);
        dispatch(getCars(searchQuery, page, companyId, sortBy));
    };

    const handleSortChange = (event) => {
        const sortValue = event.target.value;
        setSortBy(sortValue);
        dispatch(getCars(searchQuery, page, selectedCompany, sortValue));
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            dispatch(getCars(query, page, selectedCompany, sortBy));
        }, 600),
        [selectedCompany, sortBy] // Add selectedCompany and sortBy as dependencies
    );

    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery);
        } else {
            dispatch(getCars('', page, selectedCompany, sortBy));
        }
        // Cleanup on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery, selectedCompany, sortBy]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Box sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap"
            }}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={"Search for a car"} />

                <Box sx={{
                    display: "flex",
                    gap: 1,

                }}>

                    <TextField
                        select
                        label={t("Car Company")}
                        value={selectedCompany}
                        onChange={handleCompanyChange}
                        sx={{
                            minWidth: "105px !important",
                            "@media (min-width: 340px)": {
                                minWidth: "160px !important",
                            },
                        }}
                    >
                        <MenuItem value="">
                            {t("All Companies")}
                        </MenuItem>
                        {carCompanies?.map((company) => (
                            <MenuItem key={company._id} value={company._id}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label={t("Sort By Price")}
                        value={sortBy}
                        onChange={handleSortChange}
                        sx={{
                            minWidth: "140px !important",
                            "@media (min-width: 340px)": {
                                minWidth: "160px !important",
                            },
                        }}
                    >
                        <MenuItem value="">
                            {t("Default")}
                        </MenuItem>
                        <MenuItem value="asc">
                            {t("Low to High")}
                        </MenuItem>
                        <MenuItem value="desc">
                            {t("High to Low")}
                        </MenuItem>
                    </TextField>
                </Box>

            </Box>

            <Grid container spacing={2} mt={5}>
                {loading ? Array.from({ length: 6 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CarCardSkeleton />
                    </Grid>
                ))
                    : cars.map((car) => (
                        <Grid item xs={12} sm={6} md={4} key={car._id}>
                            <CarCard car={car} setOpenSnackbar={setOpenSnackbar} carsPriceRanges={carsPriceRanges} />
                        </Grid>
                    ))}



                {!loading && cars.length === 0 && (
                    <Typography variant="h6" textAlign="center" sx={{ mt: 3, width: "100%" }}>
                        {t("No car found")}
                    </Typography>
                )}
            </Grid>


            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="info"
                    sx={{ width: '100%' }}
                >
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {t('Please log in to rent a car, click here to login')}
                    </Link>
                </Alert>
            </Snackbar>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5, }}>
                <Pagination count={count} onChange={(e, value) => handlePagenation(value)} />
            </Box>
        </Container>
    );
}

export default Cars;