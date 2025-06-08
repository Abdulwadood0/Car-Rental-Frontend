import { Box, Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcarCompanies } from '../../../redux/apiCalls/carCompaniesApiCall';
import AddIcon from '@mui/icons-material/Add';

import CarCompany from './CarCompany';
import DeleteCarCompanyModal from '../../../components/modals/carCompaniesModals/DeleteCarCompanyModal';
import AddCarCompany from '../../../components/modals/carCompaniesModals/AddCarCompany';
import EditCarCompanyModal from '../../../components/modals/carCompaniesModals/EditCarCompanyModal';

const CarCompanies = () => {
    const dispatch = useDispatch()
    const carCompanies = useSelector((state) => state?.carCompanies?.carCompanies)

    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [selectedCarCompany, setSelectedCarCompany] = useState("")

    const { isCarCompanyCreated, isCarCompanyDeleted, isCarCompanyUpdated } = useSelector((state) => state?.carCompanies)
    useEffect(() => {
        dispatch(getcarCompanies())

    }, [isCarCompanyCreated, isCarCompanyDeleted, isCarCompanyUpdated])

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "right"
            }}>
                <Button
                    onClick={() => { setOpenAdd(true) }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: '#113f67',
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 4,
                        py: 1,
                        mb: 4,
                        textTransform: 'none', // Optional: keeps the text normal case
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    Add
                </Button>
            </Box>


            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    justifyContent: "left",
                    width: "100%",
                }}
            >
                {carCompanies.map((carCompany) => (
                    <CarCompany
                        key={carCompany._id}
                        carCompany={carCompany}
                        setOpenEdit={setOpenEdit}
                        setOpenDelete={setOpenDelete}
                        setSelectedCarCompany={setSelectedCarCompany}

                    />
                ))}
            </Box>

            {openAdd &&
                <AddCarCompany
                    openAdd={openAdd}
                    setOpenAdd={setOpenAdd}
                />
            }

            {openDelete &&
                <DeleteCarCompanyModal
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    selectedCarCompany={selectedCarCompany}
                />
            }

            {openEdit &&
                <EditCarCompanyModal
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    selectedCarCompany={selectedCarCompany}

                />
            }
        </Container>
    );
}

export default CarCompanies;