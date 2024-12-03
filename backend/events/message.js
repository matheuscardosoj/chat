import logger from "../config/logger.js";
import db from "./../config/firebase.js";

export default async function sendMessage(data, io) {
    try {
        if (data.mood) {
            await db.collection("chat").add({
                userId: data.userId,
                userName: data.userName,
                text: data.text,
                mood: data.mood,
                timestamp: new Date(),
            });
        } else {
            await db.collection("chat").add({
                userId: data.userId,
                userName: data.userName,
                text: data.text,
                timestamp: new Date(),
            });
        }

        logger.info("Mensagem adicionada com sucesso");

        const messagesSnapshot = await db
            .collection("chat")
            .orderBy("timestamp", "asc")
            .get();
        const updatedMessages = messagesSnapshot.docs.map((doc) => doc.data());

        io.emit("updatedMessages", updatedMessages);
    } catch (error) {
        logger.error(`Erro processando a mensagem: ${error.message}`);
        socket.emit("error", {
            error: "Falha ao processar a mensagem",
        });
    }
}
