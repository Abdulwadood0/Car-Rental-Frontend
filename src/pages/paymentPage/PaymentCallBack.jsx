import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handlePaymentCallBack } from "../../redux/apiCalls/paymentApiCall";
import { paymentActions } from "../../redux/slices/paymentSlice";
import { useTranslation } from "react-i18next";

const PaymentCallBack = () => {
    const message = useSelector((state) => state?.payment?.message)
    const loading = useSelector((state) => state?.payment?.loading)

    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { t } = useTranslation("payment")

    const paymentId = searchParams.get("id")

    useEffect(() => {
        dispatch(handlePaymentCallBack(paymentId))
    }, [])

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(paymentActions.clearMessage());
                navigate("/reservations");
            }, 2000);

            return () => clearTimeout(timer); // cleanup on unmount or rerender
        }
    }, [message]);


    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                flexDirection: "column",
                gap: 3,
                textAlign: "center",
            }}
        >
            {loading ? (
                <>
                    <CircularProgress size={48} />
                    <Typography variant="h6">
                        {t("Processing payment...")}
                    </Typography>
                </>
            ) : (

                <>
                    <Typography variant="h4" color={message === "Payment has been completed successfully" ? "success.main" : "error.main"}>
                        {t(message)}
                    </Typography>

                    <Typography>
                        {t("Please wait...")}
                    </Typography>
                </>

            )}
        </Box>

    );
}

export default PaymentCallBack;