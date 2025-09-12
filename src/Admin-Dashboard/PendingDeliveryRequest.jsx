import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingDeliveryRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3020/api/v1/deliveries/pending")
      .then((res) => {
        setRequests(res.data.pendingRequests || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch pending requests.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading pending requests...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="pending-requests">
      <h2>Pending Delivery Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>eVTOL</th>
            <th>Destination</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.evtolSerialNumber}</td>
                <td>{req.destination}</td>
                <td>{req.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No pending requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingDeliveryRequests;
