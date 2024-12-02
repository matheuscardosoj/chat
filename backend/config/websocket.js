const socketIO = require("socket.io");
const logger = require("./logger");
const db = require("./firebase");

let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        logger.info("A client connected");

        socket.on("sendMessage", async (data) => {
            try {
                await db.collection("chat").add({
                    user: data.user,
                    text: data.text,
                    timestamp: new Date(),
                });
                logger.info("Mensagem adicionada com sucesso");

                const messagesSnapshot = await db
                    .collection("chat")
                    .orderBy("timestamp", "asc")
                    .get();
                const updatedMessages = messagesSnapshot.docs.map((doc) =>
                    doc.data()
                );

                io.emit("updatedMessages", updatedMessages);
            } catch (error) {
                logger.error(`Erro processando a mensagem: ${error.message}`);
                socket.emit("error", {
                    error: "Falha ao processar a mensagem",
                });
            }
        });

        socket.on("disconnect", () => {
            logger.info("A client disconnected");
        });
    });
}

module.exports = { initializeSocket };
