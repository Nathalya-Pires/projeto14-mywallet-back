import { Entrada, Saida, searchOperations } from "../controller/Releases.js";
import { Router } from "express";
import { validationToken } from "../middleware/AuthMiddleware.js";
import { confirmSchema } from "../middleware/ConfirmSchema.js";
import { entrySchema, exitSchema } from "../schema/ReleaseSchemas.js";

const releaseRoutes = Router();

releaseRoutes.use(validationToken);
releaseRoutes.get("/home", searchOperations )
releaseRoutes.post("/nova-entrada", confirmSchema(entrySchema), Entrada);
releaseRoutes.post("/nova-saida", confirmSchema(exitSchema), Saida);

export default releaseRoutes;
