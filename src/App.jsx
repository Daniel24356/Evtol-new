import './App.css'
import Home from './Pages/Home'
import Medication from './Pages/Medication'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
     <Router>
      <Routes>

        <Route path="/"  element={ <Home/>}/>
        <Route path="/medicine"   element={<Medication/>}/>
     </Routes>
     </Router>
    </>
  )
}

export default App
