import React, { useState } from "react";
import styles from "../style/voluntarios.module.css";
import Layout from "../components/layout";
import { FaPaw } from "react-icons/fa"; // Para as patinhas de fundo (opcional)
import Modal from "../components/modal";

// --- TIPAGEM ---
interface Voluntario {
  id: string;
  nome: string;

  data: string;
}

// --- DADOS MOCKADOS (Baseado na imagem) ---
const MOCK_VOLUNTARIOS: Voluntario[] = [
  { id: "01", nome: "Lucas Moreira da Silva", data: "03/09/2025" },
  { id: "02", nome: "Beatriz Fernandes Costa", data: "11/09/2025" },
  { id: "03", nome: "Rafael Cardoso Menezes", data: "18/09/2025" },
  { id: "04", nome: "Juliana Nogueira Prado", data: "26/09/2025" },
  { id: "05", nome: "Thiago Almeida Ramos", data: "04/10/2025" },
  { id: "06", nome: "Marina Duarte Ribeiro", data: "13/10/2025" },
  { id: "07", nome: "Gabriel Antunes Ferreira", data: "21/10/2025" },
  { id: "08", nome: "Camila Rocha Martins", data: "29/10/2025" },
  { id: "09", nome: "Eduardo Pires Amaral", data: "06/11/2025" },
];

export default function VoluntariosLar() {
  // Estado para controlar os checkboxes (quais IDs estão selecionados)
  const [selecionados, setSelecionados] = useState<string[]>([]);

  // Estado para o modal
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success" as "success" | "error",
  });

  const toggleSelect = (id: string) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selecionados.length === MOCK_VOLUNTARIOS.length) {
      setSelecionados([]);
    } else {
      setSelecionados(MOCK_VOLUNTARIOS.map((v) => v.id));
    }
  };

  // Função auxiliar para fechar o modal
  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const handleAprovar = () => {
    if (selecionados.length === 0) {
      setModalConfig({
        isOpen: true,
        title: "Atenção",
        message: "Selecione pelo menos um voluntário para aprovar.",
        type: "error",
      });
      return;
    }

    console.log("Aprovando IDs:", selecionados);

    setModalConfig({
      isOpen: true,
      title: "Sucesso!",
      message: `${selecionados.length} voluntário(s) aprovado(s) com sucesso!`,
      type: "success",
    });
  };

  const handleRejeitar = () => {
    if (selecionados.length === 0) {
      setModalConfig({
        isOpen: true,
        title: "Atenção",
        message: "Selecione pelo menos um voluntário para rejeitar.",
        type: "error",
      });
      return;
    }

    console.log("Rejeitando IDs:", selecionados);

    setModalConfig({
      isOpen: true,
      title: "Rejeitado",
      message: `${selecionados.length} voluntário(s) foram rejeitados.`,
      type: "error",
    });
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <Modal
          isOpen={modalConfig.isOpen}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          onClose={closeModal}
        />
        {/* ELEMENTOS DE FUNDO (Patinhas Decorativas) */}
        <div className={styles.bgDecorations}>
          <FaPaw className={styles.paw1} />
          <FaPaw className={styles.paw2} />
          <FaPaw className={styles.paw3} />
        </div>

        {/* --- CABEÇALHO DA PÁGINA --- */}
        <div className={styles.header}>
          <h1 className={styles.titulo}>Voluntários para Lar temporário</h1>
          <p className={styles.subtitulo}>
            Acompanhe todos os voluntários e seus formulários
          </p>
        </div>

        {/* --- TABELA DE LISTAGEM --- */}
        <div className={styles.tableContainer}>
          {/* Cabeçalho da Tabela */}
          <div className={styles.tableHeader}>
            <div className={styles.colCheck}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={
                  selecionados.length === MOCK_VOLUNTARIOS.length &&
                  MOCK_VOLUNTARIOS.length > 0
                }
                onChange={toggleSelectAll}
              />
            </div>
            <div className={styles.colId}>ID</div>
            <div className={styles.colNome}>Nome</div>
            <div className={styles.colTipo}></div>
            <div className={styles.colData}>Feito em</div>
          </div>

          {/* Linhas da Tabela */}
          <div className={styles.tableBody}>
            {MOCK_VOLUNTARIOS.map((voluntario) => (
              <div key={voluntario.id} className={styles.tableRow}>
                <div className={styles.colCheck}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selecionados.includes(voluntario.id)}
                    onChange={() => toggleSelect(voluntario.id)}
                  />
                </div>
                <div className={styles.colId}>{voluntario.id}</div>
                <div className={styles.colNome}>{voluntario.nome}</div>
                <div className={styles.colTipo}></div>
                <div className={styles.colData}>{voluntario.data}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.actionsContainer}>
          {/* Botão Rejeitar (Vermelho) */}
          <button
            className={`${styles.botao} ${styles.botaoRejeitar}`}
            onClick={handleRejeitar}
          >
            Rejeitar
          </button>

          {/* Botão Aprovar (Azul Padrão) */}
          <button
            className={`${styles.botao} ${styles.botaoAprovar}`}
            onClick={handleAprovar}
          >
            Aprovar
          </button>
        </div>
      </div>
    </Layout>
  );
}
