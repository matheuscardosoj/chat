import logger from "./../config/logger.js";
import sendMessage from "./message.js";

export async function connection(socket, io) {
    logger.info("A client connected");

    socket.on("sendMessage", (data) => {
        sendMessage(data, io);
    });

    socket.on("disconnect", (user) => {
        logger.info(`Usuario ${user} disconectou`);
    });
}
