const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// =======================
// GET - Listar todos
// =======================
router.get('/', async (req, res) => {
  try {
    const lares = await prisma.larTemporario.findMany({
      include: { usuario: true, ong: true, animal: true }
    });
    res.json(lares);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar lares temporários' });
  }
});

// =======================
// GET - Detalhes
// =======================
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const lar = await prisma.larTemporario.findUnique({
      where: { id: parseInt(id) },
      include: { usuario: true, ong: true, animal: true }
    });

    if (!lar) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }

    res.json(lar);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar lar temporário' });
  }
});

// =======================
// POST - Registrar interesse
// =======================
router.post('/', async (req, res) => {
  const {
    usuarioId, ongId, animalId, nomeCompleto, cpf, dataNascimento,
    telefone, email, endereco, tipoMoradia, possuiQuintal, portesAceitos,
    especiesAceitas, possuiAnimais, experiencia, dispoVeterinario,
    podeFornecerRacao, precisaAjudaONG, periodoDisponibilidade
  } = req.body;

  try {
    const novoLar = await prisma.larTemporario.create({
      data: {
        usuarioId: parseInt(usuarioId),
        ongId: parseInt(ongId),
        animalId: animalId ? parseInt(animalId) : null,
        nomeCompleto,
        cpf,
        dataNascimento: new Date(dataNascimento),
        telefone,
        email,
        endereco,
        tipoMoradia,
        possuiQuintal,
        portesAceitos,
        especiesAceitas,
        possuiAnimais,
        experiencia,
        dispoVeterinario,
        podeFornecerRacao,
        precisaAjudaONG,
        periodoDisponibilidade
      }
    });

    res.status(201).json(novoLar);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar interesse em lar temporário' });
  }
});

// =======================
// PUT - Atualizar status
// =======================
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const larAtualizado = await prisma.larTemporario.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json(larAtualizado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar status do lar temporário' });
  }
});

// =======================
// DELETE - Cancelar
// =======================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.larTemporario.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cancelar lar temporário' });
  }
});

module.exports = router;
