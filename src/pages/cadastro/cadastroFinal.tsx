import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import styles from "./cadastro.module.css";
import axios, { AxiosError } from "axios";

interface IBGEUFResponse {
  id: number;
  sigla: string;
  nome: string;
}

interface IBGECidadeResponse {
  id: number;
  nome: string;
}

export default function CadastroFinal() {
  const navigate = useNavigate();
  const location = useLocation();
  const dadosEtapaAnterior = location.state;

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [estados, setEstados] = useState<IBGEUFResponse[]>([]);
  const [cidades, setCidades] = useState<IBGECidadeResponse[]>([]);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => setEstados(response.data));
  }, []);

  useEffect(() => {
    if (estado) {
      axios
        .get<IBGECidadeResponse[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
        )
        .then((response) => setCidades(response.data));
    }
  }, [estado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!dadosEtapaAnterior) {
      setError("Dados anteriores não encontrados. Por favor, reinicie o cadastro.");
      setIsLoading(false);
      return;
    }

    const enderecoFormatado = {
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado
    };

    const dadosCompletos = {
      ...dadosEtapaAnterior,
      role: "ONG", // Forçando o role como ONG
      endereco: enderecoFormatado
    };

    console.log("Dados para registro de ONG:", dadosCompletos);

    try {
      const response = await api.post("/auth/register", dadosCompletos);
      console.log("Resposta do registro:", response.data);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (apiError) {
      if (apiError instanceof AxiosError && apiError.response) {
        setError(apiError.response.data.error || "Erro ao realizar cadastro");
      } else {
        setError("Erro ao conectar com o servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms2}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.titulo}>Endereço da ONG</h1>
          <p className={styles.subTitulo}>
            Complete os dados de localização para finalizar
          </p>

          <div>
            <label className={styles.grupoInput}>CEP</label>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="Digite o CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              maxLength={9}
            />
          </div>

          <div>
            <label className={styles.grupoInput}>Rua/Avenida</label>
            <input
              className={styles.inputLogin}
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </div>

          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Número</label>
              <input
                className={styles.inputLogin}
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Complemento</label>
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Opcional"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={styles.grupoInput}>Bairro</label>
            <input
              className={styles.inputLogin}
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Estado</label>
              <select
                className={styles.inputLogin}
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Selecione um estado</option>
                {estados.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Cidade</label>
              <select
                className={styles.inputLogin}
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                disabled={!estado}
              >
                <option value="">Selecione uma cidade</option>
                {cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
              {error}
            </p>
          )}

          <button type="submit" className={styles.botaoProx} disabled={isLoading}>
            {isLoading ? "Finalizando..." : "Finalizar Cadastro"}
          </button>

          <p className={styles.loginLink}>
            Já tem conta? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div className={styles.bannerSessao}></div>
    </div>
  );
}