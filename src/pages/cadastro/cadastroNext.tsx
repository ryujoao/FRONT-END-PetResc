import React, { useState } from 'react';
import styles from "./cadastroUsu.module.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from '../../services/api';
import { useAuth } from '../../auth/AuthContext';

export default function CadastroNext() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleFinalizarCadastro = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    setError('');

// --- Validações básicas ---
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    if (senha.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    // Pega os dados da primeira página que foram passados pelo navigate
    const dadosDaPagina1 = location.state?.dados;
    if (!dadosDaPagina1) {
      setError("Ocorreu um erro. Por favor, tente o cadastro desde o início.");
      return;
    }

    // Junta todos os dados do usuário
    const dadosCompletos = {
      ...dadosDaPagina1, // name, cpf, email
      telefone,
      senha,
    };

    try {
      // --- LÓGICA DE API IRIA AQUI ---
      // Aqui você faria a chamada para sua API para criar o usuário
      // Exemplo: const response = await api.post('/usuarios', dadosCompletos);
      console.log("Enviando para a API:", dadosCompletos);

      // Se a chamada à API for um sucesso, faça o login:
      console.log("Cadastro finalizado com sucesso!");
      
      // 4. CHAMAR A FUNÇÃO DE LOGIN!
      login();

      // 5. REDIRECIONAR PARA A HOME LOGADA
      navigate('/');

    } catch (apiError) {
      // Se a API retornar um erro (ex: email já existe)
      console.error("Erro ao cadastrar:", apiError);
      setError("Não foi possível realizar o cadastro. Tente novamente.");
    }
  };
  
  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms2}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form}>
          <h1 className={styles.titulo}>Últimos Passos</h1>
          <p className={styles.subTitulo}>
            Complete seus dados para finalizar
          </p>
          
          <div>
            <label className={styles.grupoInput}>Telefone</label>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="(+55) 00 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.grupoInput}>Senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Mínimo 8 caracteres" // Dica para o utilizador
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.grupoInput}>Confirme sua senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <Link to={"/"} style={{ textDecoration: 'none' }}>
          <button type="submit" className={styles.botaoProx}>
            Próximo
          </button>
          </Link>

          <p className={styles.loginLink}>
            Já tem conta? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div className={styles.bannerSessao}></div>
    </div>
  );
}