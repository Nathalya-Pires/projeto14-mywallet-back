import db from "../config/database.js";

export async function validationToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(422).send("Informe o token!");

  try {
    const sessionOk = await db.collection("sessions").findOne({ token });

    if (!sessionOk) return res.status(401).send("Não autorizado");

    res.locals.sessao = sessionOk;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
