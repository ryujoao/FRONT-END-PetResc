const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.account.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign(
    { id: user.id, type: user.type },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
}

async function register(req, res) {
  const { email, password, type } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await prisma.account.create({
    data: { email, password: hashed, type }
  });

  res.status(201).json({ id: newUser.id, email: newUser.email, type: newUser.type });
}

module.exports = { login, register };