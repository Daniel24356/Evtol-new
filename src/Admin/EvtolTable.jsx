import { useEffect, useState } from "react";
import axios from "axios";

 function EvtolTable() {
  const [evtols, setEvtols] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3020/api/v1/evtol/all").then((res) => setEvtols(res.data));
  }, []);

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="border px-4 py-2">Serial Number</th>
          <th className="border px-4 py-2">Battery Level</th>
          <th className="border px-4 py-2">State</th>
          <th className="border px-4 py-2">Last Location</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {evtols.map((evtol) => (
          <tr key={evtol.serialNumber} className="border">
            <td className="border px-4 py-2">{evtol.serialNumber}</td>
            <td className="border px-4 py-2">{evtol.batteryCapacity}%</td>
            <td className="border px-4 py-2">{evtol.state}</td>
            <td className="border px-4 py-2">{evtol.latitude}, {evtol.longitude}</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">View Details</button>
              {evtol.state !== "EMERGENCY_LANDING" && (
                <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Force Landing</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EvtolTable