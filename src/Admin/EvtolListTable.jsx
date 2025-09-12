// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./EvtolListTable.css";

// const EvtolListTable = () => {
//   const [evtols, setEvtols] = useState([]);

//   useEffect(() => {
//     const fetchEvtols = async () => {
//       try {
//         const response = await axios.get("http://localhost:3020/api/v1/evtol");
//         setEvtols(response.data);
//       } catch (error) {
//         console.error("Error fetching eVTOLs", error);
//       }
//     };

//     fetchEvtols();
//   }, []);

//   const getStatusBadge = (state) => {
//     switch (state) {
//       case "IDLE":
//         return <span className="badge idle">🟢 Idle</span>;
//       case "LOADING":
//         return <span className="badge loading">🟡 Loading</span>;
//       case "LOADED":
//         return <span className="badge loaded">🔵 Loaded</span>;
//       case "DELIVERING":
//         return <span className="badge delivering">🟠 Delivering</span>;
//       case "EMERGENCY_LANDING":
//         return <span className="badge emergency">🔴 Emergency</span>;
//       default:
//         return <span className="badge unknown">⚪ Unknown</span>;
//     }
//   };

//   return (
//     <div className="evtol-table-container">
//       <h2 className="table-title">eVTOL Fleet Overview</h2>
//       <table className="evtol-table">
//         <thead>
//           <tr>
//             <th>Serial Number</th>
//             <th>Battery Level</th>
//             <th>Status</th>
//             <th>Last Location</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {evtols.map((evtol) => (
//             <tr key={evtol.serialNumber}>
//               <td>{evtol.serialNumber}</td>
//               <td>
//                 <span className={`battery ${evtol.batteryCapacity < 25 ? "low" : "high"}`}>
//                   {evtol.batteryCapacity}%
//                 </span>
//               </td>
//               <td>{getStatusBadge(evtol.state)}</td>
//               <td>
//                 {evtol.latitude && evtol.longitude
//                   ? `${evtol.latitude}, ${evtol.longitude}`
//                   : "N/A"}
//               </td>
//               <td>
//                 <button className="btn view-btn">🔍 View</button>
//                 {evtol.state !== "EMERGENCY_LANDING" && (
//                   <button className="btn danger-btn">⚠️ Force Landing</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EvtolListTable;
