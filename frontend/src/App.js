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
import LatePayment from './components/latePayment'
import BookDetail from './pages/bookDetail/BookDetail'
import EditBook from './pages/admin/EditBook'

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
          <Navbar />
          <ToastContainer />
          <Box my={2}>
            <Container maxWidth={false}>
              <Routes>
                <Route path='/admin/book/add' element={<AddBook />} />
                <Route path='/admin/book/edit/:id' element={<EditBook />} />
                <Route path='/fines' element={<LatePayment />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/' element={<Dashboard />} />
                <Route path='/book/:id' element={<BookDetail />} />
                <Route path='admin/book/:id' element={<AdminBookDetail />} />
              </Routes>
            </Container>
          </Box>
          <Footer />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
