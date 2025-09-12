import { useEffect, useState } from "react";
import axios from "axios";

function ManageEvtols() {
  const [evtols, setEvtols] = useState([]);
  const [editingEvtol, setEditingEvtol] = useState(null);
  const [updatedData, setUpdatedData] = useState({ batteryCapacity: "", state: "" });

  useEffect(() => {
    axios.get("http://localhost:3020/api/v1/fleet")
      .then((res) => setEvtols(res.data.evtols))
      .catch((error) => console.error("Error fetching eVTOLs:", error));
  }, []);

  const handleEdit = (evtol) => {
    setEditingEvtol(evtol);
    setUpdatedData({ batteryCapacity: evtol.batteryCapacity, state: evtol.state });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3020/api/v1/fleet/${editingEvtol.serialNumber}`, updatedData)
      .then(() => {
        setEvtols(evtols.map(evt => evt.serialNumber === editingEvtol.serialNumber ? { ...evt, ...updatedData } : evt));
        setEditingEvtol(null);
      })
      .catch(error => console.error("Error updating eVTOL:", error));
  };

  return (
    <div>
      <h2>Manage eVTOLs</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Battery Capacity</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {evtols.map(evtol => (
            <tr key={evtol.serialNumber}>
              <td>{evtol.serialNumber}</td>
              <td>{evtol.batteryCapacity}%</td>
              <td>{evtol.state}</td>
              <td>
                <button onClick={() => handleEdit(evtol)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {editingEvtol && (
        <div className="modal">
          <h3>Edit eVTOL {editingEvtol.serialNumber}</h3>
          <label>
            Battery Capacity:
            <input type="number" value={updatedData.batteryCapacity} onChange={(e) => setUpdatedData({ ...updatedData, batteryCapacity: e.target.value })} />
          </label>
          <label>
            State:
            <select value={updatedData.state} onChange={(e) => setUpdatedData({ ...updatedData, state: e.target.value })}>
              <option value="IDLE">IDLE</option>
              <option value="LOADING">LOADING</option>
              <option value="LOADED">LOADED</option>
              <option value="DELIVERING">DELIVERING</option>
            </select>
          </label>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingEvtol(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManageEvtols;
