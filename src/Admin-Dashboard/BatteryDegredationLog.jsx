import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const BatteryDegradationTracker = () => {
  const [batteryData, setBatteryData] = useState([]);
  const [selectedEvtol, setSelectedEvtol] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3020/api/v1/fleet/battery-degradation")
      .then((res) => setBatteryData(res.data))
      .catch((err) => console.error("Error fetching battery data:", err));
  }, []);

  const filteredData = selectedEvtol
    ? batteryData.filter((entry) => entry.serialNumber === selectedEvtol)
    : batteryData;

  const chartData = {
    labels: filteredData.map((entry) => entry.timestamp),
    datasets: [
      {
        label: "Battery Percentage",
        data: filteredData.map((entry) => entry.batteryLevel),
        fill: false,
        borderColor: "#36a2eb",
        tension: 0.2,
      },
    ],
  };

  return (
    <div>
      <h2>Battery Degradation Tracker</h2>
      <select onChange={(e) => setSelectedEvtol(e.target.value)}>
        <option value="">All eVTOLs</option>
        {Array.from(new Set(batteryData.map((entry) => entry.serialNumber))).map((sn) => (
          <option key={sn} value={sn}>{sn}</option>
        ))}
      </select>
      <Line data={chartData} />
    </div>
  );
};

export default BatteryDegradationTracker