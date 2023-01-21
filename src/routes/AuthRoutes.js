import { Cadastrar, Entrar } from "../controller/Authentication.js";
import { Router } from "express";
import {confirmSchema} from "../middleware/ConfirmSchema.js"
import { loginSchema, userSchema } from "../schema/AuthSchema.js";

const authRouter = Router();

authRouter.post("/cadastro", confirmSchema(userSchema), Cadastrar);
authRouter.post("/", confirmSchema(loginSchema), Entrar);

export default authRouter;
