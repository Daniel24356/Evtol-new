// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:3020");

// const mapContainerStyle = { width: "100%", height: "400px" };
// const center = { lat: 37.7749, lng: -122.4194 };

// function LiveMap() {
//   const [evtols, setEvtols] = useState([]);
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3020/api/v1/fleet/active")
//       .then((res) => {
//         console.log("API Response:", res.data);
//         setEvtols(Array.isArray(res.data.activeEvtols) ? res.data.activeEvtols : []);
//       })
//       .catch((error) => console.error("Error fetching active eVTOLs:", error));

//     socket.on("updateLocation", (updatedEvtol) => {
//       setEvtols((prev) =>
//         prev.map((evtol) =>
//           evtol.serialNumber === updatedEvtol.serialNumber ? updatedEvtol : evtol
//         )
//       );
//     });

//     return () => socket.off("updateLocation");
//   }, []);

//   useEffect(() => {
//     if (window.google && evtols.length > 0) {
//       const { Map } = google.maps;
//       const { AdvancedMarkerElement } = google.maps.marker;

//       const newMap = new Map(document.getElementById("map"), {
//         center: { lat: parseFloat(evtols[0].latitude), lng: parseFloat(evtols[0].longitude) },
//         zoom: 10,
//       });

//       evtols.forEach((evtol) => {
//         const lat = parseFloat(evtol.latitude);
//         const lng = parseFloat(evtol.longitude);

//         if (!isNaN(lat) && !isNaN(lng)) {
//           new AdvancedMarkerElement({
//             map: newMap,
//             position: { lat, lng },
//             title: `eVTOL: ${evtol.serialNumber} (${evtol.state})`,
//           });
//         }
//       });

//       setMap(newMap);
//     }
//   }, [evtols]);

//   return <div id="map" style={mapContainerStyle}></div>;
// }

// export default LiveMap;
