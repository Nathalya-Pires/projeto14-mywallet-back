
export async function Entrada(req,res){
    const {value,description} = req.body;

try {
    await db.collection("entry").insertOne({value, description, type:"Entrada"})
    return res.status(201).send("Entrada lançada");
} catch (error) {
    res.status(500).send(error.message);
}
}


export async function Saida(req,res){
    const {value,description} = req.body;

    try {
        await db.collection("exit").insertOne({value, description, type:"Saída"})
        return res.status(201).send("Saída lançada");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

