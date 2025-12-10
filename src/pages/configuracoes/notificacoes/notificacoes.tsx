import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import tabStyles from "../../perfil/perfil.module.css"; 
import listStyles from "../config.module.css"; 
import { BsCheckCircleFill } from "react-icons/bs";
import { FaPaw } from "react-icons/fa";
import { IoIosArrowForward, IoIosInformationCircle } from "react-icons/io";
import { GoGift } from "react-icons/go";

interface Notificacao {
  id: number;
  iconType: "paw" | "check" | "info" | "gift"; // Guardamos string para salvar no JSON/Storage
  texto: string;
  status: "lida" | "nao_lida";
  path?: string;
  data?: string; // Opcional: data da notificação
}

// Helper para renderizar o ícone correto baseado na string
const getIcon = (type: string) => {
  switch (type) {
    case "check": return <BsCheckCircleFill color="#28a745" />;
    case "info": return <IoIosInformationCircle color="#17a2b8" />;
    case "gift": return <GoGift color="#e83e8c" />;
    default: return <FaPaw color="#286699" />;
  }
};

const dadosIniciais: Notificacao[] = [
  { id: 1, iconType: "paw", texto: "Bem-vindo ao PetResc!", status: "lida" },
  { id: 2, iconType: "check", texto: "Seu cadastro foi concluído", status: "lida" },
  { id: 3, iconType: "info", texto: "Termos de uso e privacidade atualizados", status: "nao_lida", path: "/config/privacidade" },
  { id: 4, iconType: "paw", texto: "Uma nova ONG parceira entrou na plataforma!", status: "nao_lida" },
  { id: 5, iconType: "gift", texto: "Nova campanha de doação iniciada!", status: "nao_lida", path: "/nova-campanha" },
];

export default function Notificacoes() {
  const [activeView, setActiveView] = useState<"nao_lida" | "lida">("nao_lida");
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  // 1. Carregar notificações (do LocalStorage ou Inicial)
  useEffect(() => {
    const saved = localStorage.getItem("@PetResc:notificacoes");
    if (saved) {
      setNotificacoes(JSON.parse(saved));
    } else {
      setNotificacoes(dadosIniciais);
    }
  }, []);

  // 2. Salvar no LocalStorage sempre que houver mudança
  useEffect(() => {
    if (notificacoes.length > 0) {
      localStorage.setItem("@PetResc:notificacoes", JSON.stringify(notificacoes));
    }
  }, [notificacoes]);

  // Função para marcar uma específica como lida
  const marcarComoLida = (id: number) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "lida" } : n))
    );
  };

  // Função para marcar TODAS como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, status: "lida" })));
    // Opcional: Mudar a aba para 'lida' automaticamente
    // setActiveView("lida"); 
  };

  // Filtra baseada na aba ativa
  const notificacoesParaExibir = notificacoes.filter(
    (n) => n.status === activeView
  );

  return (
    <div className={listStyles.configContainer}>
      <h1 className={listStyles.titulo}>Notificações</h1>

      <div className={tabStyles.btnContainer} style={{ marginBottom: '1.5rem' }}>
        <button
          className={activeView === "lida" ? tabStyles.tabUm : tabStyles.tabDois}
          onClick={() => setActiveView("lida")}
        >
          Lidas
        </button>
        <button
          className={activeView === "nao_lida" ? tabStyles.tabUm : tabStyles.tabDois}
          onClick={() => setActiveView("nao_lida")}
        >
          Não lidas
          {/* Badge de contador */}
          {notificacoes.filter(n => n.status === 'nao_lida').length > 0 && (
             <span style={{
                 marginLeft: '8px', 
                 background: '#dc3545', 
                 color: 'white', 
                 borderRadius: '50%', 
                 padding: '2px 8px', 
                 fontSize: '0.8rem'
             }}>
                 {notificacoes.filter(n => n.status === 'nao_lida').length}
             </span>
          )}
        </button>
      </div>
      
      {/* Botão extra para limpar notificações pendentes */}
      {activeView === "nao_lida" && notificacoesParaExibir.length > 0 && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button className={listStyles.limparBtn}
                onClick={marcarTodasComoLidas}
            >
                Marcar todas como lidas
            </button>
        </div>
      )}

      <section className={listStyles.configSection}>
        {notificacoesParaExibir.length > 0 ? (
          notificacoesParaExibir.map((notificacao) => (
            <Link 
                to={notificacao.path || "#"} 
                className={listStyles.configItem} 
                key={notificacao.id}
                onClick={() => {
                    // Ao clicar, se estiver na aba "não lida", marca como lida
                    if (notificacao.status === "nao_lida") {
                        marcarComoLida(notificacao.id);
                    }
                }}
            >
              <div className={listStyles.iconCircle}>
                  {getIcon(notificacao.iconType)}
              </div>
              <span className={listStyles.itemTexto}>{notificacao.texto}</span>
              <IoIosArrowForward className={listStyles.seta} />
            </Link>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '3rem', color: '#888' }}>
            <p>Nenhuma notificação {activeView === 'nao_lida' ? 'nova' : 'nesta lista'}.</p>
          </div>
        )}
      </section>
    </div>
  );
}