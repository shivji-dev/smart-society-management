import API from "../utils/api";


// Create Request

export const createServiceRequest =
  async (formData) => {

    const { data } =
      await API.post(
        "/services/create",
        formData
      );

    return data;
  };


// Get Requests

export const getServiceRequests =
  async () => {

    const { data } =
      await API.get(
        "/services/all"
      );

    return data;
  };


// Update Status

export const updateServiceStatus =
  async (id, status) => {

    const { data } =
      await API.put(
        `/services/update/${id}`,
        { status }
      );

    return data;
  };