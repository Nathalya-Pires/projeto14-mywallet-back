import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";



dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

const PORT = 5000;

server.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));