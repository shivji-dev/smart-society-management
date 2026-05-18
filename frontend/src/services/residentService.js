import axios from "axios";

const API =
  "http://localhost:5000/api";


// ============================
// GET RESIDENT PROFILE
// ============================

export const getResidentProfile =
async (token) => {

  const response =
    await axios.get(

      `${API}/resident/profile`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};


// ============================
// GET VISITORS
// ============================

export const getVisitors =
async (token) => {

  const response =
    await axios.get(

      `${API}/visitors/all`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};


// ============================
// GET COMPLAINTS
// ============================

export const getComplaints =
async (token) => {

  const response =
    await axios.get(

      `${API}/complaints`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};


// ============================
// CREATE COMPLAINT
// ============================

export const createComplaint =
async (
  complaintData,
  token
) => {

  const response =
    await axios.post(

      `${API}/complaints`,

      complaintData,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};