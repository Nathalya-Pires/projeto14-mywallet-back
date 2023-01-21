import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js"
import releaseRoutes from "./routes/ReleaseRoutes.js"


const server = express();
server.use(cors());
server.use(express.json());

server.use([authRouter, releaseRoutes])

const PORT = 5000;

server.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));
