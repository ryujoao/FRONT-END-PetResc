import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./centralAdocao.module.css";
// --- Tipos omitidos para brevidade, mas certifique-se que estão definidos ---

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

// --- DADOS MOCKADOS ---
const MOCKED_ANIMALS: Animal[] = [
 {
  id: 1,
  nome: "Branquinho", // Nome do animal
  especie: "Gato",
  raca: "SRD",
  idade: 5,
  status: "Disponível",
  porte: "Médio",
  sexo: "MACHO",
  descricao: "Gato muito carinhoso, ideal para apartamentos.",
  photoURL: "https://placehold.co/300x300/e6f7ff/2b6b99?text=Branquinho", 
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
  descricao: "Cão forte e leal, precisa de espaço para correr.",
  photoURL: "https://placehold.co/300x300/fff0e6/ff9900?text=Zeus",
  createdAt: new Date().toISOString(),
  accountId: 102,
  ong: { id: 2, nome: "ONG Cão Feliz", endereco: "Rua B" }
 },
 {
  id: 3,
  nome: "Mimi",
  especie: "Gato",
  raca: "Siamês",
  idade: 1,
  status: "Disponível",
  porte: "Pequeno",
  sexo: "FEMEA",
  descricao: "Gatinha dócil.",
  photoURL: "https://placehold.co/300x300/f8f8f8/ccc?text=Mimi", 
  createdAt: new Date().toISOString(),
  accountId: 103,
  ong: { id: 1, nome: "ONG Amigos Patudos", endereco: "Rua A" }
 }
];

const filterMockedAnimals = (
 animals: Animal[],
 especie: string,
 porte: string,
 sexo: string
): Animal[] => {
 return animals.filter(animal => {
  const matchEspecie = !especie || animal.especie === especie;
  const matchPorte = !porte || animal.porte === porte;
  const matchSexo = !sexo || animal.sexo === sexo;
  return matchEspecie && matchPorte && matchSexo;
 });
};

export default function CentralAdocao() {
 const [animais, setAnimais] = useState<Animal[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const [filtroEspecie, setFiltroEspecie] = useState("");
 const [filtroPorte, setFiltroPorte] = useState("");
 const [filtroSexo, setFiltroSexo] = useState("");

 useEffect(() => {
  setLoading(true);
  setError(null);

  setTimeout(() => {
   try {
    const filteredData = filterMockedAnimals(
     MOCKED_ANIMALS,
     filtroEspecie,
     filtroPorte,
     filtroSexo
    );
    setAnimais(filteredData);
   } catch (err: any) {
    setError("Erro ao processar dados mockados.");
   } finally {
    setLoading(false);
   }
  }, 500);
 }, [filtroEspecie, filtroPorte, filtroSexo]);


 return (
  <Layout>
  
   <div className={styles.pageCentralAdocao}>
    <h1 className={styles.titulo}>Centro de Adoção</h1>
    <p className={styles.subtitulo}>
     Animais disponíveis para adoção:
    </p>

    <div className={styles.containerFiltrosPets}>
    
     {/* --- Área de Filtros (Placeholder) --- */}
     <div className={styles.filtros}>
      {/* ... seus inputs de filtro ... */}
     </div>

     {/* --- Lista de Pets --- */}
     <section className={styles.listaPets}>
      {loading && <p>Carregando animais...</p>}
     
      {!loading && !error && animais.map((animal) => (
       <Link
        // LINK CORRETO: APONTA PARA /perfilAnimal/:id
        to={`/perfilAnimal/${animal.nome.toLowerCase()}`}
        key={animal.id}
        className={styles.cardPet}
       >
        <img
         src={animal.photoURL || "placeholder-url"}
         alt={animal.nome}
        />
        <h3>{animal.nome}</h3>
        <p>{animal.raca || "Sem raça definida"}</p>
       
        {animal.ong && (
         <p className={styles.ongNome}>{animal.ong.nome}</p>
        )}
       </Link>
      ))}
     </section>
    </div>
   </div>
  </Layout>
 );
}