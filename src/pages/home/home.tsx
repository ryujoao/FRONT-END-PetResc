import Nav from "../../components/navbar"; 
import styles from "./home.module.css";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; 
import MeusAnimais from "./meusAnimais";
import OngsProximas from "./ongsProximas";
import Estatisticas from "../estatisticas";
import NossaMissao from "./nossaMissao";
import SaibaMais from "./saibaMais";


function Home() {
  const { isAuthenticated } = useAuth(); 

  return (
    <>
      <Nav />

      {/* Banner com imagem de fundo e texto sobreposto (pode ser o mesmo para ambos) */}
     <section className={isAuthenticated ? styles.bannerUm : styles.bannerTres}>

        <div className={styles.homeTitulo}>
          <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          <Link to="/adotar" style={{ textDecoration: "none" }}>
            {/* O botão "Adote-me" só aparece para usuários logados */}
            {isAuthenticated && <button className={styles.subtitulo}>Adote-me</button>}
          </Link>
        </div>
      </section>

      {/* AQUI ESTÁ A MÁGICA: Renderiza seções diferentes da página */}
      {isAuthenticated ? (
        <>
          <MeusAnimais />
          <section className={styles.bannerDois}>
            <div className={styles.paginaDoar}>
              <h2 className={styles.tituloDoar}>Sua contribuição salva vidas!</h2>
              <p>
                Com sua ajuda, conseguimos garantir alimento, cuidados médicos e
                abrigo seguro para animais em situação de abandono. Cada
                contribuição é essencial para que eles tenham uma nova chance de
                vida cheia de carinho e dignidade.
              </p>
              <button>
                <a href="/doar">Doe agora!</a>
              </button>
            </div>
          </section>
          <OngsProximas />
        </>
      ) : (
        <>

      
          <NossaMissao />
          <SaibaMais />
          <Estatisticas />
        </>
      )}

      <Footer />
    </>
  );
}


export default Home;