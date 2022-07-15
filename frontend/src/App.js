/*

Authors:

- Sai Chand Kolloju

*/

import { Box, Container, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AddBook from './pages/admin/AddBook'
import AdminBookDetail from './pages/admin/AdminBookDetail'
import Navbar from './components/layout/Navbar'
import { ToastContainer } from 'material-react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import './App.css'
import 'material-react-toastify/dist/ReactToastify.css'
import Footer from './components/layout/Footer'
import Dashboard from './pages/dashboard/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreatePrintRequest from './pages/printrequest/CreatePrintRequest'
import DisplayPosterRequests from './pages/printrequest/DisplayPosterRequests'
import AdminPrintApproval from './pages/admin/AdminPrintApproval'

import LatePayment from './components/latePayment'
import BookingDetails from './components/BookingDetails'
import DataTable from './components/StudyRoomsListing'
import Registration from './pages/auth/registration'
import Login from './pages/auth/login'
import ForgotPassowrd from './pages/auth/forgot-password'

import Profile from './pages/user/profile'
import Cart from './pages/Cart'

import UserBookDetail from './pages/bookDetail/UserBookDetail'
import EditBook from './pages/admin/EditBook'
import EditProfile from './pages/user/edit-profile'
import AdminNavbar from './components/admin/AdminNavbar'
import { AuthContext, useAuth } from './context'

import Checkin from './pages/checkin/Checkin'
import { CartProvider } from './pages/context/CartContext'
import Checkout from './pages/Checkout'
import { CheckoutContext } from './pages/context/CheckoutContext'
import { useState } from 'react'
import setAuthToken from './utils/setAuthToken'

function App() {
  const [isLogin, setLogin] = useState(
    localStorage.getItem('USER_ID') ? true : false
  )

  if (localStorage.getItem('LIBRIYA_TOKEN')) {
    setAuthToken(localStorage.getItem('LIBRIYA_TOKEN'))
  }

  const [showCart, setShowCart] = useState(false)
  const theme = createTheme({
    typography: {
      h4: {
        '@media (max-width: 600px)': {
          fontSize: '1.8rem',
        },
      },
    },
    palette: {
      secondary: {
        main: '#2e9c9c',
      },
      primary: {
        main: '#363946',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ isLogin, setLogin }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CartProvider>
            <CheckoutContext.Provider value={setShowCart}>
              <BrowserRouter>
                {/* Temporary for proposal review as we would need authentication state for the real navbar */}
                {/* <Navbar /> */}
                <ToastContainer />
                {/* <Box my={2}> */}
                <Box
                  sx={{
                    width: '100vw',
                    height: '100vh',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Container maxWidth={false}>
                    <Routes>
                      <Route path='/registration' element={<Registration />} />
                      <Route path='/login' element={<Login />} />
                      <Route
                        path='/forgot-password'
                        element={<ForgotPassowrd />}
                      />

                      <Route
                        path='*'
                        element={
                          <RequireAuth>
                            <ProtectedRoutes />
                          </RequireAuth>
                        }
                      />
                    </Routes>
                  </Container>
                  <Footer />
                </Box>
                {/* </Box> */}
              </BrowserRouter>
            </CheckoutContext.Provider>
          </CartProvider>
        </LocalizationProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('LIBRIYA_USER'))

  const adminRoutes = (
    <Routes>
      <Route
        path='/admin/book/add'
        element={
          <>
            <AdminNavbar />
            <Box my={2}>
              <AddBook />
            </Box>
          </>
        }
      />
      <Route
        path='/admin/book/edit/:id'
        element={
          <>
            <AdminNavbar />
            <Box my={2}>
              <EditBook />
            </Box>
          </>
        }
      />
      <Route
        path='/admin/dashboard'
        element={
          <>
            <AdminNavbar />
            <Box my={2}>
              <AdminDashboard />
            </Box>
          </>
        }
      />
      <Route
        path='/admin/printRequest'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <AdminPrintApproval />
            </Box>
          </>
        }
      />
      <Route
        path='/admin/book/:id'
        element={
          <>
            <AdminNavbar />
            <Box my={2}>
              <AdminBookDetail />
            </Box>
          </>
        }
      />
    </Routes>
  )

  const otherRoutes = (
    <Routes>
      <Route
        path='/Cart'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <Cart />
            </Box>
          </>
        }
      />

      <Route
        path='/fines'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <LatePayment />
            </Box>
          </>
        }
      />
      <Route
        path='/bookingdetails'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <BookingDetails />
            </Box>
          </>
        }
      />
      <Route
        path='/studyroombookings'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <DataTable />
            </Box>
          </>
        }
      />

      <Route
        path='/profile'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <Profile />
            </Box>
          </>
        }
      />

      <Route
        path='/printrequest/create'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <CreatePrintRequest />
            </Box>
          </>
        }
      />
      <Route
        path='/printrequest/view'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <DisplayPosterRequests />
            </Box>
          </>
        }
      />
      <Route
        path='/edit-profile'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <EditProfile />
            </Box>
          </>
        }
      />

      <Route path='/' element={<Login />} />
      <Route
        path='/book/:id'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <UserBookDetail />
            </Box>
          </>
        }
      />

      <Route
        path='*'
        element={
          <>
            <Navbar />
            <Box my={2}>
              <Dashboard />
            </Box>
          </>
        }
      />
    </Routes>
  )

  if (user && user.admin) {
    return adminRoutes
  }

  return otherRoutes
}

const RequireAuth = ({ children }) => {
  const { isLogin } = useAuth()

  if (!isLogin) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default App
