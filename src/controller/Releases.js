import dayjs from "dayjs";
import db from "../config/database.js";

export async function searchOperations(req, res) {
  const { idUsuario } = res.locals.sessao;

  try {
    const infos = await db.collection("transactions").find({idUsuario: idUsuario}).toArray();
    const balance = await db.collection("saldos").find({user: idUsuario}).toArray();

    console.log(balance);
    console.log(infos);

    return res.send({infos:infos, balance:balance});
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function searchBalance(req, res) {
  try {
    const balance = await db.collection("saldos").find().toArray();

    console.log(balance);

    return res.send(balance);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function Entrada(req, res) {
  const { value, description } = req.body;
  const dateSave = dayjs().format("DD/MM/YYYY");
  const { idUsuario } = res.locals.sessao;

  try {
    await db.collection("transactions").insertOne({
      value,
      description,
      date: dateSave,
      idUsuario: idUsuario,
      type: "Entry",
    });

    const saldo = await db.collection("saldos").findOne({ user: idUsuario });
    const novoSaldo = saldo.saldo + value;
    await db
      .collection("saldos")
      .updateOne({ user: idUsuario }, { $set: { saldo: novoSaldo } });

    return res.status(201).send("Entrada lançada");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function Saida(req, res) {
  const { value, description } = req.body;
  const dateSave = dayjs().format("DD/MM/YYYY");
  const { idUsuario } = res.locals.sessao;
  const negativeValue = value * -1;
  console.log(negativeValue);
  try {
    await db.collection("transactions").insertOne({
      value: negativeValue,
      description,
      date: dateSave,
      idUsuario: idUsuario,
      type: "Exit",
    });

    const saldo = await db.collection("saldos").findOne({ user: idUsuario });
    const novoSaldo = saldo.saldo - value;
    await db
      .collection("saldos")
      .updateOne({ user: idUsuario }, { $set: { saldo: novoSaldo } });

    return res.status(201).send("Saída lançada");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
