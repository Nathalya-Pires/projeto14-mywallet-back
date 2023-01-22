import { Entrada, Saida } from "../controller/Releases.js";
import { Router } from "express";
import { validationToken } from "../middleware/AuthMiddleware.js";

const releaseRoutes = Router();

releaseRoutes.use(validationToken);
releaseRoutes.post("/nova-entrada", Entrada);
releaseRoutes.post("/nova-saida", Saida);

export default releaseRoutes;
