import { Link } from "react-router-dom";
import styles from "./perfil.module.css";
import { useState } from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../auth/AuthContext";
import { TbSettingsFilled } from "react-icons/tb";
import { BsFillPersonFill, BsHeart, BsHeartFill, BsPlus } from "react-icons/bs";


interface Pet {
  id: number;
  nome: string;
  raca: string;
  sexo: string;
  img: string;
  favorito: boolean;
  dono?: "eu" | "outro"; 
}


const mockMeusPets: Pet[] = [
  { id: 1, nome: "Neguinho", raca: "SRD", sexo: "M", img: "/animais/neguinho.png", favorito: false, dono: "eu" },
  { id: 2, nome: "Frajola", raca: "SRD", sexo: "F", img: "/animais/frajola.png", favorito: false, dono: "eu" },
  { id: 3, nome: "Rabito", raca: "SRD", sexo: "M", img: "/animais/rabito.png", favorito: true, dono: "eu" },
];

const mockOutrosSalvos: Pet[] = [
  { id: 4, nome: "Zeus", raca: "Pitbull", sexo: "M", img: "/animais/zeus.png", favorito: true, dono: "outro" },
  { id: 5, nome: "Branquinho", raca: "SRD", sexo: "M", img: "/animais/branquinho.png", favorito: true, dono: "outro" },
];


const PetCard = ({ pet, onToggle }: { pet: Pet; onToggle: (id: number) => void }) => (
  <div className={styles.petCard}>
    <img src={pet.img} alt={pet.nome} className={styles.petImage} />
    <p className={styles.petNome}>{pet.nome}</p>
    <p className={styles.petRaca}>{pet.raca}</p>
    <p className={styles.petSexo}>{pet.sexo}</p>

    {pet.favorito ? (
      <BsHeartFill className={styles.favorite} onClick={() => onToggle(pet.id)} />
    ) : (
      <BsHeart className={styles.nonFavorite} onClick={() => onToggle(pet.id)} />
    )}
  </div>
);

const UserInfo = ({ email, telefone, nome, local }: any) => (
  <div className={styles.infoContainer}>
    <div className={`${styles.infoBox} ${styles.alignLeft}`}>
      <p>{email || "Email não disponível"}</p>
      <p>{telefone || "Telefone não disponível"}</p>
    </div>
    <div className={`${styles.infoBox} ${styles.alignCenter}`}>
      <p className={styles.username}>{nome || "Username"}</p>
    </div>
    <div className={`${styles.infoBox} ${styles.alignRight}`}>
      <p>Localização</p>
      <p>{local || "SP, Brasil"}</p>
    </div>
  </div>
);

export default function Perfil() {
  const { user } = useAuth(); 
  
  
  const [meusPets, setMeusPets] = useState<Pet[]>(mockMeusPets);
  
  const [outrosSalvos, setOutrosSalvos] = useState<Pet[]>(mockOutrosSalvos);
  
  const [activeView, setActiveView] = useState<"todos" | "salvos">("todos");

  const toggleFavorito = (id: number) => {
    
    setMeusPets((prev) => 
      prev.map((p) => p.id === id ? { ...p, favorito: !p.favorito } : p)
    );

    
    setOutrosSalvos((prev) => 
      prev.map((p) => p.id === id ? { ...p, favorito: !p.favorito } : p)
    );
  };

  
  const petsExibidos = activeView === "todos" 
    ? meusPets 
    : [
        ...meusPets.filter(p => p.favorito), 
        ...outrosSalvos.filter(p => p.favorito)
      ];

  const displayNome = user?.role === "ONG" && user?.nomeOng ? user.nomeOng : user?.nome;

  return (
    <Layout>
      <div className={styles.perfilContainer}>
        
        <div className={styles.banner}>
          <Link to="/config" className={styles.configIcon}>
            <TbSettingsFilled />
          </Link>
        </div>

        <div className={styles.avatar}>
          <div className={styles.avatarLabel}>
            <BsFillPersonFill className={styles.avatarIcon} />
          </div>
        </div>

        <UserInfo 
          email={user?.email} 
          telefone={user?.telefone} 
          nome={displayNome} 
        />

        <div className={styles.btnContainer}>
          <button
            className={activeView === "todos" ? styles.tabUm : styles.tabDois}
            onClick={() => setActiveView("todos")}
          >
            Meus Pets
          </button>
          <button
            className={activeView === "salvos" ? styles.tabUm : styles.tabDois}
            onClick={() => setActiveView("salvos")}
          >
            Salvos
          </button>
        </div>

        <div className={styles.petsHeader}>
          <h2 className={styles.petsTitulo}>
            {activeView === "todos" ? "Meus Pets" : "Pets Salvos"}
          </h2>
          {activeView === "todos" && (
            <Link to="/registrar-animal" className={styles.addIcon}>
              <BsPlus />
            </Link>
          )}
        </div>

        <div className={styles.petsContainer}>
          {petsExibidos.length > 0 ? (
            petsExibidos.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onToggle={toggleFavorito}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%", color: "#666", marginTop: "2rem" }}>
              Nenhum pet encontrado nesta lista.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}