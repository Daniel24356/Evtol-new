import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const EmergencyLogs = () => {
    const [logs, setLogs] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:3020/api/v1/fleet/emergency-logs")
        .then((res) => setLogs(res.data))
        .catch((err) => console.error("Error fetching emergency logs:", err));
    }, []);
    
    return (
      <div>
        <h2>Emergency Landings & Failures</h2>
        <table>
          <thead>
            <tr>
              <th>eVTOL</th>
              <th>Reason</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.serialNumber}</td>
                <td>{log.reason}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default EmergencyLogs