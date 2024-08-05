import { Router } from "express";
import { Contato } from "../models/contato.js";
import { contatoValidation } from "../utils/validations.js";

export const contatosRouter = Router();

//[get]/ contatos -> listar todos os contatos
contatosRouter.get("/contatos", async (req, res) => {
  const listaContatos = await Contato.find();
  res.json(listaContatos);
});

//Listar um contato específico (detalhes)
contatosRouter.get("/contatos/:id", async (req, res) => {
  const contato = await Contato.findById(req.params.id);
  if (contato) {
    res.json(contato);
  } else {
    res.status(404).json({ message: "Contato não encontrado." });
  }
});

//[post]
contatosRouter.post("/contatos", async (req, res) => {
  const { error, value } = contatoValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res
      .status(400)
      .json({ message: "ERROR", error: error.details[0].message });
    return;
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = req.body;
  try {
    const novoContato = new Contato({
      nome,
      sobrenome,
      email,
      telefone,
      observacoes,
      favorito,
    });
    await novoContato.save();
    res.json({ message: "Contato criado com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Um erro ocorreu ao adicionar contato!", error: err });
  }
});

//[put]

contatosRouter.put("/contatos/:id", async (req, res) => {
  const { error, value } = contatoValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    //http 400 - Bad Request - indica que a requisição tem dados inválidos
    res
      .status(400)
      .json({ message: "depois eu mudo", error: error.details[0].message });
    return;
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = req.body;

  try {
    //Procurando o contato pelo ID indicado, se existir ele será atualizado.
    const contato = await Contato.findByIdAndUpdate(req.params.id, {
      nome,
      sobrenome,
      email,
      telefone,
      observacoes,
      favorito,
    });

    if (contato) {
      res.json({ message: "Contato atualizado com sucesso." });
    } else {
      res.status(404).json({ message: "Contato não encontado." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "um erro ocorreu ao atualizar", error: err });
  }
});

//[delete]

contatosRouter.delete("/contatos/:id", async (req, res) => {
  try {
    const contato = await Contato.findByIdAndDelete(req.params.id);
    if (contato) {
      res.json({ message: "Contato apagado com sucesso!" });
    } else {
      res.status(404).json({ message: "Contato não econtrado!" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao remover o contato.", error: err });
  }
});
