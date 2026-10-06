import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTasks = () => {
  return axios.get(API_URL, getConfig());
};

export const createTask = (task) => {
  return axios.post(API_URL, task, getConfig());
};

export const updateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task, getConfig());
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`, getConfig());
};
