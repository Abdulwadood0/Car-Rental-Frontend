import { Stack, Skeleton } from '@mui/material';

const MySkeleton = () => {
    return (
        <Stack spacing={1} width={"80%"} margin={8} bgcolor="background.paper">
            {/* Loading skeletons while car data is being fetched */}
            <Skeleton variant="rounded" width={"60%"} height={100} />

            <Skeleton variant="text" width={"60%"} sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" width={"60%"} sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" width={"60%"} sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" width={"60%"} sx={{ fontSize: '2rem' }} />

            <Skeleton variant="rectangular" height={100} />
            <Skeleton variant="text" width={"60%"} sx={{ fontSize: '2rem' }} />
            <Skeleton variant="rounded" height={100} />


        </Stack>
    );
}

export default MySkeleton;