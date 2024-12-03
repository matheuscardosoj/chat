import { io } from "socket.io-client";

const socket = io("http://localhost:3030", {
    transports: ["websocket"],
    cors: {
        origin: "*",
    },
});

socket.on("connect", () => {});

socket.on("disconnect", () => {});

export default socket;
