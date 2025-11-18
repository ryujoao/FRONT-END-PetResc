import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./config.module.css"; 

// Ícones
import { IoIosArrowForward } from "react-icons/io";


import ExcluirConta from "../configuracoes/excluirConta";
import { FaDog } from "react-icons/fa6";

export default function Historico() {
  const [showExcluir, setShowExcluir] = useState(false);

  const handleConfirmExcluir = () => {
    console.log("Conta excluída!");
    setShowExcluir(false);
    // Adicione aqui a lógica de logout ou redirecionamento
  };

  return (
    <div className={styles.configContainer}>
      <h1 className={styles.titulo}>Histórico</h1>

      <section className={styles.configSection}>
        
       
        <Link to="/config/historico-animais" className={styles.configItem}>
          <div className={styles.iconCircle}>
            <FaDog />
          </div>
          <span className={styles.itemTexto}>Histórico de animais</span>
          <IoIosArrowForward className={styles.seta} />
        </Link>

      </section>

      <ExcluirConta 
        isOpen={showExcluir} 
        onClose={() => setShowExcluir(false)} 
        onConfirm={handleConfirmExcluir} 
      />
    </div>
  );
}