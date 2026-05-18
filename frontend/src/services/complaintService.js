import API from "../utils/api";


// Create Complaint

export const createComplaint =
  async (formData) => {

    const { data } =
      await API.post(
        "/complaints/create",
        formData
      );

    return data;
  };


// Get Complaints

export const getComplaints =
  async () => {

    const { data } =
      await API.get(
        "/complaints/all"
      );

    return data;
  };


// Update Status

export const updateComplaintStatus =
  async (id, status) => {

    const { data } =
      await API.put(
        `/complaints/update/${id}`,
        { status }
      );

    return data;
  };