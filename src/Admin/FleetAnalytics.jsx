import { useEffect, useState } from "react";
import axios from "axios";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart } from "recharts"
import "./FleetAnalytics.css";
import BarCharts from "../Chart/BarChart";
import PieCharts from "../Chart/PieChart";

const FleetAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalDeliveries: 0,
    failedDeliveries: 0,
    avgDistance: 0,
    batteryTrends: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:3020/api/v1/fleet/analytics");
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics", error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="fleet-analytics-container">
      <h2 className="analytics-title">Fleet Performance Overview</h2>

      <div className="analytics-cards">
        <div className="card">
          <h3>Total Deliveries 📦</h3>
          <p>{analytics.totalDeliveries}</p>
        </div>
        <div className="card">
          <h3>Failed Deliveries ❌</h3>
          <p>{analytics.failedDeliveries}</p>
        </div>
        <div className="card">
          <h3>Avg Distance Traveled 🚀</h3>
          <p>{analytics.avgDistance} km</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Battery Usage Trends ⚡</h3>
        {/* <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.batteryTrends}>
            <XAxis dataKey="serialNumber" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="batteryLevel" fill="#4F46E5" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer> */}

        <div className="chart-div">
          <BarCharts/>
          <PieCharts/>
        </div>
      </div>
    </div>
  );
};

export default FleetAnalytics;
