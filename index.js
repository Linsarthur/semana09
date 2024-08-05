import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { Contato } from "./models/contato.js";
import { contatoValidation } from "./utils/validations.js";
import { contatosRouter } from "./routes/contatos.js";
import { usuariosRouter } from "./routes/usuarios.js";

config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongo DB conectado!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json()); //configuração para fazer a requisição do body usando o json

app.use(contatosRouter)
app.use(usuariosRouter)

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
