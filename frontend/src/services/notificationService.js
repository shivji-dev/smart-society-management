import API from "../utils/api";

// Get Notifications

export const getNotifications =
  async () => {

    const { data } =
      await API.get(
        "/notifications/my"
      );

    return data;
  };


// Mark Read

export const markAsRead =
  async (id) => {

    const { data } =
      await API.put(
        `/notifications/read/${id}`
      );

    return data;
  };