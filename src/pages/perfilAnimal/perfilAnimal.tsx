import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from "../../components/layout";
import styles from "./perfilAnimal.module.css";

// --- TIPOS DE DADOS REAIS ---
interface OngInfo {
 id: number;
 nome: string;
 endereco: string;
}

// Interface Animal baseada nos dados do RegistrarAnimal
interface Animal {
 id: number;
 nome: string;
 especie: string;
 raca: string | null;
 idade: string | null; // Alterado para string para refletir o input do Registro
 status: string;
 porte: string | null;
 sexo: string;
 descricao: string | null;
 photoURL: string | null;
 createdAt: string;
 accountId: number;
 ong: OngInfo | null;
 cor: string | null; // Campo 'cor' agora presente
 // Adicionar outros campos relevantes que o backend retorna, se necessário
}

// --- COMPONENTE ---
export default function PerfilAnimal() {
 const { id } = useParams<{ id: string }>();
 const [animalData, setAnimalData] = useState<Animal | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchAnimal = async () => {
   if (!id) {
    setLoading(false);
    setError("ID do animal não fornecido na URL.");
    return;
   }

   try {
    // >>> CHAMADA REAL À API <<<
    const response = await fetch(`https://petresc.onrender.com/api/animais/${id}`);
    
    if (!response.ok) {
     throw new Error("Animal não encontrado ou erro na API.");
    }

    const data: Animal = await response.json();
    setAnimalData(data);

   } catch (err) {
    if (err instanceof Error) {
     setError(err.message);
    } else {
     setError("Erro desconhecido ao carregar animal.");
    }
   } finally {
    setLoading(false);
   }
  };

  fetchAnimal();
 }, [id]);

 if (loading) {
  return (
   <Layout>
    <div className={styles.loading}>Carregando perfil do animal...</div>
   </Layout>
  );
 }

 if (error || !animalData) {
  return (
   <Layout>
    <div style={{ textAlign: "center", padding: "4rem" }}>
     <h1 style={{ color: "#2b6b99" }}>{error || "Animal não encontrado"}</h1>
     <p>Verifique o link. O animal de ID **{id}** não está disponível.</p>
    </div>
   </Layout>
  );
 }

 // Dados prontos, renderiza o perfil
 return (
  <Layout>
   <main className={styles.container}>
    
    {/* GRID PRINCIPAL: FOTO | INFO BÁSICA | COMENTÁRIO */}
    <div className={styles.profileWrapper}>
    
     {/* COLUNA 1: IMAGEM */}
     <div className={styles.imagemContainer}>
      <div className={styles.imagem}>
       <img
        // Assumindo que o campo retornado pela API para a imagem é 'photoURL'
        src={animalData.photoURL || "placeholder-url"} 
        alt={animalData.nome}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
         e.currentTarget.src = "https://placehold.co/400x400/f8f8f8/ccc?text=Sem+Foto";
        }}
       />
      </div>
     </div>

     {/* COLUNA 2: DETALHES PRINCIPAIS e BOTÃO */}
     <div className={styles.infoContainer}>
      <h1 className={styles.nome}>{animalData.nome}</h1>
      <p className={styles.status}>Status: **{animalData.status}**</p>
      
      <section className={styles.dados}>
       <p className={styles.infoLine}>
        <strong>{animalData.sexo}</strong> • {animalData.idade || 'Idade Desconhecida'} • {animalData.raca || 'SRD'}
       </p>
       <p className={styles.infoLine}>
        Anunciado pela **{animalData.ong?.nome || 'Usuário Comum'}**
       </p>
      </section>

      <button className={styles.botaoAdotar}>
       QUERO ADOTAR {animalData.nome.toUpperCase()}!
      </button>
     </div>
    
     {/* COLUNA 3: COMENTÁRIO/DESCRIÇÃO */}
     <div className={styles.comentarioContainer}>
      <h2>História / Descrição</h2>
      <p>{animalData.descricao || "Nenhuma descrição detalhada fornecida."}</p>
     </div>
    </div>

    <hr className={styles.divider} />

    {/* GRID INFERIOR: CARACTERÍSTICAS (4 COLUNAS) */}
    <div className={styles.caracteristicasGrid}>
    
     {/* Coluna 1: Características */}
     <div className={styles.caracteristicaColuna}>
      <h3>Características</h3>
      <ul>
       <li><strong>Espécie:</strong> {animalData.especie}</li>
       <li><strong>Raça:</strong> {animalData.raca || "SRD"}</li>
       <li><strong>Porte:</strong> {animalData.porte}</li>
       <li><strong>Sexo:</strong> {animalData.sexo}</li>
       <li><strong>Cor:</strong> {animalData.cor || "Não Informada"}</li> {/* COR INCLUÍDA */}
      </ul>
     </div>

     {/* As outras colunas (Cuidados, Temperamento, Sociabilidade) permanecem as mesmas por enquanto */}
     {/* ... (coloque aqui o restante do seu JSX para Cuidados, Temperamento, Sociabilidade) */}
     <div className={styles.caracteristicaColuna}>
      <h3>Cuidados Veterinários</h3>
      <ul className={styles.tagsList}>
       <li>Vacinado</li>
       <li>Castrado</li>
       <li>Vermifugado</li>
      </ul>
     </div>
     <div className={styles.caracteristicaColuna}>
      <h3>Temperamento</h3>
      <ul className={styles.tagsList}>
       <li>Dócil</li>
       <li>Brincalhão</li>
       <li>Calmo</li>
      </ul>
     </div>
     <div className={styles.caracteristicaColuna}>
      <h3>Sociabilidade</h3>
      <ul className={styles.tagsList}>
       <li>Se dá bem com cães</li>
       <li>Se dá bem com crianças</li>
      </ul>
     </div>
    </div>
   </main>
  </Layout>
 );
}