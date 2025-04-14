import axios from "axios";

const API_URL = "http://localhost:3020/api/v1/users";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔄 Interceptor to always attach the latest token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get the latest token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const getAllUsers = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.patch(`/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
