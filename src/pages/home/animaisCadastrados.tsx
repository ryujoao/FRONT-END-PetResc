import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./animaisCadastrados.module.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

interface Animal {
  id: number;
  nome?: string;
  raca?: string;
  idade?: number;
  status: string;
  photoURL?: string;
}

export default function AnimaisCadastrados() {
  const navigate = useNavigate(); // Hook para navegação
  
  const [listas, setListas] = useState({
    adocao: [] as Animal[],
    lar: [] as Animal[],
    pedidos: [] as Animal[],
    concluidas: [] as Animal[]
  });
  const [loading, setLoading] = useState(true);

  // Normalizador de texto
  const normalizar = (texto: string) => {
    if (!texto) return "";
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const token = localStorage.getItem('@AuthData:token'); // Confirme se a chave é 'token' ou '@AuthData:token'
    
    api.get("/animais/gerenciar/lista", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const todos: Animal[] = res.data;
        
        const adocaoArr: Animal[] = [];
        const larArr: Animal[] = [];
        const pedidosArr: Animal[] = [];
        const concluidasArr: Animal[] = [];

        todos.forEach(animal => {
            const s = normalizar(animal.status);

            // 1. Concluídas (Adotado)
            if (s.includes('adotado') || s.includes('concluido')) {
                concluidasArr.push(animal);
            } 
            // 2. Pedidos Pendentes (Status Pendente ou Aguardando)
            else if (s.includes('pendente') || s.includes('aguardando') || s.includes('solicitado')) {
                pedidosArr.push(animal);
            }
            // 3. Lar Temporário
            else if (s.includes('lar') || s.includes('temporario')) {
                larArr.push(animal);
            }
            // 4. Disponível (Adoção)
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
      })
      .catch(err => console.error("Erro ao buscar animais:", err))
      .finally(() => setLoading(false));
  }, []);

  // Função para navegar ao clicar no card
  const handleCardClick = (id: number) => {
      navigate(`/gerenciar-adocao/${id}`);
  };

  if (loading) return <p style={{textAlign:'center', padding:'2rem'}}>Carregando animais...</p>;

  // Card do Animal (Agora clicável)
  const renderCard = (animal: Animal, labelStatus: string, corStatus: string) => (
    <div 
        key={animal.id} 
        className={styles.card} 
        onClick={() => handleCardClick(animal.id)} // 🎯 AQUI: Torna o card funcional
        style={{ cursor: 'pointer' }} // Indica visualmente que é clicável
        title="Clique para gerenciar este animal"
    >
        <div className={styles.imgCard}>
            <img
                src={animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"}
                alt={animal.nome || "Sem Nome"}
                onError={(e) => (e.currentTarget.src = "https://placehold.co/300x300/f8f8f8/ccc?text=Erro+Img")}
            />
        </div>

        <div className={styles.infoCard}>
            <div className={styles.cardNome}>
                <h1>{animal.nome || "Sem Nome"}</h1>
                <p className={styles.descricaoCard}>
                    {animal.raca || "Raça n/d"} • {animal.idade ? `${animal.idade} anos` : "?"}
                </p>
            </div>
        </div>

        <div className={styles.statusBadge} style={{ backgroundColor: corStatus }}>
            {labelStatus}
        </div>
    </div>
  );

  const EmptyList = ({ msg }: { msg: string }) => (
    <div className={styles.emptyBox}>
        <p>{msg}</p>
    </div>
  );

  return (
    <div className={styles.containerPrincipal}>
      
      {/* 1. ANIMAIS PARA ADOÇÃO */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Animais para Adoção ({listas.adocao.length})</h2>
        <div className={styles.listaScroll}>
            {listas.adocao.length > 0 ? listas.adocao.map(a => renderCard(a, 'Disponível', '#e3f2fd')) : <EmptyList msg="Nenhum animal disponível." />}
        </div>
        <Link to="/registrar-animal" className={styles.verMais}>Cadastrar Novo</Link>
      </div>

      {/* 2. LAR TEMPORÁRIO */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Em Lar Temporário ({listas.lar.length})</h2>
        <div className={styles.listaScroll}>
            {listas.lar.length > 0 ? listas.lar.map(a => renderCard(a, 'Em Lar', '#fff3e0')) : <EmptyList msg="Nenhum animal em LT." />}
        </div>
        {/* Link removido pois o clique no card já gerencia */}
      </div>

      {/* 3. PEDIDOS DE ADOÇÃO (Animais com status 'Pendente' no banco) */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Pedidos de Adoção ({listas.pedidos.length})</h2>
        <div className={styles.listaScroll}>
            {listas.pedidos.length > 0 ? listas.pedidos.map(a => renderCard(a, 'Pendente', '#fff8e1')) : <EmptyList msg="Nenhuma solicitação pendente." />}
        </div>
      </div>

      {/* 4. ADOÇÕES CONCLUÍDAS */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Adoções Concluídas ({listas.concluidas.length})</h2>
        <div className={styles.listaScroll}>
            {listas.concluidas.length > 0 ? listas.concluidas.map(a => renderCard(a, 'Adotado', '#e8f5e9')) : <EmptyList msg="Nenhuma adoção concluída ainda." />}
        </div>
      </div>

    </div>
  );
}