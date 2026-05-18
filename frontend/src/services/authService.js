import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/auth",
});

export const loginUser = async (userData) => {

  const response = await API.post(
    "/login",
    userData
  );

  localStorage.setItem(
    "token",
    response.data.token
  );

  return response.data;
};

export const registerUser = async (userData) => {

  const response = await API.post(
    "/register",
    userData
  );

  return response.data;
};