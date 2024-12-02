const express = require("express");
const db = require("../config/firebase");
const logger = require("../config/logger");
const wss = require("../config/websocket");

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("GET /messages/");

    try {
        const snapshot = await db
            .collection("chat")
            .orderBy("timestamp", "asc")
            .get();
        const messages = snapshot.docs.map((doc) => doc.data());

        logger.info("Mensagens recuperadas com sucesso");
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Falha ao buscar mensagens" });
    }
});

module.exports = router;
