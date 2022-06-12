import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddBook from './pages/admin/AddBook'
import Landing from './pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/add' element={<AddBook />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
