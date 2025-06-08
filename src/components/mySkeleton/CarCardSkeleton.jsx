import React from "react";
import { Card, CardContent, Box, Skeleton } from "@mui/material";

const CarCardSkeleton = () => {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            transition: ' 0.3s ease-in-out',
            backgroundColor: 'background.paper',

            boxShadow: "none",
        }}>
            <Skeleton variant="rectangular" height={160} animation="wave" />
            <CardContent>
                <Skeleton variant="text" width="70%" height={30} animation="wave" />
                <Skeleton variant="text" width="50%" height={20} animation="wave" />
                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Skeleton variant="text" width={60} height={20} animation="wave" />
                    <Skeleton variant="rectangular" width={80} height={36} animation="wave" />
                </Box>
            </CardContent>
        </Card>
    );
};

export default CarCardSkeleton;
