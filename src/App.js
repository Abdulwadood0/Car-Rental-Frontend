import { useTranslation } from "react-i18next";
import './App.css';
import Header from './components/header/Header';
import { ThemeProvider } from "@mui/material/styles";
import getTheme from './theme';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import LandingPage from "./pages/landingPage/LandingPage";
import Footer from "./components/footer/Footer";
import Cars from "./pages/carsPage/Cars";
import { useDispatch, useSelector } from "react-redux";
import CarReservation from "./pages/carsPage/CarReservation";
import Payment from "./pages/paymentPage/Payment"
import Profile from "./pages/profilePage/Profile";
import { ToastContainer, Flip } from "react-toastify";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import PaymentCallBack from "./pages/paymentPage/PaymentCallBack";
import Reservations from "./pages/reservationsPage/Reservations";
import NotFound from "./pages/notFound/NotFound";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AdminCars from "./pages/admin/cars/AdminCars";
import CreateCar from "./pages/admin/cars/CreateCar";
import EditCar from "./pages/admin/cars/EditCar";
import AdminReservations from "./pages/admin/reservations/AdminReservations";
import CarCompanies from "./pages/admin/carCompanies/CarCompanies";
import Accounts from "./pages/admin/accounts/Accounts";
import { useEffect } from "react";
import { fetchCurrentUser } from "./redux/apiCalls/authApiCall";




function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [])

  const { i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer
        theme="dark"
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        transition={Flip}
      />

      <ThemeProvider theme={getTheme(i18n.language)}>

        <Header />
        <div className="container">

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
            <Route path="/reset-password/:userId/:token" element={user ? <Navigate to="/" /> : <ResetPassword />} />


            <Route path="/cars" element={<Cars />} />
            <Route path="/car-reservation" element={!user ? <Navigate to="/" /> : <CarReservation />} />

            <Route path="/payment/:reservationId" element={!user ? <Navigate to="/" /> : <Payment />} />
            <Route path="/payment/callback" element={<PaymentCallBack />} />


            <Route path="/reservations" element={!user ? <Navigate to="/" /> : <Reservations />} />

            <Route path="/profile" element={!user ? <Navigate to="/" /> : <Profile />} />



            <Route path="/admin/cars" element={!user || !user.isAdmin ? <Navigate to="/" /> : <AdminCars />} />
            <Route path="/admin/car/add" element={!user || !user.isAdmin ? <Navigate to="/" /> : <CreateCar />} />
            <Route path="/admin/cars/edit/:id" element={!user || !user.isAdmin ? <Navigate to="/" /> : <EditCar />} />


            <Route path="/admin/reservations" element={!user || !user.isAdmin ? <Navigate to="/" /> : <AdminReservations />} />

            <Route path="/admin/car-companies" element={!user || !user.isAdmin ? <Navigate to="/" /> : <CarCompanies />} />

            <Route path="/admin/accounts" element={!user || !user.isAdmin ? <Navigate to="/" /> : <Accounts />} />

            {/* Catch all route - must be last */}
            <Route path="*" element={<NotFound />} />

          </Routes>

          <Footer />

        </div>



      </ThemeProvider>


    </BrowserRouter>






  );
}

export default App;
