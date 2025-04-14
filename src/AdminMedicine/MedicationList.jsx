import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MedicationList.css";

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", quantity: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.get("http://localhost:3020/api/v1/medication", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching medications:", error);
      setError("Failed to load medications");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("Authorization");
      await axios.post("http://localhost:3020/api/v1/medication", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Medication added successfully");
      setFormData({ name: "", description: "", quantity: "" });
      fetchMedications(); // Refresh the list
    } catch (error) {
      console.error("Error adding medication:", error);
      setError("Failed to add medication");
    }
  };

  return (
    <div className="medication-container">
      <h2>Medications</h2>
       
      {loading ? <p>Loading medications...</p> : null}
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {medications.length > 0 ? (
            medications.map((med) => (
              <tr key={med.id}>
                <td>{med.name}</td>
                <td>{med.description}</td>
                <td>{med.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No medications available</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Add Medication</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Medication Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
        <button className="med-add" type="submit">Add Medication</button>
      </form>
    </div>
  );
};

export default MedicationList;
