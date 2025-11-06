// src/pages/home/Home.tsx
import Nav from "../../components/navbar";
import styles from "./home.module.css";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // Importe seu hook!

// --- COMPONENTES DA HOME PÚBLICA ---
import Estatisticas from "../estatisticas";
import NossaMissao from "./nossaMissao";
import SaibaMais from "./saibaMais";

// --- COMPONENTES DAS HOMES LOGADAS ---
import MeusAnimais from "./meusAnimais"; // Para o 'PUBLICO'
import OngsProximas from "./ongsProximas"; // Para o 'PUBLICO'
import AnimaisCadastrados from "./animaisCadastrados"; // <-- 1. IMPORTE O COMPONENTE DA ONG

function Home() {
// 1. Pegue 'isAuthenticated' E o 'user' completo do contexto
const { isAuthenticated, user } = useAuth();

// 2. Lógica de renderização do Banner
const renderBanner = () => {
 // --- CASO 1: NÃO LOGADO (Público) ---
 if (!isAuthenticated) {
 return (
  <section className={styles.bannerTres}>
  <div className={styles.homeTitulo}>
   <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
   {/* Nenhum botão */}
  </div>
  </section>
 );
 }

 // --- CASO 2: LOGADO COMO USUÁRIO (HomeUsu) ---
 // --- CORREÇÃO DE LÓGICA AQUI ---
 if (user && user.role === "PUBLICO") { // Checagem específica
 return (
  <section className={styles.bannerUm}>
  <div className={styles.homeTitulo}>
   <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
   <Link to="/registrarAnimal" style={{ textDecoration: "none" }}>
   <button className={styles.subtitulo}>Adote-me</button>
   </Link>
  </div>
  </section>
 );
 }

 // --- CASO 3: LOGADO COMO ONG ou ADMIN (HomeOng) ---
 // --- CORREÇÃO DE LÓGICA AQUI ---
 if (user && (user.role === "ONG" || user.role === "ADMIN")) { // Checagem para ambos
 return (
     // (Estou usando bannerUm como você colocou, pode mudar para bannerOng se quiser)
  <section className={styles.bannerUm}> 
  <div className={styles.homeTitulo}>
   <h1 className={styles.titulo}>Apresente um novo amigo ao mundo!</h1>
   <Link to="/adotar" style={{ textDecoration: "none" }}>
   <button className={styles.subtitulo}>Cadastrar Animal</button>
   </Link>
  </div>
  </section>
 );
 }

 // Fallback (enquanto carrega, etc)
 return <div className={styles.bannerEspera}></div>; // Um banner neutro
};

// 3. Lógica de renderização do Conteúdo da Página
const renderContent = () => {
 // --- CONTEÚDO PÚBLICO ---
 if (!isAuthenticated) {
 return (
  <>
  <NossaMissao />
  <SaibaMais />
  <Estatisticas />
  </>
 );
 }

 // --- CONTEÚDO DO USUÁRIO (HomeUsu)
 if (user && user.role === "PUBLICO") { // Checagem específica
 return (
  <MeusAnimais />
 );
 }

  // --- CONTEÚDO DA ONG (HomeOng - Imagem 2) ---
  // --- CORREÇÃO DE LÓGICA AQUI ---
 if (user && (user.role === "ONG" || user.role === "ADMIN")) { // Checagem para ambos
 return (
  <AnimaisCadastrados /> // <-- 2. DESCOMENTE E USE O COMPONENTE
 );
 }

 // Fallback
 return <div>Carregando...</div>;
};

return (
 <>
 <Nav />
 {renderBanner()}
 {renderContent()}
 <Footer />
 </>
);
}

export default Home;