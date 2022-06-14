import { Container, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddBook from './pages/admin/AddBook'
import Landing from './pages/Landing'
import Navbar from './components/Navbar'

import './App.css'
import Footer from './components/Footer'

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
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path='/admin/add' element={<AddBook />} />
            <Route path='/' element={<Landing />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
