import { io } from "socket.io-client";

// Conecta ao servidor WebSocket no backend
const socket = io("http://localhost:3030", {
    transports: ["websocket"],
    cors: {
        origin: "*",
    },
});

socket.on("connect", () => {
    console.log("Connected to WebSocket server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
});

export default socket;
