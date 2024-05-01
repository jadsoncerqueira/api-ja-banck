import express from "express";
import cors from "cors"
import { findByIndex, getValues, setNewValues, updateValue } from "./service/api.js";

const app = express();

var corsOptions = {
    origin: '*',
    
  }

app.use(cors(corsOptions))

app.use(express.json());

app.get("/", async (_req, res) => {
    const todos = await getValues();
    res.status(200).json(todos)
})

app.get("/:id", async (req, res) => {
    const {id} = req.params;
    const todo = await findByIndex(Number(id));
    res.status(200).json(todo)
})

app.post("/", async (req, res) => {
    const {body} = req;
    await setNewValues(body);
    res.status(201).json("OK")
})

app.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {chave, valor, op} = req.body;
    await updateValue(id, chave, valor, op);
    res.status(201).json("Atualizado!")
})


export default app;