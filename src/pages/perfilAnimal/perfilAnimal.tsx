import { useParams } from 'react-router-dom';
import Layout from "../../components/layout";
import styles from "./perfilAnimal.module.css";

// --- DADOS E TIPOS MOCKADOS (REPETIDOS PARA GARANTIR FUNCIONALIDADE ISOLADA) ---
interface OngInfo {
 id: number;
 nome: string;
 endereco: string;
}

interface Animal {
 id: number;
 nome: string;
 especie: string;
 raca: string | null;
 idade: number | null;
 status: string;
 porte: string | null;
 sexo: string | null;
 descricao: string | null;
 photoURL: string | null;
 createdAt: string;
 accountId: number;
 ong: OngInfo | null;
}

const MOCKED_ANIMALS: Animal[] = [
 {
  id: 1,
  nome: "Branquinho",
  especie: "Gato",
  raca: "SRD",
  idade: 5,
  status: "Disponível",
  porte: "Médio",
  sexo: "MACHO",
  descricao: "O Branquinho é um gato muito calmo e adora tirar uma soneca no sofá. Ele é super adaptável e perfeito para quem mora em apartamento.",
  photoURL: "https://placehold.co/400x400/e6f7ff/2b6b99?text=Branquinho", 
  createdAt: new Date().toISOString(),
  accountId: 101,
  ong: { id: 1, nome: "ONG Amigos Patudos", endereco: "Rua A" }
 },
 {
  id: 2,
  nome: "Zeus",
  especie: "Cachorro",
  raca: "Pitbull",
  idade: 3,
  status: "Disponível",
  porte: "Grande",
  sexo: "MACHO",
  descricao: "Zeus é um cão forte e leal, precisa de espaço para correr e socialização constante. Ideal para donos experientes.",
  photoURL: "https://placehold.co/400x400/fff0e6/ff9900?text=Zeus",
  createdAt: new Date().toISOString(),
  accountId: 102,
  ong: { id: 2, nome: "ONG Cão Feliz", endereco: "Rua B" }
 }
];

// --- COMPONENTE ---
export default function PerfilAnimal() {
 // OBTENDO O PARÂMETRO 'id' DA ROTA
 const { id } = useParams<{ id: string }>();

 const animalData = MOCKED_ANIMALS.find(
  animal => animal.nome.toLowerCase() === id
 );

 if (!animalData) {
  return (
   <Layout>
    <div style={{ textAlign: "center", padding: "4rem" }}>
     <h1 style={{ color: "#2b6b99" }}>Animal não encontrado</h1>
     <p>Verifique o link. O animal **{id}** não está disponível.</p>
    </div>
   </Layout>
  );
 }
 
 return (
  <Layout>
   <main className={styles.container}>
    
    {/* GRID PRINCIPAL: FOTO | INFO BÁSICA | COMENTÁRIO */}
    <div className={styles.profileWrapper}>
     
     {/* COLUNA 1: IMAGEM */}
     <div className={styles.imagemContainer}>
      <div className={styles.imagem}>
       <img
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
      <p className={styles.status}>Para Adoção</p>
      
      <section className={styles.dados}>
       <p className={styles.infoLine}>
        <strong>{animalData.sexo}</strong> • {animalData.idade} anos • {animalData.raca || 'SRD'}
       </p>
       <p className={styles.infoLine}>
        Disponível na **{animalData.ong?.nome || 'N/A'}**
       </p>
      </section>

      <button className={styles.botaoAdotar}>
       QUERO ADOTAR {animalData.nome.toUpperCase()}!
      </button>
     </div>
    
     {/* COLUNA 3: COMENTÁRIO/DESCRIÇÃO (ESTILIZADA COMO CAIXA) */}
     <div className={styles.comentarioContainer}>
      <h2>Comentário do Anunciante</h2>
      <p>{animalData.descricao}</p>
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
      </ul>
     </div>

     {/* Coluna 2: Cuidados Veterinários (Mockado) */}
     <div className={styles.caracteristicaColuna}>
      <h3>Cuidados Veterinários</h3>
      <ul className={styles.tagsList}>
       <li>Vacinado</li>
       <li>Castrado</li>
       <li>Vermifugado</li>
      </ul>
     </div>

     {/* Coluna 3: Temperamento (Mockado) */}
     <div className={styles.caracteristicaColuna}>
      <h3>Temperamento</h3>
      <ul className={styles.tagsList}>
       <li>Dócil</li>
       <li>Brincalhão</li>
       <li>Calmo</li>
      </ul>
     </div>

     {/* Coluna 4: Sociabilidade (Mockado) */}
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