import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddBook from './pages/admin/AddBook'

function App() {
  return (
    <BrowserRouter>
      <Routes>{/* <Route path='/admin/add' element={<AddBook />} /> */}</Routes>
    </BrowserRouter>
  )
}

export default App
