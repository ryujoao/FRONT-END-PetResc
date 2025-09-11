const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const usuariosRoutes = require("./routes/usuarios");
const animaisRoutes = require("./routes/animais");
const authRoutes = require("./routes/auth");
const relatoriosRoutes = require("./routes/relatorios"); 

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());


// Rotas

app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/animais", animaisRoutes);
app.use("/relatorios", relatoriosRoutes); 


// Rota teste 

app.get("/api", (req, res) => {
  res.json({ message: "API rodando corretamente!" });
});


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");

  // Testa conexão com banco
  async function testConnection() {
    try {
      await prisma.$connect();
      console.log("Conexão com o banco de dados OK! ✅");
    } catch (err) {
      console.error("Erro ao conectar no banco ❌:", err);
    } finally {
      await prisma.$disconnect();
    }
  }

  testConnection();
});
