import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import db from "../config/database.js";

export async function Register(req, res) {
  const { name, email, password } = req.body;

  const encryptPassword = bcrypt.hashSync(password, 10);

  try {
    await db
      .collection("users")
      .insertOne({ name, email, password: encryptPassword });

    const user = await db.collection("users").findOne({ email });
    console.log(user)
    await db.collection("saldos").insertOne({ user: user._id, saldo: 0 });

    res.status(201).send("Cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Rota /
export async function Login(req, res) {
  const { email, password } = req.body;

  try {
    const userExists = await db.collection("users").findOne({ email });
    console.log(userExists);

    if (!userExists) return res.status(400).send("Usuário ou senha incorretos");

    const correctPassword = bcrypt.compareSync(password, userExists.password);

    if (!correctPassword)
      return res.status(400).send("Usuário ou senha incorretos");

    const token = uuidV4();

    await db
      .collection("sessions")
      .insertOne({ idUsuario: userExists._id, token });

    return res
      .status(200)
      .send({ idUsuario: userExists._id, name: userExists.name, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
