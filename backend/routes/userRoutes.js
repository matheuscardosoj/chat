const express = require("express");
const User = require("../models/user");
const logger = require("../config/logger");
const { Op } = require("sequelize");

const router = express.Router();

const userIDsLogados = [];

router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            logger.error("Dados inválidos");
            return res.status(400).json({ error: "Dados inválidos" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        logger.info(`Usuário criado: ${user.name}`);
        res.status(201).json(user);
    } catch (err) {
        logger.error(`Erro ao criar usuário: ${err.message}`);
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            [Op.and]: [{ email }, { password }],
        },
    });

    if (!user) {
        return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    if (userIDsLogados.find((u) => u.email === email)) {
        return res.status(401).json({ error: "Usuário já está logado" });
    }

    userIDsLogados.push(user.id);

    res.status(200).json(user);
});

router.post("/logout", async (req, res) => {
    const { userId } = req.body;

    const index = userIDsLogados.indexOf(userId);

    if (index === -1) {
        return res.status(404).json({ error: "Usuário não está logado" });
    }

    userIDsLogados.splice(index, 1);

    res.status(200).json({ message: "Usuário deslogado com sucesso" });
});

router.get("/logged", async (req, res) => {
    const { userId } = req.body;

    if (userIDsLogados.includes(userId)) {
        return res.status(200).json({ logged: true });
    }

    return res.status(200).json({ logged: false });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
});

module.exports = router;
