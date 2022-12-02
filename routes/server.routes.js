import { Router } from "express";

const ServerRoutes = new Router();

ServerRoutes.get("/", (req, res) => {
    res.status(200).send(`
        <h1>Upload Server</h1>
    `);
});

ServerRoutes.get("/env", (req, res) => {
    res.status(200).json(process.env);
});

export default ServerRoutes;