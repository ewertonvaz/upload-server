import { Router } from "express";

const ServerRoutes = new Router();

ServerRoutes.get("/env", (req, res) => {
    console.log(req.query);
    res.status(200).json(process.env);
});

export default ServerRoutes;