import Nav from "../../components/navbar";
import styles from "./index.module.css";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import NossaMissao from "./nossaMissao";
import SaibaMais from "./saibaMais";
import Estatisticas from "../estatisticas";

function Index() {
  return (
    <>
      <Nav />

      {/* Banner com imagem de fundo e texto sobreposto */}
      <div className={styles.bannerUm}>
        <div className={styles.homeTitulo}>
          <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          <Link to="/adotar" style={{ textDecoration: "none" }}>
          </Link>
        </div>
      </div>

      <NossaMissao />

      <SaibaMais />

     <Estatisticas />

      <Footer />
    </>
  );
}

export default Index;
