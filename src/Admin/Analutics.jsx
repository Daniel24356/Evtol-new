// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";

// type AnalyticsData = {
//   batteryUsage: { date: string; averageBattery: number }[];
//   deliveryStats: { status: string; count: number }[];
//   distanceTraveled: { eVTOL: string; distance: number }[];
// };

// const FleetAnalytic = () => {
//   const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

//   useEffect(() => {
//     axios.get("/api/v1/fleet/analytics").then((response) => {
//       setAnalyticsData(response.data);
//     });
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {/* Battery Usage Trends */}
//       <Card>
//         <CardContent>
//           <h2 className="text-lg font-semibold">Battery Usage Trends ⚡</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={analyticsData?.batteryUsage || []}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="averageBattery" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Successful vs Failed Deliveries */}
//       <Card>
//         <CardContent>
//           <h2 className="text-lg font-semibold">Successful vs. Failed Deliveries 📦</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={analyticsData?.deliveryStats || []} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80}>
//                 {analyticsData?.deliveryStats?.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.status === "Successful" ? "#4CAF50" : "#FF5733"} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Average Distance Traveled */}
//       <Card className="md:col-span-2">
//         <CardContent>
//           <h2 className="text-lg font-semibold">Average Distance Traveled per eVTOL 📏</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={analyticsData?.distanceTraveled || []}>
//               <XAxis dataKey="eVTOL" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="distance" fill="#2196F3" />
//             </BarChart>  
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default FleetAnalytic;
