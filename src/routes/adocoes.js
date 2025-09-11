const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// =======================
// GET - Listar todos os pedidos de adoção
// =======================
router.get('/', async (req, res) => {
  try {
    const adocoes = await prisma.adocao.findMany({
      include: {
        usuario: true, // quem solicitou
        animal: true,  // qual animal
      }
    });
    res.json(adocoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pedidos de adoção' });
  }
});

// =======================
// GET - Detalhes de um pedido
// =======================
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const adocao = await prisma.adocao.findUnique({
      where: { id: parseInt(id) },
      include: { usuario: true, animal: true }
    });

    if (!adocao) {
      return res.status(404).json({ error: 'Pedido de adoção não encontrado' });
    }

    res.json(adocao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pedido de adoção' });
  }
});

// =======================
// POST - Solicitar adoção de um animal
// =======================
router.post('/', async (req, res) => {
  const { usuarioId, animalId } = req.body;

  if (!usuarioId || !animalId) {
    return res.status(400).json({ error: 'Usuário e animal são obrigatórios' });
  }

  try {
    const novoPedido = await prisma.adocao.create({
      data: {
        usuarioId: parseInt(usuarioId),
        animalId: parseInt(animalId),
        status: 'EM_ANALISE' // status inicial
      },
      include: { usuario: true, animal: true }
    });

    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao solicitar adoção' });
  }
});

// =======================
// PUT - Atualizar status do pedido
// =======================
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Status válidos
  const statusValidos = ['EM_ANALISE', 'APROVADO', 'REJEITADO'];
  if (!statusValidos.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  try {
    const pedidoAtualizado = await prisma.adocao.update({
      where: { id: parseInt(id) },
      data: { status },
      include: { usuario: true, animal: true }
    });

    res.json(pedidoAtualizado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar pedido de adoção' });
  }
});

// =======================
// DELETE - Cancelar pedido de adoção
// =======================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.adocao.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cancelar pedido de adoção' });
  }
});

module.exports = router;
