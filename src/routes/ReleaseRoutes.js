import { Entrada, Saida } from "../controller/Releases.js";
import { Router } from "express";

const releaseRoutes = Router();

releaseRoutes.post("/nova-entrada", Entrada);
releaseRoutes.post("/nova-saida", Saida);

export default releaseRoutes;
