import Nav from "../components/navbar";
import style from "../style/home.module.css";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <Nav />

      {/* Banner com imagem de fundo e texto sobreposto */}
      <section className={style.bannerArea}>
        <div className={style.homeTitulo}>
          <h1 className={style.titulo}>Conheça seu novo melhor amigo!</h1>
          <button className={style.subtitulo}>Adote-me</button>
        </div>
      </section>

      {/* Conteúdo abaixo do banner */}
      <section className={style.mainContent}>
        {/* Cards, textos, etc. */}
      </section>

      <Footer />
    </>
  );
}

export default Home;
