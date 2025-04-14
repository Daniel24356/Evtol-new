import { ToastContainer } from 'react-toastify'
import './App.css'
import Home from './Pages/Home'
import Medication from './Pages/Medication'
import { BrowserRouter as Router,Routes,Route, Form } from 'react-router-dom'
import Forms from './Authentication/register'
import Login  from './Authentication/login'
import AdminDashboard from './Admin/dashboard'
import Checkout from './Pages/Checkout'
import All from './Admin/All'
import UserList from './AdminUser/UserList'
import UserProfile from './AdminUser/UserProfile'
import MedicationList from './AdminMedicine/MedicationList'
// import Dashboard from './Admin/dashboard'

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/"  element={ <Home/>}/>
        <Route path="/medicine"  element={<Medication/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/signup"  element={<Forms/>}/>
        <Route path="/checkout"  element={<Checkout/>}/>
        <Route path="/dashboard"  element={<All/>}>
        <Route index   element={<AdminDashboard />} />
        <Route path="userList"  element={<UserList/>}/>
        <Route path="userProfile/:id"  element={<UserProfile/>}/>
        <Route path="medicineList"  element={<MedicationList/>}/>
        </Route>
         
     </Routes>
     </Router>

     {/* <Dashboard/> */}
    </>
  )
}

export default App
