// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaPlane, FaBatteryHalf, FaShippingFast, FaCheckCircle } from "react-icons/fa";
// import "./OverViewCard.css";

// const OverviewCards = () => {
//   const [stats, setStats] = useState({
//     totalEvtols: 0,
//     activeEvtols: 0,
//     avgBattery: 0,
//     totalDeliveries: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:3020/api/v1/fleet/analytics");
//         setStats(response.data);
//       } catch (error) {
//         console.error("Error fetching fleet analytics:", error);
//       }
//     };
//     fetchStats();
//   }, []);

//   const cardData = [
//     { title: "Total eVTOLs", value: stats.totalEvtols, icon: <FaPlane />, className: "blue" },
//     { title: "Active eVTOLs", value: stats.activeEvtols, icon: <FaCheckCircle />, className: "green" },
//     { title: "Battery Efficiency", value: `${stats.avgBattery}%`, icon: <FaBatteryHalf />, className: "yellow" },
//     { title: "Successful Deliveries", value: stats.totalDeliveries, icon: <FaShippingFast />, className: "purple" },
//   ];

//   return (
//     <div className="overview-cards">
//       {cardData.map((card, index) => (
//         <div className={`card ${card.className}`} key={index}>
//           <div className="icon">{card.icon}</div>
//           <h3>{card.title}</h3>
//           <p>{card.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OverviewCards;
