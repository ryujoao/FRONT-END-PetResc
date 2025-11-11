import { Link } from "react-router-dom";
import Nav from "../../components/navbar"; // Ajuste o caminho se necessário
import Footer from "../../components/footer"; // Ajuste o caminho se necessário
import styles from "../configuracoes/config.module.css"; // Crie este arquivo de CSS



const IconPerson = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.756C14.484 10.65 12.828 10 8 10c-4.828 0-6.484.65-7.168 1.24C.154 11.91 0 12.75 0 13s0 1 0 1h14z" />
  </svg>
);
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2.5a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-2.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V14z" />
  </svg>
);
const IconBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4.11 6.166V11.5a2 2 0 0 0-2 2v2h13.78a1 1 0 0 1-.722-1.7l-2.164-3.24a3 3 0 0 0-2.2-1.045V4.167a3 3 0 0 0-1.28-2.45z" />
  </svg>
);
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.338 1.55A1.5 1.5 0 0 1 6.5 1h3a1.5 1.5 0 0 1 1.162.55l3.415 3.556a.5.5 0 0 1 0 .684l-3.415 3.556a1.5 1.5 0 0 1-1.162.55h-3a1.5 1.5 0 0 1-1.162-.55L1.923 6.33a.5.5 0 0 1 0-.684zM6.5 2a.5.5 0 0 0-.388.187L2.618 5.828a.5.5 0 0 0 0 .344l3.494 3.639A.5.5 0 0 0 6.5 10h3a.5.5 0 0 0 .388-.187l3.494-3.639a.5.5 0 0 0 0-.344L9.882 2.187A.5.5 0 0 0 9.5 2z" />
  </svg>
);
const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
  </svg>
);

export default function Config() {
  return (
    <>
      <Nav />
      <div className={styles.configContainer}>
        <h1 className={styles.titulo}>Configurações</h1>

        {/* Seção da Conta */}
        <section className={styles.configSection}>
          <h2 className={styles.subtitulo}>Conta</h2>
          <div>
            <Link to="/config/conta" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconPerson />
              </div>
              <span className={styles.itemTexto}>Conta</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
            
            <Link to="/config/endereco" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconHome />
              </div>
              <span className={styles.itemTexto}>Endereço</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
            
            <Link to="/config/notificacao" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconBell />
              </div>
              <span className={styles.itemTexto}>Notificação</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
            
            <Link to="/config/privacidade" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconShield />
              </div>
              <span className={styles.itemTexto}>Privacidade</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
            
            <Link to="/config/seguranca" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconLock />
              </div>
              <span className={styles.itemTexto}>Segurança</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* Seção de Ajuda */}
        <section className={styles.configSection}>
          <h2 className={styles.subtitulo}>Ajuda</h2>
          <div className={styles.ajudaLista}>
            <Link to="/contate-nos" className={styles.ajudaLink}>
              Contate-nos
            </Link>
            <Link to="/faq" className={styles.ajudaLink}>
              FAQ
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
    