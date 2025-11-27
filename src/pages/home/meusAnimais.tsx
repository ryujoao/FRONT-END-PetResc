import React, { useState, useEffect } from "react";
import styles from "./meusAnimais.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

// Tipagens
interface Animal {
    id: string;
    nome: string;
    raca: string;
    idade: string; 
    status: 'PERDIDO' | 'ENCONTRADO' | 'DISPONIVEL' | 'EM_TRATAMENTO' | 'ADOTADO';
    photoURL: string;
}

interface Adocao {
    id: string;
    animal: Animal;
    status_adocao: string;
}

// --- Card de Animal ---
interface AnimalCardProps {
    animal: Animal;
    statusAdocao?: string;
    tipoStatus: 'CADASTRO' | 'ADOCAO';
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, statusAdocao, tipoStatus }) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
   navigate(`/animal/${animal.id}`);
};

  const formatStatus = (status: string) => 
    status ? status.replace(/_/g, " ") : "Desconhecido";

  const statusSuperior = 
    tipoStatus === "CADASTRO" ? formatStatus(animal.status) : "Adoção Solicitada";

  const statusInferior = 
    tipoStatus === "ADOCAO" ? `Status: ${statusAdocao}` : "";

  const imagemSrc =
    animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto";

  return (
    <div className={styles.card} onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className={styles.imgWrapper}>
        <img
          src={imagemSrc}
          alt={animal.nome || "Animal"}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/300x300/f8f8f8/ccc?text=Erro+Imagem";
          }}
        />
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.cardNome}>{animal.nome || "Sem Nome"}</h3>
        <p className={styles.descricaoCard}>
          {animal.raca || "SRD"} • {animal.idade || "?"} anos
        </p>
        <span className={styles.tagId}>#{animal.id}</span>
      </div>

      <div className={styles.statusSuperior}>{statusSuperior}</div>

      {statusInferior && (
        <div className={styles.statusInferior}>{statusInferior}</div>
      )}
    </div>
  );
};

// --- Página Principal ---
export default function MeusAnimais() {
  const { user } = useAuth();
  const [animaisCadastrados, setAnimaisCadastrados] = useState<Animal[]>([]);
  const [adocoesEmProcesso, setAdocoesEmProcesso] = useState<Adocao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("@AuthData:token");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMeusDados = async () => {
      setLoading(true);
      setError(null);

      try {
        const [resAnimais, resAdocoes] = await Promise.all([
          api.get("/animais/gerenciar/lista"),
          api.get("/pedidos-adocao/meus-pedidos")
        ]);

        setAnimaisCadastrados(resAnimais.data);
        setAdocoesEmProcesso(resAdocoes.data);

      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Falha ao carregar seus registros. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeusDados();
  }, [user]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Carregando seus registros...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.containerPrincipal}>
        <p>Faça login para ver seus animais.</p>
      </div>
    );
  }

  return (
    <div className={styles.containerPrincipal}>
      
      {/* ANIMAIS CADASTRADOS */}
      <div className={styles.containerMeusAnimais}>
        <h2 className={styles.titulo}>Animais Cadastrados</h2>

        {animaisCadastrados.length === 0 ? (
          <p className={styles.mensagemVazio}>
            Você não possui animais cadastrados.
          </p>
        ) : (
          <div className={styles.gridAnimais}>
            {animaisCadastrados.map((animal) => (
              <AnimalCard 
                key={animal.id} 
                animal={animal} 
                tipoStatus="CADASTRO" 
              />
            ))}
          </div>
        )}
      </div>

      <hr className={styles.divisor} />

      {/* ADOÇÕES EM PROCESSO */}
      <div className={styles.adocaoProcesso}>
        <h2 className={styles.titulo}>Adoção em Processo</h2>

        {adocoesEmProcesso.length === 0 ? (
          <p className={styles.mensagemVazio}>
            Você não possui pedidos de adoção em análise.
          </p>
        ) : (
          <div className={styles.gridAnimais}>
            {adocoesEmProcesso.map((adocao) => (
              <AnimalCard
                key={adocao.id}
                animal={adocao.animal}
                statusAdocao={adocao.status_adocao}
                tipoStatus="ADOCAO"
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
