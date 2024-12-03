import express from "express";
import { Op } from "sequelize";
import User from "../models/user.js";
import logger from "../config/logger.js";

const router = express.Router();

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

    res.status(200).json(user);
});

export default router;
