import React, { useEffect, useState } from "react";
import axios from "axios";

const ApproveDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3020/api/v1/deliveries/pending")
      .then((res) => {
        setDeliveries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deliveries:", err);
        setLoading(false);
      });
  }, []);

  const handleApproval = (id, status) => {
    axios
      .post("http://localhost:3020/api/v1/deliveries/approve", { id, status })
      .then(() => {
        setDeliveries((prev) => prev.filter((delivery) => delivery.id !== id));
      })
      .catch((err) => console.error("Error updating delivery status:", err));
  };

  if (loading) return <p>Loading pending deliveries...</p>;

  return (
    <div>
      <h2>Pending Deliveries</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>{delivery.id}</td>
              <td>{delivery.destination}</td>
              <td>{delivery.weight} kg</td>
              <td>
                <button onClick={() => handleApproval(delivery.id, "approved")}>
                  Approve
                </button>
                <button onClick={() => handleApproval(delivery.id, "rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveDeliveries;
