import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.get(`http://localhost:3020/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setFormData({ firstName: response.data.firstName, lastName: response.data.lastName, email: response.data.email });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };
   
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("Authorization");
      await axios.patch(
        `http://localhost:3020/api/v1/users/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User updated successfully");
      setEditMode(false);
      fetchUser();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <label>First Name:</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
