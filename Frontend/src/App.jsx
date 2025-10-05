import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import EditCreateEmployee from './pages/EditCreateEmployee';
import './App.css'

function App() {


  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList/>} />
        <Route path="/add-employee" element={<EditCreateEmployee />} />
        <Route path="/edit-employee/:id" element={<EditCreateEmployee />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
