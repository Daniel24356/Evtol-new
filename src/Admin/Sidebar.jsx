// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaChartBar, FaPlane, FaBoxes, FaUserShield, FaBars, FaTimes } from "react-icons/fa";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const menuItems = [
//     { name: "Home", path: "", icon: <FaUserShield /> },
//     { name: "UserList", path: "/dashboard/userList", icon: <FaPlane /> },
//     { name: "UserProfile", path: "/dashboard/userProfile/:id", icon: <FaChartBar /> },
//     { name: "Medicine", path: "/dashboard/medicineList", icon: <FaBoxes /> },
//   ];

//   return (
//     <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </button>
        
//       <ul className="menu">
//         {menuItems.map((item, index) => (
//           <li key={index} className={location.pathname === item.path ? "active" : ""}>
//             <Link to={item.path}>
//               {item.icon}
//               {isOpen && <span>{item.name}</span>}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
