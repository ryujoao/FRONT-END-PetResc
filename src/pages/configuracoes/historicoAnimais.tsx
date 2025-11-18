import { useState } from "react";
import Layout from "../../components/layout";
import styles from "./config.module.css";

// Tipagem para o Card do Histórico
interface HistoryItem {
  id: number;
  nome: string;
  status: string; // "Adotado", "Registrado", etc
  img: string;
  detalhes: string[]; // Ex: ["Macho", "Filhote", "SRD"]
  estagio: number; // Ex: 4
  descricaoEstagio: string;
}

export default function HistoricoAnimais() {
  // Estado para controlar qual tab está ativa
  const [activeTab, setActiveTab] = useState<
    "Adotados" | "Registrados" | "Lar temporário" | "Vistos recentemente"
  >("Adotados");

  // Mock de dados (Substitua por dados da API depois)
  const historicoData: HistoryItem[] = [
    {
      id: 1,
      nome: "Neguinho",
      status: "Adotado",
      img: "../../../public/animais/neguinho.png", // Ajuste o caminho conforme seu projeto
      detalhes: [
        "Macho",
        "•",
        "Filhote",
        "•",
        "SRD",
        "•",
        "Acompanhamento inicial",
      ],
      estagio: 4,
      descricaoEstagio:
        "Após a chegada do animal ao novo lar, a ONG entra em contato para acompanhar a adaptação, pedindo notícias e garantindo que o processo está ocorrendo de forma positiva.",
    },
  ];

  // Filtro simples (aqui só tem Adotados no mock, mas a lógica está pronta)
  const itemsParaExibir = historicoData.filter((item) => {
    if (activeTab === "Adotados") return item.status === "Adotado";
    return false; // Adicione lógica para os outros status
  });

  // Lista das tabs para gerar dinamicamente
  const tabs = [
    "Adotados",
    "Registrados",
    "Lar temporário",
    "Vistos recentemente",
  ] as const;

  return (
   
      <div className={styles.configContainer}>
        <h1 className={styles.titulo}>Segurança</h1>

        <div className={styles.contentWrapper}>
          <h2 className={styles.subtitulo}>Histórico</h2>

          {/* --- TABS (Estilo Pílula adaptado para 4 itens) --- */}
          <div className={styles.tabContainer}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab ? styles.tabActive : styles.tabInactive
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* --- ÁREA DE CONTEÚDO --- */}
          <div className={styles.cardsList}>
            {itemsParaExibir.length > 0 ? (
              itemsParaExibir.map((item) => (
                <div key={item.id} className={styles.card}>
                  {/* Esquerda: Imagem */}
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={item.img}
                      alt={item.nome}
                      className={styles.cardImage}
                    />
                  </div>

                  {/* Centro: Informações Básicas */}
                  <div className={styles.cardInfo}>
                    <h3 className={styles.petName}>{item.nome}</h3>
                    <span className={styles.badgeStatus}>{item.status}</span>
                    <div className={styles.petDetails}>
                      {item.detalhes.join(" ")}
                    </div>
                  </div>

                  {/* Direita: Descrição do Estágio */}
                  <div className={styles.cardStage}>
                    <h4 className={styles.stageTitle}>
                      Estágios de adoção: {item.estagio}
                    </h4>
                    <p className={styles.stageDesc}>{item.descricaoEstagio}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>Nenhum histórico encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
