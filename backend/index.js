import express from "express";
import cors from "cors";
import { initializeSocket } from "./config/websocket.js";
import routerUser from "./routes/userRoutes.js";
import sequelize from "./models/index.js";
import db from "./config/firebase.js";

const port = process.env.PORT || 3030;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", routerUser);
app.get("/messages", async (req, res) => {
    const messagesSnapshot = await db
        .collection("chat")
        .orderBy("timestamp", "asc")
        .get();
    const updatedMessages = messagesSnapshot.docs.map((doc) => doc.data());
    res.send(updatedMessages);
});

sequelize.sync({ force: false }).then(() => {});

const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

initializeSocket(server);
