import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import AppLayout from './components/Layout/Layout';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { BookingPage } from './pages/Booking/BookingPage';
import { ReservationsPage } from './pages/Reservations/ReservationsPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />

      <Route path="/Login" element={<AppLayout><LoginPage /></AppLayout>} />
      <Route path="/Register" element={<AppLayout><RegisterPage /></AppLayout>} />
      <Route path="/Booking" element={<AppLayout isProtected={true}><BookingPage /></AppLayout>} />
      <Route path="/Reservations" element={<AppLayout isProtected={true}><ReservationsPage /></AppLayout>} />

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
