import { io } from "socket.io-client";

const socket = io(
  "https://smart-society-backend-yrq0.onrender.com"
);

export default socket;