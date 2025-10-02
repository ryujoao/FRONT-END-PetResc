const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const criarReport = async (req, res) => {
    const usuarioLogadoId = req.account.id;
    
    const { descricao, localizacao, contato, animalId, anonimo } = req.body;

    if (!descricao || !localizacao) {
        return res.status(400).json({ error: "Descrição e localização são obrigatórias." });
    }

    try {
        const dadosParaCriar = {
            descricao,
            localizacao,
            contato: contato || "", 
            anonimo: anonimo || false,
            autor: { 
                connect: {
                    id: usuarioLogadoId
                }
            }
        };
        if (animalId) {
            dadosParaCriar.animal = {
                connect: {
                    id: parseInt(animalId)
                }
            };
        }

        const novaDenuncia = await prisma.denuncia.create({
            data: dadosParaCriar
        });

        res.status(201).json({ message: "Denúncia registrada com sucesso", denuncia: novaDenuncia });

    } catch (err) {
        console.error("ERRO DETALHADO AO CRIAR DENÚNCIA:", err);
        res.status(500).json({ error: "Erro ao registrar denúncia" });
    }
};
// Listardenuncias
const listarReports = async (req, res) => {
  try {
    const denuncias = await prisma.denuncia.findMany({
      include: {
        animal: true,
        autor: true 
      }
    });
    res.json(denuncias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar denúncias" });
  }
};


const atualizarReport = async (req, res) => {
  const denunciaId = parseInt(req.params.id);
  const { descricao } = req.body;
  const usuarioLogado = req.account;

  if (!descricao) {
    return res.status(400).json({ error: "Descrição é obrigatória" });
  }

  try {
    const denunciaExistente = await prisma.denuncia.findUnique({
        where: { id: denunciaId }
    });

    if (!denunciaExistente) {
        return res.status(404).json({ error: "Denúncia não encontrada." });
    }

    if (denunciaExistente.createdBy !== usuarioLogado.id && usuarioLogado.role !== 'ADMIN') {
        return res.status(403).json({ error: "Acesso negado. Permissões insuficientes." });
    }

    const denunciaAtualizada = await prisma.denuncia.update({
      where: { id: denunciaId },
      data: { descricao }
    });

    res.json({ message: "Denúncia atualizada com sucesso", denuncia: denunciaAtualizada });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar denúncia" });
  }
}; 

// DELETE
const apagarReport = async (req, res) => {
    const reportId = parseInt(req.params.id);
    const usuarioLogadoId = req.account.id;

    try {
        const report = await prisma.report.findUnique({
            where: { id: reportId }
        });

        if (!report) {
            return res.status(404).json({ error: "Denúncia não encontrada" });
        }

        if (report.usuarioId !== usuarioLogadoId) {
            return res.status(403).json({ error: "Acesso negado. Você não tem permissão para apagar esta denúncia." });
        }

        await prisma.report.delete({ where: { id: reportId } });
        res.json({ message: "Denúncia apagada com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao apagar denúncia" });
    }
};

module.exports = {
  criarReport,
  listarReports,
  atualizarReport,
  apagarReport
};
