import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';


const CarCompany = ({ carCompany, setOpenEdit, setOpenDelete, setSelectedCarCompany }) => {
    return (


        <Box
            sx={{
                p: 3,
                minWidth: 200,
                borderRadius: 2,
                backgroundColor: '#d3d6db',
                textAlign: 'center',

            }}
        >
            <Box sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Box >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#113f67' }}>
                        {carCompany.name}
                    </Typography>

                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, color: '#113f67' }}>
                    <img src={carCompany.logo.url} alt="CarCompany-img"
                        style={{
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                        }} />
                </Typography>
            </Box>
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2
                }}
            >
                <Box
                    onClick={() => {
                        setOpenEdit(true)
                        setSelectedCarCompany(carCompany)
                    }}

                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        cursor: "pointer",
                        transition: "0.3s",
                        backgroundColor: "#e0f7fa",
                        '&:hover': {
                            backgroundColor: '#53a8b6',
                            boxShadow: 4,
                            transform: "scale(1.05)",

                        },
                    }}
                >
                    <EditIcon sx={{ color: '#113f67', fontSize: 22 }} />
                </Box>

                <Box
                    onClick={() => {
                        setOpenDelete(true)
                        setSelectedCarCompany(carCompany)
                    }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        cursor: "pointer",
                        transition: "0.3s",
                        backgroundColor: "#ffebee",
                        '&:hover': {
                            backgroundColor: '#e67a7a',
                            boxShadow: 4,
                            transform: "scale(1.05)",

                        },
                    }}
                >
                    <DeleteIcon sx={{ color: '#c62828', fontSize: 22 }} />
                </Box>
            </Box>



        </Box>



    );
}

export default CarCompany;