import axios from "axios";

const API =
  "http://https://smart-society-backend-yrq0.onrender.com0/api/auth";

export const loginUser =
async (userData) => {

  const response =
    await axios.post(
      `${API}/login`,
      userData
    );

  return response.data;
};

export const registerUser =
async (userData) => {

  const response =
    await axios.post(
      `${API}/register`,
      userData
    );

  return response.data;
};