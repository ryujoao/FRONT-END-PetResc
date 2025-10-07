import React, { useState } from 'react';
import styles from "../cadastro/cadastroUsu.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from '../../services/api';

import "@fortawesome/fontawesome-free/css/all.min.css";

export default function CadastroNext() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');

   const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !cpf) {
      setError('Por favor, preencha todos os campos obrigatórios (nome, email, senha e CPF).');
      return;
    }

    try {
      await api.post('/usuarios/register', {
        name,
        email,
        password,
        cpf 
      });

      // Salva o nome do usuário no localStorage
      localStorage.setItem('nomeUsuario', name);

      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      navigate('/login'); 
    } catch (err: any) {
      console.error("Erro no cadastro:", err); 

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } 
      else if (err.response) {
        setError(`Erro ${err.response.status}: O servidor respondeu, mas não foi possível processar a resposta.`);
      }
      else {
        setError('Ocorreu um erro de rede. O servidor está offline?');
      }
    }
  };

  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms2}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form}  onSubmit={handleRegister}>
          <h1 className={styles.titulo}>Cadastre-se</h1>
          <p className={styles.subTitulo}>
            Crie sua conta e ajude a transformar vidas
          </p>

          <div className={styles.divisoria}>
            <div className={styles.linhaEsquerda}></div>
            <span className={styles.texto}>ou</span>
            <div className={styles.linhaDireita}></div>
          </div>

          <div>
          <label className={styles.grupoInput}>Telefone</label>
            <input
            className={styles.inputLogin}
            type="text"
            placeholder="(+55) 00 00000-0000"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />         
          </div>
          <div>
          <label className={styles.grupoInput}>Senha</label>
  
           <input
            className={styles.inputLogin}
            type="text"
            placeholder="Digite sua senha"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          </div>
          <div>
          <label className={styles.grupoInput}>Confirme sua senha</label>
            
            <input
            className={styles.inputLogin}
            type="text"
            placeholder="Confirme sua senha"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <Link to="/cadastroNext">
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
    