import React, { useState, useEffect } from "react";
import styles from "../style/voluntarios.module.css";
import Layout from "../components/layout";
// Adicionamos FaCheck e FaTimes para os botões de ação
import { FaPaw, FaWhatsapp, FaCheck, FaTimes } from "react-icons/fa";

// --- TIPAGEM (Baseada na API) ---
interface Voluntario {
  id: number;
  nomeCompleto: string;
  telefone: string;
  tipoMoradia: string;
  createdAt: string; 
}

export default function VoluntariosLar() {
  // Estados
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecionados, setSelecionados] = useState<number[]>([]);

  // --- BUSCA DE DADOS ---
  useEffect(() => {
    const fetchVoluntarios = async () => {
      try {
        // 1. CORREÇÃO: Nome exato da chave do token no Local Storage
        const token = localStorage.getItem("@AuthData:token");
        
        console.log("Token sendo enviado:", token); 
        
        if (!token) {
           // Se não tiver token, nem tenta buscar (evita erro 401/403 desnecessário)
           console.warn("Usuário não logado.");
           setLoading(false);
           return;
        }

        const baseUrl = "https://petresc.onrender.com"; 
        
        // 2. CORREÇÃO: Rota com 'Temporarios' (T maiúsculo)
        const response = await fetch(`${baseUrl}/api/lares-Temporarios/feed`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        // Tratamento específico para erro 403 (Permissão)
        if (response.status === 403) {
            alert("Acesso Negado: Seu usuário não tem permissão de ONG ou ADMIN.");
            throw new Error("Permissão insuficiente (403)");
        }

        if (!response.ok) {
          throw new Error("Erro ao buscar voluntários");
        }

        const data = await response.json();

        // 3. Tratamento de segurança (Map)
        const dadosFormatados = data.map((item: any) => ({
          id: item.id,
          nomeCompleto: item.nomeCompleto || item.usuario?.nome || "Sem nome",
          telefone: item.telefone || item.usuario?.telefone || "",
          tipoMoradia: item.tipoMoradia,
          createdAt: item.createdAt || new Date().toISOString()
        }));

        setVoluntarios(dadosFormatados);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoluntarios();
  }, []);

  // --- FUNÇÕES AUXILIARES ---
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const abrirWhatsApp = (telefone: string) => {
    if (!telefone) return alert("Telefone não disponível");
    const cleanPhone = telefone.replace(/\D/g, "");
    const url = `https://web.whatsapp.com/send?phone=55${cleanPhone}`;
    window.open(url, "_blank");
  };

  // Checkbox Logic
  const toggleSelect = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selecionados.length === voluntarios.length) {
      setSelecionados([]);
    } else {
      setSelecionados(voluntarios.map((v) => v.id));
    }
  };

  // Funções placeholder para os botões (futuramente conectar na API)
  const handleAprovar = () => {
    alert(`Aprovando IDs: ${selecionados.join(", ")}`);
    // Aqui virá a lógica de fetch PATCH ...
  };

  const handleRecusar = () => {
    alert(`Recusando IDs: ${selecionados.join(", ")}`);
    // Aqui virá a lógica de fetch PATCH ...
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        
        {/* ELEMENTOS DE FUNDO */}
        <div className={styles.bgDecorations}>
          <FaPaw className={styles.paw1} />
          <FaPaw className={styles.paw2} />
          <FaPaw className={styles.paw3} />
        </div>

        {/* --- CABEÇALHO --- */}
        <div className={styles.header}>
          <h1 className={styles.titulo}>Voluntários para Lar temporário</h1>
          <p className={styles.subtitulo}>
            Acompanhe todos os voluntários disponíveis na rede.
          </p>
        </div>

        {/* --- TABELA --- */}
        <div className={styles.tableContainer}>
          
          {loading ? (
            <p style={{textAlign: 'center', padding: '20px', color: '#2D68A6'}}>Carregando voluntários...</p>
          ) : (
            <>
              {/* Cabeçalho da Tabela */}
              <div className={styles.tableHeader}>
                <div className={styles.colCheck}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox} 
                    checked={selecionados.length === voluntarios.length && voluntarios.length > 0}
                    onChange={toggleSelectAll}
                  />
                </div>
                <div className={styles.colId}>ID</div>
                <div className={styles.colNome}>Nome</div>
                <div className={styles.colTipo}>Detalhes Moradia</div>
                <div className={styles.colData}>Data Cadastro</div>
                <div className={styles.colAcoes} style={{width: '100px', textAlign: 'center'}}>Contato</div> 
              </div>

              {/* Corpo da Tabela */}
              <div className={styles.tableBody}>
                {voluntarios.length === 0 ? (
                    <div style={{padding: '20px', textAlign: 'center', color: '#666'}}>Nenhum voluntário encontrado.</div>
                ) : (
                    voluntarios.map((vol) => (
                    <div key={vol.id} className={styles.tableRow}>
                        <div className={styles.colCheck}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={selecionados.includes(vol.id)}
                            onChange={() => toggleSelect(vol.id)}
                        />
                        </div>
                        <div className={styles.colId}>#{vol.id}</div>
                        <div className={styles.colNome}>
                            <strong>{vol.nomeCompleto}</strong>
                        </div>
                        <div className={styles.colTipo}>
                            Lar Temporário ({vol.tipoMoradia})
                        </div>
                        <div className={styles.colData}>{formatDate(vol.createdAt)}</div>
                        
                        {/* Botão de Contato */}
                        <div className={styles.colAcoes} style={{display:'flex', justifyContent:'center'}}>
                            <button 
                                onClick={() => abrirWhatsApp(vol.telefone)}
                                style={{
                                    background: 'transparent', 
                                    border: 'none', 
                                    cursor: 'pointer', 
                                    color: '#25D366', 
                                    fontSize: '1.2rem'
                                }}
                                title="Chamar no WhatsApp"
                            >
                                <FaWhatsapp />
                            </button>
                        </div>
                    </div>
                    ))
                )}
              </div>
            </>
          )}
        </div>

        {/* --- BARRA DE AÇÕES FLUTUANTE (NOVO) --- */}
        {selecionados.length > 0 && (
          <div className={styles.actionBarContainer}>
            <span className={styles.selectedCount}>
              {selecionados.length} {selecionados.length === 1 ? 'selecionado' : 'selecionados'}
            </span>

            <button className={styles.btnRecusar} onClick={handleRecusar}>
              <FaTimes /> Recusar
            </button>

            <button className={styles.btnAprovar} onClick={handleAprovar}>
              <FaCheck /> Aprovar
            </button>
          </div>
        )}

      </div>
    </Layout>
  );
}