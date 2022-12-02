import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import fileRoutes from "./routes/file.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: "*",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/file", fileRoutes);

app.listen( port, () => { console.log(`App up and running on http://localhost:${port}`) })