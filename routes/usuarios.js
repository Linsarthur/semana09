import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { usuarioValidation } from "../utils/validations.js";

export const usuariosRouter = Router();

usuariosRouter.post("/usuarios", async (req, res) => {
  const { error } = usuarioValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({ message: "ERROR", error: error.details[0].message });
    return;
  }

  const { nome, email, senha} = req.body;
  try {
    const novoUsuario = new Usuario({
      nome,
      email,
      senha
    });
    await novoUsuario.save();
    res.json({ message: "Usuário criado com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Um erro ocorreu ao adicionar Usuário!", error: err });
  }
});

usuariosRouter.get("/usuarios", async(req, res) => {
    const listaUsuarios = await Usuario.find();
    res.json(listaUsuarios);
});