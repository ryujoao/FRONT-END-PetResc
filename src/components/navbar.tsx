import { useState } from "react";
import { Link } from "react-router-dom"; // Import REAL
import styles from "../style/navbar.module.css"; // Import REAL
import Denuncie from "./denuncie"; // Import REAL
import Notificacoes from "./notificacoes"; // Import REAL
import { useAuth } from "../auth/AuthContext"; // Import REAL

export default function Nav() {
  const { isAuthenticated, login, logout, user } = useAuth(); // Hook REAL

  // Este console.log é para VOCÊ checar no seu navegador (F12)
  // Verifique o que aparece em 'role' e 'nome' ao logar como ONG
  console.log("DADOS REAIS DO AUTHCONTEXT:", user);

  const [showModal, setShowModal] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Lógica para checar se é ONG ou Admin
  const isOngOrAdmin =
    isAuthenticated &&
    user &&
    (user.role === "ONG" || user.role === "ADMIN");

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
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                maxWidth: "90px",
                height: "60px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            />
          </Link>
        </div>

        {/* Links de navegação que mudam com base no login E na role */}
        <ul className={styles.navCategorias}>
          {/* Links que somem se for ONG/Admin */}
          {!isOngOrAdmin && (
            <>
              <li>
                <Link
                  to={isAuthenticated ? "/adotar" : "/cadastro"}
                  className={styles.navLink}
                >
                  Adotar
                </Link>
              </li>
              <li>
                <Link
                  to={isAuthenticated ? "/larTemporario" : "/cadastro"}
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
              to={isAuthenticated ? "/doar" : "/cadastro"}
              className={styles.navLink}
            >
              {/* Se for ONG/Admin, mostra "Doação", senão, mostra "Doar" */}
              {isOngOrAdmin ? "Doação" : "Doar"}
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
              to={isAuthenticated ? "/registrarAnimal" : "/cadastro"}
              className={styles.navLink}
            >
              Registrar Animal
            </Link>
          </li>
        </ul>

        {/* Lógica de Login/Logout */}
        {isAuthenticated ? (
          // Se LOGADO
          <ul className={styles.perfilUsuario}>
            
            

            <li>
              <Link to="/perfil" className={styles.perfilLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={35}
                  height={35}
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                  color="black"
                  style={{ cursor: "pointer" }}
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                {/*
                  LÓGICA DO NOME CORRIGIDA (baseado no seu AuthContext):
                  Usando 'user.nome' porque 'user.nomeOng' não existe no seu context.
                */}
                <span className={styles.usernameText}>
                  @
                  {user?.nome || (isOngOrAdmin ? "ONG" : "Usuário")}
                </span>
              </Link>
            </li>

            <li>
              <button onClick={logout} className={styles.botaoLogout}>
                Sair
              </button>
            </li>
          </ul>
        ) : (
          // Se DESLOGADO
          <ul className={styles.botoesCadastro}>
            <Link to={"/cadastroOng"} style={{ textDecoration: "none" }}>
              <button className={styles.cadastroONG}>Cadastre sua ONG</button>
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