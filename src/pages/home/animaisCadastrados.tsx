import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./animaisCadastrados.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaPaw } from "react-icons/fa";

interface Animal {
  id: number;
  nome?: string;
  raca?: string;
  idade?: number;
  status: string;
  photoURL?: string;
}

interface Pedido {
    id: number;
    animalId: number;
    status: string; 
}

export default function AnimaisCadastrados() {
  const navigate = useNavigate();
  
  const [listas, setListas] = useState({
    adocao: [] as Animal[],
    lar: [] as Animal[],
    pedidos: [] as Animal[],
    concluidas: [] as Animal[]
  });
  const [loading, setLoading] = useState(true);

  const normalizar = (texto: string) => {
    if (!texto) return "";
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const token = localStorage.getItem('@AuthData:token');
    
    async function fetchData() {
        try {
            const [resAnimais, resPedidos] = await Promise.all([
                api.get("/animais/gerenciar/lista", { headers: { Authorization: `Bearer ${token}` } }),
                api.get("/pedidos-adocao/gerenciar", { headers: { Authorization: `Bearer ${token}` } })
            ]);

            const todosAnimais: Animal[] = resAnimais.data;
            const todosPedidos: Pedido[] = resPedidos.data;
            
            const adocaoArr: Animal[] = [];
            const larArr: Animal[] = [];
            const pedidosArr: Animal[] = [];
            const concluidasArr: Animal[] = [];

            todosAnimais.forEach(animal => {
                const s = normalizar(animal.status);
                // Verifica se há pedido PENDENTE para este animal
                const temPedidoPendente = todosPedidos.some(p => p.animalId === animal.id && p.status === 'PENDENTE');

                // Lógica de Prioridade de Distribuição:
                // 1. Concluído/Adotado
                if (s.includes('adotado') || s.includes('concluido')) {
                    concluidasArr.push(animal);
                } 
                // 2. Pedidos Pendentes (Status 'solicitado' ou existe registro na tabela pedidos)
                else if (temPedidoPendente || s.includes('pendente') || s.includes('solicitado')) {
                    pedidosArr.push(animal);
                }
                // 3. Lar Temporário
                else if (s.includes('lar') || s.includes('temporario')) {
                    larArr.push(animal);
                }
                // 4. Disponível (padrão)
                else {
                    adocaoArr.push(animal);
                }
            });

            setListas({
                adocao: adocaoArr,
                lar: larArr,
                pedidos: pedidosArr,
                concluidas: concluidasArr
            });

        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        } finally {
            setLoading(false);
        }
    }

    fetchData();
  }, []);

  const handleCardClick = (id: number) => {
      navigate(`/gerenciar-adocao/${id}`);
  };

  if (loading) return <div className={styles.loadingContainer}><p>Carregando painel...</p></div>;

  const renderCard = (animal: Animal, labelStatus: string) => (
    <div 
        key={animal.id} 
        className={styles.card} 
        onClick={() => handleCardClick(animal.id)} 
        title="Clique para gerenciar"
    >
        <div className={styles.imgWrapper}>
            <img
                src={animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"}
                alt={animal.nome || "Sem Nome"}
                onError={(e) => (e.currentTarget.src = "https://placehold.co/300")}
            />
        </div>

        <div className={styles.infoCard}>
            <h3 className={styles.cardNome}>{animal.nome || "Sem Nome"}</h3>
            <p className={styles.descricaoCard}>
                {animal.raca || "Raça n/d"} • {animal.idade ? `${animal.idade} anos` : "?"}
            </p>
            <span className={styles.tagId}>#{animal.id}</span>
        </div>

        <div className={styles.statusSuperior}>{labelStatus}</div>
        <div className={styles.statusInferior}>Clique para gerenciar</div>
    </div>
  );

  const EmptyList = ({ msg }: { msg: string }) => (
    <div className={styles.emptyBox}>
        <FaPaw size={30} color="#ccc" />
        <p className={styles.mensagemVazio}>{msg}</p>
    </div>
  );

  return (
    <div className={styles.containerPrincipal}>
      
      <div className={styles.containerSection}>
        <div className={styles.headerSection}>
            <h2 className={styles.titulo}>Disponíveis ({listas.adocao.length})</h2>
            <button className={styles.btnAdd} onClick={() => navigate('/registrar-animal')}>
                <FaPlusCircle size={22} title="Cadastrar Novo" />
            </button>
        </div>
        <div className={styles.listaScroll}>
            {listas.adocao.length > 0 ? listas.adocao.map(a => renderCard(a, 'Disponível')) : <EmptyList msg="Nenhum animal disponível." />}
        </div>
      </div>

      <div className={styles.containerSection}>
        <div className={styles.headerSection}>
            <h2 className={styles.titulo}>Solicitações ({listas.pedidos.length})</h2>
        </div>
        <div className={styles.listaScroll}>
            {listas.pedidos.length > 0 ? listas.pedidos.map(a => renderCard(a, 'Pendente')) : <EmptyList msg="Nenhuma solicitação." />}
        </div>
      </div>

      <div className={styles.containerSection}>
        <div className={styles.headerSection}>
            <h2 className={styles.titulo}>Concluídos ({listas.concluidas.length})</h2>
        </div>
        <div className={styles.listaScroll}>
            {listas.concluidas.length > 0 ? listas.concluidas.map(a => renderCard(a, 'Adotado')) : <EmptyList msg="Nenhuma adoção ainda." />}
        </div>
      </div>

    </div>
  );
}