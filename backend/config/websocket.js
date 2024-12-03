import { Server } from "socket.io";
import { connection } from "../events/connection.js";
import logger from "./logger.js";

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        logger.info(`Usuário conectado`);

        try {
            connection(socket, io);
        } catch (error) {
            logger.error(`Erro ao conectar: ${error.message}`);
        }
    });

    io.on("disconnect", () => {
        logger.info(`Usuario desconectado`);
    });
}
