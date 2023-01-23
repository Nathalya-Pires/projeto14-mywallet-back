import { Login, Register } from "../controller/Authentication.js";
import { Router } from "express";
import { confirmSchema } from "../middleware/ConfirmSchema.js";
import { loginSchema, registerSchema } from "../schema/AuthSchema.js";

const authRouter = Router();

authRouter.post("/cadastro", confirmSchema(registerSchema), Register);
authRouter.post("/login", confirmSchema(loginSchema), Login);

export default authRouter;
