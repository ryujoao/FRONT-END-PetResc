import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../style/navbar.module.css";
import Denuncie from "./denuncie";
import Notificacoes from "./notificacao";
import { useAuth } from "../auth/AuthContext";
import { BsPersonCircle } from "react-icons/bs";

export default function Nav() {
  const { isAuthenticated, user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // --- LÓGICA DE ROLES ---

  // Verifica se é ONG
  const isOng = isAuthenticated && user && user.role === "ONG";

  // Verifica se é ADMIN (Nova lógica adicionada)
  const isAdmin = isAuthenticated && user && user.role === "ADMIN";

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <>
      <Denuncie isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className={`${styles.topBar} topBar`}></div>
      <div className={`${styles.navbar} navbar`}>
        <div className={styles.navLogo}>
          <Link to="/">
            <img src="/logo4.png" alt="Logo" className={styles.logoImg} />
          </Link>
        </div>

        <ul className={styles.navCategorias}>
          {/* Links de "Adotar" e "Lar Temporário"
             Só aparecem se NÃO for ONG e NÃO for Admin 
          */}
          {!isOng && !isAdmin && (
            <>
              <li>
                <Link
                  to={isAuthenticated ? "/adotar" : "/login"}
                  className={styles.navLink}
                >
                  Adotar
                </Link>
              </li>
              <li>
                <Link
                  to={isAuthenticated ? "/lar-temporario" : "/login"}
                  className={styles.navLink}
                >
                  Lar Temporário
                </Link>
              </li>
            </>
          )}

          {/* Links que aparecem para TODOS */}
          <li>
            <Link
              to={isAuthenticated ? "/doar" : "/login"}
              className={styles.navLink}
            >
              {/* Se for ONG ou Admin mostra "Doação", caso contrário "Doar" */}
              {isOng || isAdmin ? "Doação" : "Doar"}
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={styles.navLink}
            >
              Denuncie
            </button>
          </li>
          <li>
            <Link
              to={isAuthenticated ? "/registrar-animal" : "/login"}
              className={styles.navLink}
            >
              Registrar Animal
            </Link>
          </li>
        </ul>

        {/* Lógica de Login/Logout */}
        {isAuthenticated ? (
          <ul className={styles.perfilUsuario}>
            <li>
              <Link to="/perfil" className={styles.perfilLink}>
                <BsPersonCircle className={styles.perfilIcon} />
                <span className={styles.usernameText}>
                  @{/* Exibe o nome do usuário, ou o cargo se o nome falhar */}
                  {user?.nome ||
                    (isOng ? "ONG" : isAdmin ? "Admin" : "Usuário")}
                </span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={styles.botoesCadastro}>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <button className={styles.cadastroONG}>Faça Login</button>
            </Link>
            <Link to={"/cadastro"} style={{ textDecoration: "none" }}>
              <button className={styles.cadastro}>Cadastre-se</button>
            </Link>
          </ul>
        )}
      </div>
    </>
  );
}
