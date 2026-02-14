import { io } from "socket.io-client";

export const socket = io("http://localhost:5000");

// localStorage.setItem("token", res.data.token);
// localStorage.setItem("user", JSON.stringify(res.data));
