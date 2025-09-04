import Nav from "../components/navbar";
import style from "../style/home.module.css";
import Footer from "../components/footer";
import MeusAnimais from "./meusAnimais";
import OngsProximas from "./ongsProximas";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Nav />

      {/* Banner com imagem de fundo e texto sobreposto */}
      <section className={style.bannerUm}>
        <div className={style.homeTitulo}>
          <h1 className={style.titulo}>Conheça seu novo melhor amigo!</h1>
          <Link to="/adotar" style={{ textDecoration: 'none' }}>
          <button className={style.subtitulo}>Adote-me</button>
          </Link>
        </div>
      </section>

      {/* Conteúdo abaixo do banner */}
      <section className={style.mainContent}>
        {/* Cards, textos, etc. */}
      </section>

      <MeusAnimais />

      <section className={style.bannerDois}>  
        <div className={style.paginaDoar}>
          <h2 className={style.tituloDoar}>Sua contribuição salva vidas!</h2>
          <p>Com sua ajuda, conseguimos garantir alimento, cuidados médicos e abrigo seguro para animais em situação de abandono. Cada contribuição é essencial para que eles tenham uma nova chance de vida cheia de carinho e dignidade.</p>
          <button>
            <a href="/doar">Doe agora!</a>
          </button>
        </div>
      </section>

      <OngsProximas />

      <Footer />
    </>
  );
}

export default Home;
