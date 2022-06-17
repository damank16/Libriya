import { Box, Container, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddBook from './pages/admin/AddBook'
import AdminBookDetail from './pages/admin/AdminBookDetail'
import Navbar from './components/Navbar'
import { ToastContainer } from 'material-react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import './App.css'
import 'material-react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import Dashboard from './pages/dashboard/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreatePrintRequest from './pages/printrequest/CreatePrintRequest'
import DisplayPosterRequests from './pages/printrequest/DisplayPosterRequests'
import AdminPrintApproval from './pages/admin/AdminPrintApproval'

import LatePayment from './components/latePayment'
import BookingDetails from './components/BookingDetails'
import DataTable from './components/DataTable'
import Registration from './pages/auth/registration'
import Login from './pages/auth/login'
import ForgotPassowrd from './pages/auth/forgot-password'

import Profile from './pages/user/profile'
import Cart from './pages/Cart'

import BookDetail from './pages/bookDetail/BookDetail'
import EditBook from './pages/admin/EditBook'
import EditProfile from './pages/user/edit-profile'
import AdminNavbar from './components/admin/AdminNavbar'

function App() {
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          {/* Temporary for proposal review as we would need authentication state for the real navbar */}
          {/* <Navbar /> */}
          <ToastContainer />
          {/* <Box my={2}> */}
          <Container maxWidth={false}>
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
              <Route path='/registration' element={<Registration />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassowrd />} />
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
                      <BookDetail />
                    </Box>
                  </>
                }
              />
              <Route
                path='admin/book/:id'
                element={
                  <>
                    <AdminNavbar />
                    <Box my={2}>
                      <AdminBookDetail />
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
          </Container>
          {/* </Box> */}
          <Footer />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
