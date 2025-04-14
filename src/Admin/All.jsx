import AdminDashboard from "./dashboard"
import Sidebar from "./Sidebar"
import './all.css'
import { Outlet } from "react-router-dom"


const All = () => {
    return(
        <>
        <div className="all-dash">
        <Sidebar/>
        <div>
        <Outlet/>
        </div>
        {/* <AdminDashboard/> */}
        </div>
       
        </>
    )
}

export default All