const express = require("express");
const cors = require("cors");
const { initializeSocket } = require("./config/websocket");
const routerMessage = require("./routes/messageRoutes");
const routerUser = require("./routes/userRoutes");
const sequelize = require("./models/index");

const port = process.env.PORT || 3030;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/messages", routerMessage);
app.use("/users", routerUser);

sequelize.sync({ force: false }).then(() => {
    console.log("Tabelas criadas");
});

const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

initializeSocket(server);
