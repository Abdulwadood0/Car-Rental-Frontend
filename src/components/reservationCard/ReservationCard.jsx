import React, { useEffect } from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Payment from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


export default function ReservationCard({ reservation, setSelectedReservation, setOpenEdit, handlePayClick, setOpenCancel, setAction }) {
    const { t } = useTranslation("reservations")
    const user = useSelector((state) => state.auth.user);




    const statusColors = {
        ongoing: "success.main",
        upcoming: "warning.main",
        pending: "info.main",
        completed: "success.dark",
        cancelled: "error.main"
    };

    return (
        <Card
            sx={{
                mb: 3,
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "background.paper",
                maxWidth: "550px"
            }}
        >
            <CardContent>
                <Typography variant="h4">{t("Reservation information")}</Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "120px",
                        direction: "ltr",
                        mt: 2
                    }}
                >
                    <Typography variant="h6" fontWeight="600" fontFamily="Lexend">
                        {reservation?.carId?.model?.toUpperCase()}
                    </Typography>
                    <Typography variant="subtitle1" color="#455d7a" fontFamily="Lexend">
                        {reservation?.carId?.year}
                    </Typography>
                </Box>

                <Divider sx={{ mt: 2, mb: 4 }} />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1,
                        mb: 1,
                    }}
                >
                    <Typography>
                        <strong>{t("Pick-Up: ")}</strong>
                        {new Date(reservation.startDate).toLocaleDateString("en-GB")}
                    </Typography>
                    <Typography>
                        <strong>{t("Drop-Off: ")}</strong>
                        {new Date(reservation.endDate).toLocaleDateString("en-GB")}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        "@media (max-width: 437px)": {
                            flexDirection: "column",
                        },
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        mt: 2,
                    }}
                >
                    <Typography variant="body1">
                        <strong>{t("Total Price: ")}</strong> {reservation.totalPrice} SAR
                    </Typography>

                    <Typography variant="body1">
                        <Box component="span">
                            <strong>{t("Status: ")}</strong>
                        </Box>{" "}
                        <Box
                            component="span"
                            color={statusColors[reservation.status] || "error.main"}

                        >
                            {t(reservation.status.toUpperCase())}
                        </Box>
                    </Typography>
                </Box>

                {/* payment Info */}
                {user.isAdmin &&
                    <Box>
                        <Typography variant="h4" mt={5}>Payment Info</Typography>
                        <Divider sx={{ mt: 2, mb: 4 }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography>
                                <strong>Amount: </strong>
                                {reservation.paymentId?.amount / 100 || "Not paid"} SAR
                            </Typography>
                            <Typography>
                                <strong>Payment Date: </strong>
                                {reservation.paymentId?.paymentDate
                                    ? new Date(reservation.paymentId.paymentDate).toLocaleDateString("en-GB")
                                    : "Not paid"}
                            </Typography>
                            <Typography>
                                <strong>Payment Status: </strong>
                                <Box
                                    component="span"
                                    color={reservation.paymentId?.status === "paid" ? "success.main" : "error.main"}
                                >
                                    {reservation.paymentId?.status?.toUpperCase() || "UNPAID"}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                }

                {reservation.status === "pending" &&
                    <Box sx={{ mt: 3, ml: -2.5, display: "flex", justifyContent: "end", gap: 1 }}>

                        <Box
                            onClick={() => {

                                setSelectedReservation(reservation);
                                setOpenEdit(true);

                            }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                borderRadius: 2,
                                bgcolor: "#DBDBDB",
                                transition: "color 0.3s ease",
                                padding: 1,

                                cursor: "pointer",
                                "&:hover": {
                                    color: "#00bbf0",
                                },
                            }}
                        >
                            <Typography fontWeight={"bold"}>{t("Edit")}</Typography>
                            <EditIcon sx={{ color: "#00bbf0" }} />
                        </Box>

                        <Box
                            onClick={() => {
                                handlePayClick(reservation)

                            }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                borderRadius: 2,
                                bgcolor: "#DBDBDB",
                                transition: "color 0.3s ease",
                                padding: 1,
                                cursor: "pointer",
                                "&:hover": {
                                    color: "#6EC207",
                                },
                            }}
                        >
                            <Typography fontWeight={"bold"}>{t("Pay")}</Typography>
                            <Payment sx={{ color: "#6EC207" }} />
                        </Box>

                        <Box
                            onClick={() => {
                                setSelectedReservation(reservation._id);
                                setAction("cancel")
                                setOpenCancel(true);
                            }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                borderRadius: 2,
                                bgcolor: "#DBDBDB",
                                transition: "color 0.3s ease",
                                padding: 1,
                                cursor: "pointer",
                                "&:hover": {
                                    color: "#FF0B55",
                                },
                            }}
                        >
                            <Typography fontWeight={"bold"}>{t("Cancel")}</Typography>
                            <CancelIcon sx={{ color: "#FF0B55" }} />
                        </Box>
                    </Box>

                }

                {(user?.isAdmin && reservation.status !== "cancelled" && reservation.status !== "completed") &&
                    <Box sx={{ mt: 3, ml: -2.5, display: "flex", justifyContent: "end", gap: 1 }}>

                        {reservation.status === "upcoming" &&
                            <Box
                                onClick={() => {
                                    setSelectedReservation(reservation);
                                    setAction("start")

                                    setOpenCancel(true);
                                }}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    borderRadius: 2,
                                    bgcolor: "#DBDBDB",
                                    transition: "color 0.3s ease",
                                    padding: 1,
                                    cursor: "pointer",
                                    "&:hover": {
                                        color: "info.main",
                                    },
                                }}
                            >
                                <Typography fontWeight={"bold"}>{t("Start Reservation")}</Typography>
                                <PlayArrowIcon sx={{ color: "info.main" }} />
                            </Box>
                        }

                        {reservation.status === "ongoing" &&
                            <Box
                                onClick={() => {
                                    setSelectedReservation(reservation);
                                    setAction("end")

                                    setOpenCancel(true);
                                }}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    borderRadius: 2,
                                    bgcolor: "#DBDBDB",
                                    transition: "color 0.3s ease",
                                    padding: 1,
                                    cursor: "pointer",
                                    "&:hover": {
                                        color: "success.dark",
                                    },
                                }}
                            >
                                <Typography fontWeight={"bold"}>{t("End Reservation")}</Typography>
                                <PauseIcon sx={{ color: "success.dark" }} />
                            </Box>
                        }

                        {user.isAdmin && reservation.status !== "pending" &&
                            <Box
                                onClick={() => {
                                    setSelectedReservation(reservation);
                                    setAction("cancel")

                                    setOpenCancel(true);

                                }}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    borderRadius: 2,
                                    bgcolor: "#DBDBDB",
                                    transition: "color 0.3s ease",
                                    padding: 1,
                                    cursor: "pointer",
                                    "&:hover": {
                                        color: "#FF0B55",
                                    },
                                }}
                            >
                                <Typography fontWeight={"bold"}>{t("Cancel")}</Typography>
                                <CancelIcon sx={{ color: "#FF0B55" }} />
                            </Box>
                        }

                    </Box>
                }

            </CardContent>
        </Card>
    );
}

